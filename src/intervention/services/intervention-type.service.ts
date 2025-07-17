import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getEntityFilteredList } from '@src/paginator/paginator.service';
import { EntityFilteredListResults } from '@src/paginator/paginator.type';
import { Repository } from 'typeorm';
import { CreateInterventionTypeDto } from '../dto/create-intervention-type.dto';
import { InterventionTypeQueryFilterDto } from '../dto/intervention-type-query-filter.dto';
import { UpdateInterventionTypeDto } from '../dto/update-intervention-type.dto';
import { InterventionType } from '../entities/intervention-type.entity';
import {
  InterventionTypeAlreadyExistsException,
  InterventionTypeInUseException,
  InterventionTypeNotFoundException,
} from '../helpers/exceptions/intervention-type.exception';

@Injectable()
export class InterventionTypeService {
  constructor(
    @InjectRepository(InterventionType)
    private readonly interventionTypeRepository: Repository<InterventionType>,
  ) {}

  async create(createInterventionTypeDto: CreateInterventionTypeDto): Promise<InterventionType> {
    // Check if intervention type with the same code already exists
    const existingInterventionType = await this.interventionTypeRepository.findOne({
      where: { code: createInterventionTypeDto.code },
    });

    if (existingInterventionType) {
      throw new InterventionTypeAlreadyExistsException({ code: createInterventionTypeDto.code });
    }

    // Create new intervention type
    const interventionType = this.interventionTypeRepository.create(createInterventionTypeDto);

    return await this.interventionTypeRepository.save(interventionType);
  }

  async findAll(queryFilter: InterventionTypeQueryFilterDto): EntityFilteredListResults<InterventionType> {
    const [interventionTypes, totalResults] = await getEntityFilteredList({
      repository: this.interventionTypeRepository,
      queryFilter,
      withDeleted: queryFilter.includeDeleted,
      searchFields: ['code', 'name'],
    });
    return [interventionTypes, interventionTypes.length, totalResults];
  }

  async findOne(code: string): Promise<InterventionType> {
    const interventionType = await this.interventionTypeRepository.findOne({
      where: { code },
    });

    if (!interventionType) {
      throw new InterventionTypeNotFoundException({ code });
    }

    return interventionType;
  }

  async update(code: string, updateInterventionTypeDto: UpdateInterventionTypeDto): Promise<InterventionType> {
    const interventionType = await this.findOne(code);

    const { code: newCode, name } = updateInterventionTypeDto;

    // Check if the new code already exists (if code is being updated)
    if (newCode && newCode !== code) {
      const existingInterventionType = await this.interventionTypeRepository.findOne({
        where: { code: newCode },
      });

      if (existingInterventionType) {
        throw new InterventionTypeAlreadyExistsException({ code: newCode });
      }
    }

    // Update fields if provided
    if (newCode) {
      interventionType.code = newCode;
    }
    if (name) {
      interventionType.name = name;
    }

    return await this.interventionTypeRepository.save(interventionType);
  }

  async delete(code: string): Promise<void> {
    const interventionType = await this.findOne(code);

    // Check if the intervention type is being used by any interventions
    const interventionsCount = await this.interventionTypeRepository
      .createQueryBuilder('interventionType')
      .leftJoin('interventionType.interventions', 'intervention')
      .where('interventionType.code = :code', { code })
      .andWhere('intervention.id IS NOT NULL')
      .getCount();

    if (interventionsCount > 0) {
      throw new InterventionTypeInUseException({
        code,
        interventionsCount,
        message: `Cannot delete intervention type '${code}' as it is being used by ${interventionsCount} intervention(s)`,
      });
    }

    // If not in use, proceed with deletion
    await this.interventionTypeRepository.remove(interventionType);
  }
}
