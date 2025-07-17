import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggedUser } from '@src/auth/types/logged-user.type';
import { Part } from '@src/location/entities/part.entity';
import { getEntityFilteredList } from '@src/paginator/paginator.service';
import { EntityFilteredListResults } from '@src/paginator/paginator.type';
import { RoleType } from '@src/users/types/role.types';
import { Repository } from 'typeorm';
import { CreatePartDto } from '../dto/part/create-part.dto';
import { PartQueryFilterDto } from '../dto/part/part-query-filter.dto';
import { UpdatePartDto } from '../dto/part/update-part.dto';
import { PartNotFoundException, PartNotOwnedException } from '../helpers/exceptions/part.exception';
import { SiteNotOwnedException } from '../helpers/exceptions/site.exception';
import { PartUpdatedResponse } from '../types/building.types';
import { TypologyCode } from './../types/typology-code.types';
import { BuildingService } from './building.service';
import { ErpTypeService } from './erp-type.service';
import { HabFamilyService } from './hab-family.service';

@Injectable()
export class PartService {
  constructor(
    @InjectRepository(Part)
    private readonly partRepository: Repository<Part>,
    private readonly buildingService: BuildingService,
    private readonly erpTypeService: ErpTypeService,
    private readonly habFamilyService: HabFamilyService,
  ) {}

  async create(dto: CreatePartDto, user: LoggedUser): Promise<Part> {
    const { name, buildingId, type, isIcpe, habFamilyName, erpTypeCodes } = dto;

    const building = await this.buildingService.findOne(buildingId, user);

    const part = this.partRepository.create({
      name,
      type,
      isIcpe,
      building,
    });

    if (building.typologies.some((t) => t.code === TypologyCode.ERP)) {
      part.erpTypes = await this.erpTypeService.findAllByCode(erpTypeCodes ?? []);
    } else {
      part.erpTypes = [];
    }

    if (building.typologies.some((t) => t.code === TypologyCode.HAB) && habFamilyName) {
      part.habFamily = await this.habFamilyService.findOneByName(habFamilyName);
    }

    return await this.partRepository.save(part);
  }

  async findAll(queryFilter: PartQueryFilterDto): EntityFilteredListResults<Part> {
    const [parts, totalResults] = await getEntityFilteredList({
      repository: this.partRepository,
      queryFilter,
      withDeleted: queryFilter.includeDeleted,
      relations: [
        {
          relation: 'building',
          alias: 'b',
          joins: [
            { relation: 'site', alias: 's', joins: [{ relation: 'company', alias: 'c' }] },
            { relation: 'users', alias: 'u' },
          ],
        },
        { relation: 'partFloors', alias: 'pf' },
        { relation: 'habFamily', alias: 'hf' },
        { relation: 'erpTypes', alias: 'et' },
        { relation: 'interventions', alias: 'interventions' },
      ],
      filterOptions: [{ field: 'companyId', tableAlias: 'c', fieldAlias: 'id' }],
    });
    return [parts, parts.length, totalResults];
  }

  async findOne(id: number, user: LoggedUser): Promise<Part> {
    const part = await this.partRepository.findOne({
      where: { id },
      relations: {
        building: { site: { company: true }, users: true, typologies: true },
        partFloors: true,
        habFamily: true,
        erpTypes: true,
        interventions: true,
      },
    });

    if (!part) {
      throw new PartNotFoundException({ id });
    }

    if (user.role.type !== RoleType.ADMINISTRATOR && part.building.site.company.id !== user.company.id) {
      throw new SiteNotOwnedException({ id: part.building.site.id });
    }

    const isAuthorizedUser = part.building.users.some((u) => u.id === user.id);
    if (user.role.type === RoleType.COMPANY_MEMBER && !isAuthorizedUser) {
      throw new PartNotOwnedException({ id: part.id });
    }

    return part;
  }

  /**
   * Find parts by IDs without user authorization for internal service use
   * This method is intended for use by other services that need to validate part existence
   */
  async findByIds(ids: number[]): Promise<Part[]> {
    const parts = await this.partRepository.findByIds(ids);

    if (parts.length !== ids.length) {
      const foundIds = parts.map((part) => part.id);
      const missingIds = ids.filter((id) => !foundIds.includes(id));
      throw new PartNotFoundException({
        missingIds: missingIds.join(', '),
        message: `Parts with IDs ${missingIds.join(', ')} not found`,
      });
    }

    return parts;
  }

  async update(id: number, dto: UpdatePartDto, user: LoggedUser): Promise<Part> {
    const part = await this.findOne(id, user);

    const { name, type, isIcpe, habFamilyName, erpTypeCodes } = dto;

    if (name) {
      part.name = name;
    }
    if (type) {
      part.type = type;
    }
    if (typeof isIcpe === 'boolean') {
      part.isIcpe = isIcpe;
    }

    if (part.building.typologies?.some((t) => t.code === TypologyCode.ERP)) {
      part.erpTypes = await this.erpTypeService.findAllByCode(erpTypeCodes ?? []);
    }

    if (part.building.typologies?.some((t) => t.code === TypologyCode.HAB) && habFamilyName) {
      part.habFamily = await this.habFamilyService.findOneByName(habFamilyName);
    }

    return await this.partRepository.save(part);
  }

  async softDelete(id: number, user: LoggedUser): Promise<void> {
    await this.findOne(id, user);
    await this.partRepository.softDelete(id);
  }

  /**
   * Archives a part by performing a soft delete.
   *
   * @param {Part} part - The part entity to archive.
   * @returns {Promise<PartUpdatedResponse>} A response object containing the archived part's details.
   */
  async archivePart(part: Part): Promise<PartUpdatedResponse> {
    await this.partRepository.softDelete(part.id);
    return { message: 'Part archived', id: part.id, name: part.name };
  }

  /**
   * Restores a previously archived part.
   *
   * @param {Part} part - The part entity to restore.
   * @returns {Promise<PartUpdatedResponse>} A response object containing the restored part's details.
   */
  async restorePart(part: Part): Promise<PartUpdatedResponse> {
    await this.partRepository.restore(part.id);
    return { message: 'Part restored', id: part.id, name: part.name };
  }
}
