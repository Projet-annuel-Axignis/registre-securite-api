import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getEntityFilteredList } from '@src/paginator/paginator.service';
import { EntityFilteredListResults } from '@src/paginator/paginator.type';
import { User } from '@src/users/entities/user.entity';
import { UserService } from '@src/users/services/user.service';
import { Repository } from 'typeorm';
import { CreateInterventionDto } from '../dto/create-intervention.dto';
import { InterventionQueryFilterDto } from '../dto/intervention-query-filter.dto';
import { UpdateInterventionDto } from '../dto/update-intervention.dto';
import { InterventionType } from '../entities/intervention-type.entity';
import { Intervention } from '../entities/intervention.entity';
import {
  InterventionInUseException,
  InterventionNotFoundException,
  InterventionTypeNotFoundException,
  InvalidStatusTransitionException,
  UserNotFoundException,
} from '../helpers/exceptions/intervention.exception';
import { InterventionStatus } from '../types/intervention-status.types';

@Injectable()
export class InterventionService {
  constructor(
    @InjectRepository(Intervention)
    private readonly interventionRepository: Repository<Intervention>,
    @InjectRepository(InterventionType)
    private readonly interventionTypeRepository: Repository<InterventionType>,
    private readonly userService: UserService,
  ) {}

  async create(createInterventionDto: CreateInterventionDto): Promise<Intervention> {
    // Validate intervention type exists
    const interventionType = await this.interventionTypeRepository.findOne({
      where: { id: createInterventionDto.typeId },
    });

    if (!interventionType) {
      throw new InterventionTypeNotFoundException({ typeId: createInterventionDto.typeId });
    }

    // Validate user exists if terminatedById is provided
    let terminatedByUser: User | null = null;
    if (createInterventionDto.terminatedById) {
      terminatedByUser = await this.userService.findOneById(createInterventionDto.terminatedById);

      if (!terminatedByUser) {
        throw new UserNotFoundException({ userId: createInterventionDto.terminatedById });
      }
    }

    // Create new intervention
    const intervention = this.interventionRepository.create({
      ...createInterventionDto,
      type: interventionType,
      terminatedBy: terminatedByUser,
      plannedAt: createInterventionDto.plannedAt ? new Date(createInterventionDto.plannedAt) : null,
      startedAt: createInterventionDto.startedAt ? new Date(createInterventionDto.startedAt) : null,
      endedAt: createInterventionDto.endedAt ? new Date(createInterventionDto.endedAt) : null,
    });

    return await this.interventionRepository.save(intervention);
  }

  async findAll(queryFilter: InterventionQueryFilterDto): EntityFilteredListResults<Intervention> {
    const [interventions, totalResults] = await getEntityFilteredList({
      repository: this.interventionRepository,
      queryFilter,
      withDeleted: queryFilter.includeDeleted,
      searchFields: ['label', 'companyName', 'employeeName'],
      relations: [
        { relation: 'type', alias: 'type' },
        { relation: 'terminatedBy', alias: 'terminatedBy' },
        { relation: 'parts', alias: 'parts' },
      ],
    });
    return [interventions, interventions.length, totalResults];
  }

  async findOne(id: number): Promise<Intervention> {
    const intervention = await this.interventionRepository.findOne({
      where: { id },
      relations: ['type', 'terminatedBy', 'parts'],
    });

    if (!intervention) {
      throw new InterventionNotFoundException({ id });
    }

    return intervention;
  }

