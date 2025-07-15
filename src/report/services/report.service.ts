import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadProductDocumentDto } from '@src/bet/dtos/product/upload-product-document.dto';
import { EquipmentService } from '@src/bet/services/equipment.service';
import { ProductDocumentService } from '@src/bet/services/product-document.service';
import { MulterFile } from '@src/bet/types/product/multer-file.types';
import { Intervention } from '@src/intervention/entities/intervention.entity';
import { InterventionService } from '@src/intervention/services/intervention.service';
import { Part } from '@src/location/entities/part.entity';
import { Typology } from '@src/location/entities/typology.entity';
import { PartService } from '@src/location/services/part.service';
import { TypologyCode } from '@src/location/types/typology-code.types';
import { getEntityFilteredList } from '@src/paginator/paginator.service';
import { EntityFilteredListResults } from '@src/paginator/paginator.type';
import { Repository } from 'typeorm';
import { CreateReportDto } from '../dto/create-report.dto';
import { ReportQueryFilterDto } from '../dto/report-query-filter.dto';
import { UpdateReportDto } from '../dto/update-report.dto';
import { Organization } from '../entities/organization.entity';
import { ReportEquipment } from '../entities/report-equipment.entity';
import { ReportFile } from '../entities/report-file.entity';
import { Report } from '../entities/report.entity';
import {
  EquipmentTypeNotFoundException,
  FileNotFoundException,
  PartsNotFoundException,
  ReportEquipmentNotFoundException,
  ReportFileNotFoundException,
  ReportInUseException,
  ReportNotFoundException,
  TypologyNotFoundException,
} from '../helpers/exceptions/report.exception';
import { OrganizationService } from './organization.service';
import { ReportTypeService } from './report-type.service';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(ReportFile)
    private readonly reportFileRepository: Repository<ReportFile>,
    @InjectRepository(ReportEquipment)
    private readonly reportEquipmentRepository: Repository<ReportEquipment>,
    @InjectRepository(Typology)
    private readonly typologyRepository: Repository<Typology>,
    private readonly interventionService: InterventionService,
    private readonly reportTypeService: ReportTypeService,
    private readonly organizationService: OrganizationService,
    private readonly partService: PartService,
    private readonly productDocumentService: ProductDocumentService,
    private readonly equipmentService: EquipmentService,
  ) {}

  async create(createReportDto: CreateReportDto): Promise<Report> {
    // Validate report type exists
    const reportType = await this.reportTypeService.findOne(createReportDto.typeCode);

    // Validate typology exists if provided
    let typology: Typology | null = null;
    if (createReportDto.typologyCode) {
      typology = await this.typologyRepository.findOne({
        where: { code: createReportDto.typologyCode as TypologyCode },
      });

      if (!typology) {
        throw new TypologyNotFoundException({ typologyCode: createReportDto.typologyCode });
      }
    }

    // Validate organization exists if provided
    let organization: Organization | null = null;
    if (createReportDto.organizationId) {
      organization = await this.organizationService.findOne(createReportDto.organizationId);
    }

    // Validate intervention exists if provided
    let intervention: Intervention | null = null;
    if (createReportDto.interventionId) {
      intervention = await this.interventionService.findOne(createReportDto.interventionId);
    }

    // Validate parts exist if provided
    let parts: Part[] = [];
    if (createReportDto.partIds && createReportDto.partIds.length > 0) {
      try {
        parts = await this.partService.findByIds(createReportDto.partIds);
      } catch (_error) {
        throw new PartsNotFoundException({ partIds: createReportDto.partIds.join(', ') });
      }
    }

    // Create the report
    const report = this.reportRepository.create({
      label: createReportDto.label,
      type: reportType,
      typology,
      organization,
      intervention,
      parts,
    });

    const savedReport = await this.reportRepository.save(report);

    // Handle file attachments if provided
    if (createReportDto.fileIds && createReportDto.fileIds.length > 0) {
      await this.attachFilesToReport(savedReport.id, createReportDto.fileIds);
    }

    // Handle equipment type attachments if provided
    if (createReportDto.equipmentTypeIds && createReportDto.equipmentTypeIds.length > 0) {
      await this.attachEquipmentTypesToReport(savedReport.id, createReportDto.equipmentTypeIds);
    }

    return await this.findOne(savedReport.id);
  }

  async findAll(queryFilter: ReportQueryFilterDto): EntityFilteredListResults<Report> {
    const [reports, totalResults] = await getEntityFilteredList({
      repository: this.reportRepository,
      queryFilter,
      withDeleted: queryFilter.includeDeleted,
      searchFields: ['label'],
      relations: [
        { relation: 'type', alias: 'type' },
        { relation: 'typology', alias: 'typology' },
        { relation: 'organization', alias: 'organization' },
        { relation: 'intervention', alias: 'intervention' },
        { relation: 'parts', alias: 'parts' },
        { relation: 'equipments', alias: 'equipments' },
      ],
    });

    return [reports, reports.length, totalResults];
  }

  async findOne(id: number): Promise<Report> {
    const report = await this.reportRepository.findOne({
      where: { id },
      relations: [
        'type',
        'typology',
        'organization',
        'intervention',
        'parts',
        'files',
        'equipments',
        'observations',
        'equipments',
      ],
    });

    if (!report) {
      throw new ReportNotFoundException({ id });
    }

    return report;
  }

  async update(id: number, updateReportDto: UpdateReportDto): Promise<Report> {
    const report = await this.findOne(id);

    // Update basic fields
    if (updateReportDto.label) {
      report.label = updateReportDto.label;
    }

    // Update report type if provided
    if (updateReportDto.typeCode) {
      const reportType = await this.reportTypeService.findOne(updateReportDto.typeCode);
      report.type = reportType;
    }

    // Update typology if provided
    if (updateReportDto.typologyCode) {
      const typology = await this.typologyRepository.findOne({
        where: { code: updateReportDto.typologyCode as TypologyCode },
      });

      if (!typology) {
        throw new TypologyNotFoundException({ typologyCode: updateReportDto.typologyCode });
      }
      report.typology = typology;
    }

    // Update organization if provided
    if (updateReportDto.organizationId) {
      const organization = await this.organizationService.findOne(updateReportDto.organizationId);
      report.organization = organization;
    }

    // Update intervention if provided
    if (updateReportDto.interventionId) {
      const intervention = await this.interventionService.findOne(updateReportDto.interventionId);
      report.intervention = intervention;
    }

    // Update parts if provided
    if (updateReportDto.partIds) {
      try {
        const parts = await this.partService.findByIds(updateReportDto.partIds);
        report.parts = parts;
      } catch (_error) {
        throw new PartsNotFoundException({ partIds: updateReportDto.partIds.join(', ') });
      }
    }

    // Update files if provided
    if (updateReportDto.fileIds) {
      // Remove existing file associations
      await this.reportFileRepository.delete({ report: { id } });

      // Add new file associations
      if (updateReportDto.fileIds.length > 0) {
        await this.attachFilesToReport(id, updateReportDto.fileIds);
      }
    }

    // Update equipment types if provided
    if (updateReportDto.equipmentTypeIds) {
      // Remove existing equipment associations
      await this.reportEquipmentRepository.delete({ report: { id } });

      // Add new equipment associations
      if (updateReportDto.equipmentTypeIds.length > 0) {
        await this.attachEquipmentTypesToReport(id, updateReportDto.equipmentTypeIds);
      }
    }

    await this.reportRepository.save(report);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const report = await this.findOne(id);

    // Check if report has observations
    if (report.observations && report.observations.length > 0) {
      throw new ReportInUseException({
        id,
        observationsCount: report.observations.length,
        message: `Cannot delete report with ID ${id} as it has ${report.observations.length} observation(s)`,
      });
    }

    // Soft delete the report
    await this.reportRepository.softDelete(id);
  }

  async restore(id: number): Promise<Report> {
    const report = await this.reportRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!report) {
      throw new ReportNotFoundException({ id });
    }

    if (!report.deletedAt) {
      return await this.findOne(id);
    }

    await this.reportRepository.restore(id);
    return await this.findOne(id);
  }

  async attachFileToReport(reportId: number, file: MulterFile, userId: number): Promise<ReportFile> {
    // Validate report exists
    await this.findOne(reportId);

    // Create upload DTO for BET API
    const uploadDto: UploadProductDocumentDto = {
      serialNumber: `REPORT-${reportId}-${Date.now()}`,
      fileName: file.originalName,
      size: file.buffer.length,
      mimeType: file.mimetype,
      issueDate: new Date().toISOString(),
      version: 1,
      typeId: 1, // Default document type for reports
      productIds: [], // Empty array since this is for reports, not products
      uploadedBy: userId,
    };

    const uploadedFile = await this.productDocumentService.uploadDocument(uploadDto, file, userId);

    // Create report file association
    const reportFile = this.reportFileRepository.create({
      report: { id: reportId },
      fileId: uploadedFile.id,
    });

    return await this.reportFileRepository.save(reportFile);
  }

  async getReportFiles(reportId: number): Promise<ReportFile[]> {
    // Validate report exists
    await this.findOne(reportId);

    const reportFiles = await this.reportFileRepository.find({
      where: { report: { id: reportId } },
      relations: ['report'],
    });

    return reportFiles;
  }

  async removeFileFromReport(reportId: number, fileId: number): Promise<void> {
    // Validate report exists
    await this.findOne(reportId);

    const reportFile = await this.reportFileRepository.findOne({
      where: { report: { id: reportId }, fileId },
    });

    if (!reportFile) {
      throw new ReportFileNotFoundException({ reportId, fileId });
    }

    // Delete file from BET API
    await this.productDocumentService.deleteDocument(fileId);

    // Remove association
    await this.reportFileRepository.remove(reportFile);
  }

  private async attachFilesToReport(reportId: number, fileIds: number[]): Promise<void> {
    // Validate that all files exist in BET API
    for (const fileId of fileIds) {
      try {
        await this.productDocumentService.findOneDocumentById(fileId);
      } catch (_error) {
        throw new FileNotFoundException({ fileId });
      }
    }

    // Create report file associations
    const reportFiles = fileIds.map((fileId) =>
      this.reportFileRepository.create({
        report: { id: reportId },
        fileId,
      }),
    );

    await this.reportFileRepository.save(reportFiles);
  }

  async getReportEquipment(reportId: number): Promise<ReportEquipment[]> {
    // Validate report exists
    await this.findOne(reportId);

    const reportEquipment = await this.reportEquipmentRepository.find({
      where: { report: { id: reportId } },
      relations: ['report'],
    });

    return reportEquipment;
  }

  async removeEquipmentFromReport(reportId: number, equipmentTypeId: number): Promise<void> {
    // Validate report exists
    await this.findOne(reportId);

    const reportEquipment = await this.reportEquipmentRepository.findOne({
      where: { report: { id: reportId }, equipmentId: equipmentTypeId },
    });

    if (!reportEquipment) {
      throw new ReportEquipmentNotFoundException({ reportId, equipmentTypeId });
    }

    // Remove association
    await this.reportEquipmentRepository.remove(reportEquipment);
  }

  private async attachEquipmentTypesToReport(reportId: number, equipmentTypeIds: number[]): Promise<void> {
    // Validate that all equipment types exist in BET API
    for (const equipmentTypeId of equipmentTypeIds) {
      try {
        await this.equipmentService.findOneEquipmentTypeById(equipmentTypeId);
      } catch (_error) {
        throw new EquipmentTypeNotFoundException({ equipmentTypeId });
      }
    }

    // Create report equipment associations
    const reportEquipment = equipmentTypeIds.map((equipmentTypeId) =>
      this.reportEquipmentRepository.create({
        report: { id: reportId },
        equipmentId: equipmentTypeId,
      }),
    );

    await this.reportEquipmentRepository.save(reportEquipment);
  }
}
