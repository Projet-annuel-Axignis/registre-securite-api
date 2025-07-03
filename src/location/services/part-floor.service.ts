import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggedUser } from '@src/auth/types/logged-user.type';
import { PartFloor } from '@src/location/entities/part-floor.entity';
import { getEntityFilteredList } from '@src/paginator/paginator.service';
import { EntityFilteredListResults } from '@src/paginator/paginator.type';
import { RoleType } from '@src/users/types/role.types';
import { Repository } from 'typeorm';
import { CreatePartFloorDto } from '../dto/part-floor/create-part-floor.dto';
import { PartFloorQueryFilterDto } from '../dto/part-floor/part-floor-query-filter.dto';
import { UpdatePartFloorDto } from '../dto/part-floor/update-part-floor.dto';
import { PartFloorNotFoundException, PartFloorNotOwnedException } from '../helpers/exceptions/part-floor.exception';
import { SiteNotOwnedException } from '../helpers/exceptions/site.exception';
import { BuildingService } from './building.service';
import { PartService } from './part.service';

@Injectable()
export class PartFloorService {
  constructor(
    @InjectRepository(PartFloor)
    private readonly partFloorRepository: Repository<PartFloor>,
    private readonly buildingService: BuildingService,
    private readonly partService: PartService,
  ) {}

  async create(dto: CreatePartFloorDto, user: LoggedUser): Promise<PartFloor> {
    const {
      name,
      publicCount,
      staffCount,
      exploitationSurface,
      glaSurface,
      publicAccessSurface,
      buildingFloorId,
      partId,
    } = dto;

    const buildingFloor = await this.buildingService.findOneFloor(buildingFloorId, user);
    const part = await this.partService.findOne(partId, user);

    // Verify that the part belongs to the same building as the building floor
    if (part.building.id !== buildingFloor.building.id) {
      throw new PartFloorNotOwnedException({ id: partId });
    }

    const partFloor = this.partFloorRepository.create({
      name,
      publicCount,
      staffCount,
      exploitationSurface,
      glaSurface,
      publicAccessSurface,
      buildingFloor,
      part,
    });

    return await this.partFloorRepository.save(partFloor);
  }

  async findAll(queryFilter: PartFloorQueryFilterDto): EntityFilteredListResults<PartFloor> {
    const [partFloors, totalResults] = await getEntityFilteredList({
      repository: this.partFloorRepository,
      queryFilter,
      withDeleted: true,
      relations: [
        {
          relation: 'buildingFloor',
          alias: 'bf',
          joins: [
            {
              relation: 'building',
              alias: 'b',
              joins: [
                { relation: 'site', alias: 's', joins: [{ relation: 'company', alias: 'c' }] },
                { relation: 'users', alias: 'u' },
              ],
            },
          ],
        },
        { relation: 'part', alias: 'p' },
        { relation: 'lots', alias: 'l' },
      ],
      filterOptions: [{ field: 'companyId', tableAlias: 'c', fieldAlias: 'id' }],
    });
    return [partFloors, partFloors.length, totalResults];
  }

  async findOne(id: number, user: LoggedUser): Promise<PartFloor> {
    const partFloor = await this.partFloorRepository.findOne({
      where: { id },
      relations: {
        buildingFloor: { building: { site: { company: true }, users: true } },
        part: true,
        lots: true,
      },
    });

    if (!partFloor) {
      throw new PartFloorNotFoundException({ id });
    }

    if (
      user.role.type !== RoleType.ADMINISTRATOR &&
      partFloor.buildingFloor.building.site.company.id !== user.company.id
    ) {
      throw new SiteNotOwnedException({ id: partFloor.buildingFloor.building.site.id });
    }

    const isAuthorizedUser = partFloor.buildingFloor.building.users.some((u) => u.id === user.id);
    if (user.role.type === RoleType.COMPANY_MEMBER && !isAuthorizedUser) {
      throw new PartFloorNotOwnedException({ id: partFloor.id });
    }

    return partFloor;
  }

  async update(id: number, dto: UpdatePartFloorDto, user: LoggedUser): Promise<PartFloor> {
    const partFloor = await this.findOne(id, user);

    const {
      name,
      publicCount,
      staffCount,
      exploitationSurface,
      glaSurface,
      publicAccessSurface,
      buildingFloorId,
      partId,
    } = dto;

    if (name) {
      partFloor.name = name;
    }
    if (typeof publicCount === 'number') {
      partFloor.publicCount = publicCount;
    }
    if (typeof staffCount === 'number') {
      partFloor.staffCount = staffCount;
    }
    if (typeof exploitationSurface === 'number') {
      partFloor.exploitationSurface = exploitationSurface;
    }
    if (typeof glaSurface === 'number') {
      partFloor.glaSurface = glaSurface;
    }
    if (typeof publicAccessSurface === 'number') {
      partFloor.publicAccessSurface = publicAccessSurface;
    }
    if (buildingFloorId) {
      const buildingFloor = await this.buildingService.findOneFloor(buildingFloorId, user);
      partFloor.buildingFloor = buildingFloor;
    }
    if (partId) {
      const part = await this.partService.findOne(partId, user);
      // Verify that the part belongs to the same building as the building floor
      if (part.building.id !== partFloor.buildingFloor.building.id) {
        throw new PartFloorNotOwnedException({ id: partId });
      }
      partFloor.part = part;
    }

    return await this.partFloorRepository.save(partFloor);
  }

  async softDelete(id: number, user: LoggedUser): Promise<void> {
    await this.findOne(id, user);
    await this.partFloorRepository.softDelete(id);
  }
}
