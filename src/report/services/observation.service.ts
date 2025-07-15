import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadProductDocumentDto } from '@src/bet/dtos/product/upload-product-document.dto';
import { ProductDocumentService } from '@src/bet/services/product-document.service';
import { MulterFile } from '@src/bet/types/product/multer-file.types';
import { Part } from '@src/location/entities/part.entity';
import { PartService } from '@src/location/services/part.service';
import { getEntityFilteredList } from '@src/paginator/paginator.service';
import { EntityFilteredListResults } from '@src/paginator/paginator.type';
import { Repository } from 'typeorm';
import { CreateObservationDto } from '../dto/create-observation.dto';
import { ObservationQueryFilterDto } from '../dto/observation-query-filter.dto';
import { UpdateObservationDto } from '../dto/update-observation.dto';
import { ObservationFile } from '../entities/observation-file.entity';
import { Observation } from '../entities/observation.entity';
import {
  FileNotFoundException,
  InvalidStatusTransitionException,
  ObservationFileNotFoundException,
  ObservationNotFoundException,
  PartsNotFoundException,
} from '../helpers/exceptions/observation.exception';
import { ObservationStatus } from '../types/observation-status.types';
import { ObservationFileWithDetailsResponse } from '../types/observation-swagger-response.types';
import { ReportService } from './report.service';

@Injectable()
export class ObservationService {
  constructor(
    @InjectRepository(Observation)
    private readonly observationRepository: Repository<Observation>,
    @InjectRepository(ObservationFile)
    private readonly observationFileRepository: Repository<ObservationFile>,
    private readonly reportService: ReportService,
    private readonly partService: PartService,
    private readonly productDocumentService: ProductDocumentService,
  ) {}

  async create(createObservationDto: CreateObservationDto): Promise<Observation> {
    // Validate report exists
    const report = await this.reportService.findOne(createObservationDto.reportId);

    // Validate parts exist if provided
    let parts: Part[] = [];
    if (createObservationDto.partIds && createObservationDto.partIds.length > 0) {
      try {
        parts = await this.partService.findByIds(createObservationDto.partIds);
      } catch (_error) {
        throw new PartsNotFoundException({ partIds: createObservationDto.partIds.join(', ') });
      }
    }

    // Create the observation
    const observation = this.observationRepository.create({
      title: createObservationDto.title,
      reference: createObservationDto.reference,
      location: createObservationDto.location,
      priority: createObservationDto.priority,
      status: createObservationDto.status,
      startedAt: createObservationDto.startedAt ? new Date(createObservationDto.startedAt) : null,
      endedAt: createObservationDto.endedAt ? new Date(createObservationDto.endedAt) : null,
      report,
    });

    // Save the observation first
    let savedObservation = await this.observationRepository.save(observation);

    // Then assign parts if provided
    if (parts.length > 0) {
      savedObservation.parts = parts;
      savedObservation = await this.observationRepository.save(savedObservation);
    }

    // Handle file attachments if provided
    if (createObservationDto.fileIds && createObservationDto.fileIds.length > 0) {
      await this.attachFilesToObservation(savedObservation.id, createObservationDto.fileIds);
    }

    return await this.findOne(savedObservation.id);
  }

  async findAll(queryFilter: ObservationQueryFilterDto): EntityFilteredListResults<Observation> {
    const [observations, totalResults] = await getEntityFilteredList({
      repository: this.observationRepository,
      queryFilter,
      withDeleted: queryFilter.includeDeleted,
      searchFields: ['title', 'reference', 'location'],
      relations: [
        { relation: 'report', alias: 'report' },
        { relation: 'parts', alias: 'parts' },
      ],
      filterOptions: [{ field: 'reportId', tableAlias: 'report', fieldAlias: 'id' }],
    });

    return [observations, observations.length, totalResults];
  }

  async findOne(id: number): Promise<Observation> {
    const observation = await this.observationRepository.findOne({
      where: { id },
      relations: ['report', 'parts', 'files'],
    });

    if (!observation) {
      throw new ObservationNotFoundException({ id });
    }

    return observation;
  }

  async update(id: number, updateObservationDto: UpdateObservationDto): Promise<Observation> {
    const observation = await this.findOne(id);

    // Update basic fields
    if (updateObservationDto.title) {
      observation.title = updateObservationDto.title;
    }
    if (updateObservationDto.reference) {
      observation.reference = updateObservationDto.reference;
    }
    if (updateObservationDto.location !== undefined) {
      observation.location = updateObservationDto.location;
    }
    if (updateObservationDto.priority !== undefined) {
      observation.priority = updateObservationDto.priority;
    }

    // Update status with validation
    if (updateObservationDto.status && updateObservationDto.status !== observation.status) {
      this.validateStatusTransition(observation.status, updateObservationDto.status);
      observation.status = updateObservationDto.status;
    }

    // Update dates
    if (updateObservationDto.startedAt) {
      observation.startedAt = new Date(updateObservationDto.startedAt);
    }
    if (updateObservationDto.endedAt) {
      observation.endedAt = new Date(updateObservationDto.endedAt);
    }

    // Update report if provided
    if (updateObservationDto.reportId) {
      const report = await this.reportService.findOne(updateObservationDto.reportId);
      observation.report = report;
    }

    // Update parts if provided
    if (updateObservationDto.partIds) {
      try {
        const parts = await this.partService.findByIds(updateObservationDto.partIds);
        observation.parts = parts;
      } catch (_error) {
        throw new PartsNotFoundException({ partIds: updateObservationDto.partIds.join(', ') });
      }
    }

    // Update files if provided
    if (updateObservationDto.fileIds) {
      // Remove existing file associations
      await this.observationFileRepository.delete({ observation: { id } });

      // Add new file associations
      if (updateObservationDto.fileIds.length > 0) {
        await this.attachFilesToObservation(id, updateObservationDto.fileIds);
      }
    }

    await this.observationRepository.save(observation);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    // Check if observation exists
    await this.findOne(id);

    // Soft delete the observation
    await this.observationRepository.softDelete(id);
  }

