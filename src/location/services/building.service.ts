import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggedUser } from '@src/auth/types/logged-user.type';
import { BuildingFloor } from '@src/location/entities/building-floor.entity';
import { Building } from '@src/location/entities/building.entity';
import { getEntityFilteredList } from '@src/paginator/paginator.service';
import { EntityFilteredListResults } from '@src/paginator/paginator.type';
import { UserNotOwnedCompanyException } from '@src/users/helpers/exceptions/user.exception';
import { UserService } from '@src/users/services/user.service';
import { RoleType } from '@src/users/types/role.types';
import { Repository } from 'typeorm';
import { BuildingFloorQueryFilterDto } from '../dto/building-floor/building-floor-query-filter.dto';
import { CreateBuildingFloorDto } from '../dto/building-floor/create-building-floor.dto';
import { UpdateBuildingFloorDto } from '../dto/building-floor/update-building-floor.dto';
import { BuildingQueryFilterDto } from '../dto/building/building-query-filter.dto';
import { CreateBuildingDto } from '../dto/building/create-building.dto';
import { UpdateBuildingDto } from '../dto/building/update-building.dto';
import {
  BuildingFloorNotFoundException,
  BuildingFloorNotOwnedException,
} from '../helpers/exceptions/building-floor.exception';
import { BuildingNotFoundException, BuildingNotOwnedException } from '../helpers/exceptions/building.exception';
import { SiteNotOwnedException } from '../helpers/exceptions/site.exception';
import { TypologyCode } from '../types/typology-code.types';
import { BuildingEnumService } from './building-enum.service';
import { SiteService } from './site.service';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
    @InjectRepository(BuildingFloor)
    private readonly buildingFloorRepository: Repository<BuildingFloor>,
    private readonly siteService: SiteService,
    private readonly userService: UserService,
    private readonly buildingEnumService: BuildingEnumService,
  ) {}

  async create(dto: CreateBuildingDto, user: LoggedUser): Promise<Building> {
    const { name, siteId, typologyCodes, ighClassCodes, erpCategory: erpCategoryCategory, authorizedUserIds } = dto;
    const site = await this.siteService.findOne(siteId);

    if (user.role.type !== RoleType.ADMINISTRATOR && site.companyId !== user.company.id)
      throw new SiteNotOwnedException({ id: siteId });

    const typologies = await this.buildingEnumService.findManyTypologies(typologyCodes);
    const creatingBuilding = this.buildingRepository.create({ name, site, typologies });

    if (typologyCodes.includes(TypologyCode.IGH)) {
      const ighClasses = await this.buildingEnumService.findManyIghClasses(ighClassCodes);
      creatingBuilding.ighClasses = ighClasses;
    }
    if (typologyCodes.includes(TypologyCode.ERP)) {
      const erpCategory = await this.buildingEnumService.findErpCategory(erpCategoryCategory);
      creatingBuilding.erpCategory = erpCategory;
    }

    if (authorizedUserIds) {
      const users = await this.userService.findManyById(authorizedUserIds);
      const wrongUser = users.find((user) => user.company.id !== site.companyId);
      if (wrongUser) throw new UserNotOwnedCompanyException({ userId: wrongUser.id });
      creatingBuilding.users = users;
    }

    return await this.buildingRepository.save(creatingBuilding);
  }

  async findAll(queryFilter: BuildingQueryFilterDto): EntityFilteredListResults<Building> {
    const [buildings, totalResults] = await getEntityFilteredList({
      repository: this.buildingRepository,
      queryFilter,
      withDeleted: true,
      relations: [{ relation: 'site', alias: 's', joins: [{ relation: 'company', alias: 'c' }] }],
      filterOptions: [{ field: 'companyId', tableAlias: 'c', fieldAlias: 'id' }],
    });
    return [buildings, buildings.length, totalResults];
  }

  async findOne(id: number, user: LoggedUser): Promise<Building> {
    const building = await this.buildingRepository.findOne({
      where: { id },
      relations: { site: { company: true }, users: true },
    });

    if (!building) {
      throw new BuildingNotFoundException({ id });
    }

    if (user.role.type !== RoleType.ADMINISTRATOR && building.site.company.id !== user.company.id) {
      throw new SiteNotOwnedException({ id: building.site.id });
    }

    const isAuthorizedUser = building.users.some((u) => u.id === user.id);
    if (user.role.type === RoleType.COMPANY_MEMBER && !isAuthorizedUser)
      throw new BuildingNotOwnedException({ id: building.id });

    return building;
  }

  async update(id: number, dto: UpdateBuildingDto, user: LoggedUser): Promise<Building> {
    const building = await this.findOne(id, user);

    const { name, typologyCodes, ighClassCodes, erpCategory: erpCategoryCategory, authorizedUserIds } = dto;

    if (name) {
      building.name = name;
    }

    if (typologyCodes) {
      const typologies = await this.buildingEnumService.findManyTypologies(typologyCodes);
      building.typologies = typologies;

      if (typologyCodes.includes(TypologyCode.IGH)) {
        if (ighClassCodes) {
          const ighClasses = await this.buildingEnumService.findManyIghClasses(ighClassCodes);
          building.ighClasses = ighClasses;
        }
      } else {
        building.ighClasses = [];
      }

      if (typologyCodes.includes(TypologyCode.ERP)) {
        if (erpCategoryCategory) {
          const erpCategory = await this.buildingEnumService.findErpCategory(erpCategoryCategory);
          building.erpCategory = erpCategory;
        }
      } else {
        building.erpCategory = null;
      }
    }

    if (authorizedUserIds) {
      const users = await this.userService.findManyById(authorizedUserIds);
      const wrongUser = users.find((user) => user.company.id !== building.site.company.id);
      if (wrongUser) throw new UserNotOwnedCompanyException({ userId: wrongUser.id });
      building.users = users;
    }

    return await this.buildingRepository.save(building);
  }

  async softDelete(id: number, user: LoggedUser): Promise<void> {
    await this.findOne(id, user);
    await this.buildingRepository.softDelete(id);
  }

  async createFloor(dto: CreateBuildingFloorDto, user: LoggedUser): Promise<BuildingFloor> {
    const building = await this.buildingRepository.findOne({
      where: { id: dto.buildingId },
      relations: { site: { company: true }, users: true },
    });

    if (!building) {
      throw new BuildingNotFoundException({ id: dto.buildingId });
    }

    if (user.role.type !== RoleType.ADMINISTRATOR && building.site.company.id !== user.company.id) {
      throw new SiteNotOwnedException({ id: building.site.id });
    }

    // Check if user is authorized to create floor in the building
    if (building.users.length > 0 && !building.users.some((authorizedUser) => authorizedUser.id === user.id)) {
      throw new BuildingNotOwnedException({ id: building.id });
    }

    const buildingFloor = this.buildingFloorRepository.create({
      name: dto.name,
      building,
    });

    return await this.buildingFloorRepository.save(buildingFloor);
  }

  async findAllFloor(queryFilter: BuildingFloorQueryFilterDto): EntityFilteredListResults<BuildingFloor> {
    const [buildingFloors, totalResults] = await getEntityFilteredList({
      repository: this.buildingFloorRepository,
      queryFilter,
      withDeleted: true,
      relations: [
        {
          relation: 'building',
          alias: 'b',
          joins: [{ relation: 'site', alias: 's', joins: [{ relation: 'company', alias: 'c' }] }],
        },
      ],
      filterOptions: [{ field: 'companyId', tableAlias: 'c', fieldAlias: 'id' }],
    });
    return [buildingFloors, buildingFloors.length, totalResults];
  }

  async findOneFloor(id: number, user: LoggedUser): Promise<BuildingFloor> {
    const buildingFloor = await this.buildingFloorRepository.findOne({
      where: { id },
      relations: { building: { site: { company: true }, users: true } },
    });

    if (!buildingFloor) {
      throw new BuildingFloorNotFoundException({ id });
    }

    if (user.role.type !== RoleType.ADMINISTRATOR && buildingFloor.building.site.company.id !== user.company.id) {
      throw new SiteNotOwnedException({ id: buildingFloor.building.site.id });
    }

    const isAuthorizedUser = buildingFloor.building.users.some((u) => u.id === user.id);
    if (user.role.type === RoleType.COMPANY_MEMBER && !isAuthorizedUser)
      throw new BuildingFloorNotOwnedException({ id: buildingFloor.id });

    return buildingFloor;
  }

  async updateFloor(id: number, dto: UpdateBuildingFloorDto, user: LoggedUser): Promise<BuildingFloor> {
    const buildingFloor = await this.findOneFloor(id, user);

    if (dto.name) {
      buildingFloor.name = dto.name;
    }

    return await this.buildingFloorRepository.save(buildingFloor);
  }

  async softDeleteFloor(id: number, user: LoggedUser): Promise<void> {
    await this.findOneFloor(id, user);
    await this.buildingFloorRepository.softDelete(id);
  }
}
