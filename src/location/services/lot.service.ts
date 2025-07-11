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
import { LotUpdatedResponse } from '../types/building.types';
import { BuildingService } from './building.service';
import { PartFloorService } from './part-floor.service';

@Injectable()
export class LotService {
  constructor(
    @InjectRepository(Lot)
    private readonly lotRepository: Repository<Lot>,
    private readonly buildingService: BuildingService,
    private readonly partFloorService: PartFloorService,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async create(dto: CreateLotDto, user: LoggedUser): Promise<Lot> {
    const { name, buildingId, buildingFloorId, partFloorId } = dto;

    const building = await this.buildingService.findOne(buildingId, user);

    const buildingFloor = await this.buildingService.findOneFloor(buildingFloorId, user);
    if (buildingFloor.building.id !== buildingId) {
      throw new BuildingFloorNotOwnedException({ id: buildingFloorId });
    }

    let partFloor;
    if (partFloorId) {
      partFloor = await this.partFloorService.findOne(partFloorId, user);
      // Vérifier que le partFloor appartient au même buildingFloor
      if (partFloor.buildingFloor.id !== buildingFloorId) {
        throw new BuildingFloorNotOwnedException({ id: partFloorId });
      }
    }

    return await this.lotRepository.save({
      name,
      building,
      buildingFloor,
      ...(partFloor && { partFloor }),
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

    const { name, partFloorId } = dto;

    if (name) {
      lot.name = name;
    }

    if (partFloorId) {
      const partFloor = await this.partFloorService.findOne(partFloorId, user);
      // Vérifier que le partFloor appartient au même buildingFloor que le lot
      if (partFloor.buildingFloor.id !== lot.buildingFloor.id) {
        throw new BuildingFloorNotOwnedException({ id: partFloorId });
      }
      lot.partFloor = partFloor;
    }

    return await this.lotRepository.save(lot);
  }

  async softDelete(id: number, user: LoggedUser): Promise<void> {
    await this.findOne(id, user);
    await this.lotRepository.softDelete(id);
  }

  /**
   * Archives a lot by performing a soft delete.
   *
   * @param {Lot} lot - The lot entity to archive.
   * @returns {Promise<LotUpdatedResponse>} A response object containing the archived lot's details.
   */
  async archiveLot(lot: Lot): Promise<LotUpdatedResponse> {
    await this.lotRepository.softDelete(lot.id);
    return { message: 'Lot archived', id: lot.id, name: lot.name };
  }

  /**
   * Restores a previously archived lot.
   *
   * @param {Lot} lot - The lot entity to restore.
   * @returns {Promise<LotUpdatedResponse>} A response object containing the restored lot's details.
   */
  async restoreLot(lot: Lot): Promise<LotUpdatedResponse> {
    await this.lotRepository.restore(lot.id);
    return { message: 'Lot restored', id: lot.id, name: lot.name };
  }
}