  async restore(id: number): Promise<Observation> {
    const observation = await this.observationRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!observation) {
      throw new ObservationNotFoundException({ id });
    }

    if (!observation.deletedAt) {
      return await this.findOne(id);
    }

    await this.observationRepository.restore(id);
    return await this.findOne(id);
  }

  async startObservation(id: number): Promise<Observation> {
    const observation = await this.findOne(id);

    if (observation.status !== ObservationStatus.OPEN) {
      throw new InvalidStatusTransitionException({
        currentStatus: observation.status,
        targetStatus: ObservationStatus.IN_PROGRESS,
        message: 'Only open observations can be started',
      });
    }

    observation.status = ObservationStatus.IN_PROGRESS;
    observation.startedAt = new Date();

    return await this.observationRepository.save(observation);
  }

  async finishObservation(id: number): Promise<Observation> {
    const observation = await this.findOne(id);

    if (observation.status !== ObservationStatus.IN_PROGRESS) {
      throw new InvalidStatusTransitionException({
        currentStatus: observation.status,
        targetStatus: ObservationStatus.FINISHED,
        message: 'Only in-progress observations can be finished',
      });
    }

    observation.status = ObservationStatus.FINISHED;
    observation.endedAt = new Date();

    return await this.observationRepository.save(observation);
  }

  async attachFileToObservation(observationId: number, file: MulterFile, userId: number): Promise<ObservationFile> {
    // Validate observation exists
    await this.findOne(observationId);

    // Create upload DTO for BET API
    const uploadDto: UploadProductDocumentDto = {
      serialNumber: `OBSERVATION-${observationId}-${Date.now()}`,
      issueDate: new Date().toISOString(),
      version: 1,
      typeId: 1, // Default document type for observations
      productIds: [], // Empty array since this is for observations, not products
      uploadedBy: userId,
    };

    const uploadedFile = await this.productDocumentService.uploadDocument(uploadDto, file, userId);

    // Check if the upload was successful by checking for error response structure
    if ('statusCode' in uploadedFile) {
      // This is an error response
      throw new Error(`File upload failed: ${uploadedFile.message}`);
    }

    // Create observation file association
    const observationFile = this.observationFileRepository.create({
      observation: { id: observationId },
      fileId: uploadedFile.id,
    });

    return await this.observationFileRepository.save(observationFile);
  }

  async getObservationFiles(observationId: number): Promise<ObservationFileWithDetailsResponse[]> {
    // Validate observation exists
    await this.findOne(observationId);

    const observationFiles = await this.observationFileRepository.find({
      where: { observation: { id: observationId } },
      relations: ['observation'],
    });

    // Fetch file information from BET API for each observation file
    const observationFilesWithDetails = await Promise.all(
      observationFiles.map(async (observationFile) => {
        try {
          const fileDetails = await this.productDocumentService.findOneDocumentById(observationFile.fileId);
          return {
            ...observationFile,
            file: fileDetails,
          };
        } catch (_error) {
          // If file not found in BET API, return observation file without details
          return {
            ...observationFile,
            file: null,
          };
        }
      }),
    );

    return observationFilesWithDetails;
  }

  async removeFileFromObservation(observationId: number, fileId: number): Promise<void> {
    // Validate observation exists
    await this.findOne(observationId);

    const observationFile = await this.observationFileRepository.findOne({
      where: { observation: { id: observationId }, fileId },
    });

    if (!observationFile) {
      throw new ObservationFileNotFoundException({ observationId, fileId });
    }

    // Delete file from BET API
    await this.productDocumentService.deleteDocument(fileId);

    // Remove association
    await this.observationFileRepository.remove(observationFile);
  }

  private async attachFilesToObservation(observationId: number, fileIds: number[]): Promise<void> {
    // Validate that all files exist in BET API
    for (const fileId of fileIds) {
      try {
        await this.productDocumentService.findOneDocumentById(fileId);
      } catch (_error) {
        throw new FileNotFoundException({ fileId });
      }
    }

    // Create observation file associations
    const observationFiles = fileIds.map((fileId) =>
      this.observationFileRepository.create({
        observation: { id: observationId },
        fileId,
      }),
    );

    await this.observationFileRepository.save(observationFiles);
  }

  private validateStatusTransition(currentStatus: ObservationStatus, newStatus: ObservationStatus): void {
    const validTransitions: Record<ObservationStatus, ObservationStatus[]> = {
      [ObservationStatus.OPEN]: [ObservationStatus.IN_PROGRESS],
      [ObservationStatus.IN_PROGRESS]: [ObservationStatus.FINISHED],
      [ObservationStatus.FINISHED]: [], // No valid transitions from finished
    };

    const allowedTransitions = validTransitions[currentStatus];
    if (!allowedTransitions.includes(newStatus)) {
      throw new InvalidStatusTransitionException({
        currentStatus,
        targetStatus: newStatus,
        message: `Invalid status transition from ${currentStatus} to ${newStatus}`,
      });
    }
  }
}
