import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getEntityFilteredList } from '@src/paginator/paginator.service';
import { EntityFilteredListResults } from '@src/paginator/paginator.type';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { OrganizationQueryFilterDto } from '../dto/organization-query-filter.dto';
import { UpdateOrganizationDto } from '../dto/update-organization.dto';
import { Organization } from '../entities/organization.entity';
import {
  OrganizationAlreadyExistsException,
  OrganizationInUseException,
  OrganizationNotFoundException,
} from '../helpers/exceptions/organization.exception';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) { }

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    // Check if organization with the same name already exists
    const existingOrganization = await this.organizationRepository.findOne({
      where: { name: createOrganizationDto.name },
    });

    if (existingOrganization) {
      throw new OrganizationAlreadyExistsException({ name: createOrganizationDto.name });
    }

    // Create new organization
    const organization = this.organizationRepository.create(createOrganizationDto);

    return await this.organizationRepository.save(organization);
  }

  async findAll(queryFilter: OrganizationQueryFilterDto): EntityFilteredListResults<Organization> {
    const [organizations, totalResults] = await getEntityFilteredList({
      repository: this.organizationRepository,
      queryFilter,
      withDeleted: queryFilter.includeDeleted,
      searchFields: ['name'],
    });
    return [organizations, organizations.length, totalResults];
  }

  async findOne(id: number): Promise<Organization> {
    const organization = await this.organizationRepository.findOne({
      where: { id },
    });

    if (!organization) {
      throw new OrganizationNotFoundException({ id });
    }

    return organization;
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    const organization = await this.findOne(id);

    const { name: newName, type } = updateOrganizationDto;

    // Check if the new name already exists (if name is being updated)
    if (newName && newName !== organization.name) {
      const existingOrganization = await this.organizationRepository.findOne({
        where: { name: newName },
      });

      if (existingOrganization) {
        throw new OrganizationAlreadyExistsException({ name: newName });
      }
    }

    // Update fields if provided
    if (newName) {
      organization.name = newName;
    }
    if (type) {
      organization.type = type;
    }

    return await this.organizationRepository.save(organization);
  }

  async delete(id: number): Promise<void> {
    const organization = await this.findOne(id);

    // Check if the organization is being used by any reports
    const reportsCount = await this.organizationRepository
      .createQueryBuilder('organization')
      .leftJoin('organization.reports', 'report')
      .where('organization.id = :id', { id })
      .andWhere('report.id IS NOT NULL')
      .getCount();

    if (reportsCount > 0) {
      throw new OrganizationInUseException({
        id,
        reportsCount,
        message: `Cannot delete organization with id '${id}' as it is being used by ${reportsCount} report(s)`,
      });
    }

    // If not in use, proceed with deletion
    await this.organizationRepository.remove(organization);
  }
}