  async update(id: number, updateInterventionDto: UpdateInterventionDto): Promise<Intervention> {
    const intervention = await this.findOne(id);

    // Validate intervention type exists if typeId is being updated
    if (updateInterventionDto.typeId) {
      const interventionType = await this.interventionTypeRepository.findOne({
        where: { id: updateInterventionDto.typeId },
      });

      if (!interventionType) {
        throw new InterventionTypeNotFoundException({ typeId: updateInterventionDto.typeId });
      }
      intervention.type = interventionType;
    }

    // Validate user exists if terminatedById is being updated
    if (updateInterventionDto.terminatedById) {
      const terminatedByUser = await this.userService.findOneById(updateInterventionDto.terminatedById);

      if (!terminatedByUser) {
        throw new UserNotFoundException({ userId: updateInterventionDto.terminatedById });
      }
      intervention.terminatedBy = terminatedByUser;
    }

    // Validate status transitions
    if (updateInterventionDto.status && updateInterventionDto.status !== intervention.status) {
      this.validateStatusTransition(intervention.status, updateInterventionDto.status);
    }

    // Update fields if provided
    if (updateInterventionDto.label) {
      intervention.label = updateInterventionDto.label;
    }
    if (updateInterventionDto.companyName) {
      intervention.companyName = updateInterventionDto.companyName;
    }
    if (updateInterventionDto.employeeName) {
      intervention.employeeName = updateInterventionDto.employeeName;
    }
    if (updateInterventionDto.status) {
      intervention.status = updateInterventionDto.status;
    }
    if (updateInterventionDto.plannedAt) {
      intervention.plannedAt = new Date(updateInterventionDto.plannedAt);
    }
    if (updateInterventionDto.startedAt) {
      intervention.startedAt = new Date(updateInterventionDto.startedAt);
    }
    if (updateInterventionDto.endedAt) {
      intervention.endedAt = new Date(updateInterventionDto.endedAt);
    }

    return await this.interventionRepository.save(intervention);
  }

  async delete(id: number): Promise<void> {
    // Check if intervention exists and get it for validation
    await this.findOne(id);

    // Check if the intervention is being used by any reports
    const reportsCount = await this.interventionRepository
      .createQueryBuilder('intervention')
      .leftJoin('intervention.reports', 'report')
      .where('intervention.id = :id', { id })
      .andWhere('report.id IS NOT NULL')
      .getCount();

    if (reportsCount > 0) {
      throw new InterventionInUseException({
        id,
        reportsCount,
        message: `Cannot delete intervention with ID ${id} as it is being used by ${reportsCount} report(s)`,
      });
    }

    // If not in use, proceed with soft deletion
    await this.interventionRepository.softDelete(id);
  }

  async restore(id: number): Promise<Intervention> {
    // Check if intervention exists (including soft deleted ones)
    const intervention = await this.interventionRepository.findOne({
      where: { id },
      relations: ['type', 'terminatedBy'],
      withDeleted: true,
    });

    if (!intervention) {
      throw new InterventionNotFoundException({ id });
    }

    // Check if intervention is already active
    if (!intervention.deletedAt) {
      return intervention;
    }

    // Restore the intervention
    await this.interventionRepository.restore(id);

    // Return the restored intervention
    return await this.findOne(id);
  }

  async startIntervention(id: number): Promise<Intervention> {
    const intervention = await this.findOne(id);

    if (intervention.status !== InterventionStatus.PLANNED) {
      throw new InvalidStatusTransitionException({
        currentStatus: intervention.status,
        targetStatus: InterventionStatus.IN_PROGRESS,
        message: 'Only planned interventions can be started',
      });
    }

    intervention.status = InterventionStatus.IN_PROGRESS;
    intervention.startedAt = new Date();

    return await this.interventionRepository.save(intervention);
  }

  async terminateIntervention(id: number, terminatedById: number): Promise<Intervention> {
    const intervention = await this.findOne(id);

    if (intervention.status !== InterventionStatus.IN_PROGRESS) {
      throw new InvalidStatusTransitionException({
        currentStatus: intervention.status,
        targetStatus: InterventionStatus.TERMINATED,
        message: 'Only in-progress interventions can be terminated',
      });
    }

    const terminatedByUser = await this.userService.findOneById(terminatedById);

    if (!terminatedByUser) {
      throw new UserNotFoundException({ userId: terminatedById });
    }

    intervention.status = InterventionStatus.TERMINATED;
    intervention.endedAt = new Date();
    intervention.terminatedBy = terminatedByUser;

    return await this.interventionRepository.save(intervention);
  }

  private validateStatusTransition(currentStatus: InterventionStatus, newStatus: InterventionStatus): void {
    const validTransitions: Record<InterventionStatus, InterventionStatus[]> = {
      [InterventionStatus.PLANNED]: [InterventionStatus.IN_PROGRESS],
      [InterventionStatus.IN_PROGRESS]: [InterventionStatus.TERMINATED],
      [InterventionStatus.TERMINATED]: [], // No valid transitions from terminated
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
