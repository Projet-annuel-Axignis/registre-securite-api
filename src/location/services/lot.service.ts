import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggedUser } from '@src/auth/types/logged-user.type';
import { Lot } from '@src/location/entities/lot.entity';
import { getEntityFilteredList } from '@src/paginator/paginator.service';
import { EntityFilteredListResults } from '@src/paginator/paginator.type';
import { RoleType } from '@src/users/types/role.types';
import { Repository } from 'typeorm';
import { CreateLotDto } from '../dto/lot/create-lot.dto';
import { LotQueryFilterDto } from '../dto/lot/lot-query-filter.dto';
import { UpdateLotDto } from '../dto/lot/update-lot.dto';
import { BuildingFloorNotOwnedException } from '../helpers/exceptions/building-floor.exception';
import { LotNotFoundException, LotNotOwnedException } from '../helpers/exceptions/lot.exception';
import { SiteNotOwnedException } from '../helpers/exceptions/site.exception';
import { BuildingService } from './building.service';

@Injectable()
export class LotService {
  constructor(
    @InjectRepository(Lot)
    private readonly lotRepository: Repository<Lot>,
    private readonly buildingService: BuildingService,
  ) {}

  async create(dto: CreateLotDto, user: LoggedUser): Promise<Lot> {
    const { name, buildingId, buildingFloorId } = dto;

    const building = await this.buildingService.findOne(buildingId, user);

    const buildingFloor = await this.buildingService.findOneFloor(buildingFloorId, user);
    if (buildingFloor.building.id !== buildingId) {
      throw new BuildingFloorNotOwnedException({ id: buildingFloorId });
    }

    // TODO : add part floor

    return await this.lotRepository.save({
      name,
      building,
      buildingFloor,
    });
  }

  async findAll(queryFilter: LotQueryFilterDto): EntityFilteredListResults<Lot> {
    const [lots, totalResults] = await getEntityFilteredList({
      repository: this.lotRepository,
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
        { relation: 'buildingFloor', alias: 'bf' },
        { relation: 'partFloor', alias: 'pf' },
      ],
      filterOptions: [
        { field: 'companyId', tableAlias: 'c', fieldAlias: 'id' },
        { field: 'siteId', tableAlias: 's', fieldAlias: 'id' },
      ],
    });
    return [lots, lots.length, totalResults];
  }

  async findOne(id: number, user: LoggedUser): Promise<Lot> {
    const lot = await this.lotRepository.findOne({
      where: { id },
      relations: {
        building: { site: { company: true }, users: true },
        buildingFloor: true,
        partFloor: true,
      },
    });

    if (!lot) {
      throw new LotNotFoundException({ id });
    }

    if (user.role.type !== RoleType.ADMINISTRATOR && lot.building.site.company.id !== user.company.id) {
      throw new SiteNotOwnedException({ id: lot.building.site.id });
    }

    const isAuthorizedUser = lot.building.users.some((u) => u.id === user.id);
    if (user.role.type === RoleType.COMPANY_MEMBER && !isAuthorizedUser) {
      throw new LotNotOwnedException({ id: lot.id });
    }

    return lot;
  }

  async update(id: number, dto: UpdateLotDto, user: LoggedUser): Promise<Lot> {
    const lot = await this.findOne(id, user);

    const { name } = dto;

    if (name) {
      lot.name = name;
    }

    // TODO : add part floor

    return await this.lotRepository.save(lot);
  }

  async softDelete(id: number, user: LoggedUser): Promise<void> {
    await this.findOne(id, user);
    await this.lotRepository.softDelete(id);
  }
}
