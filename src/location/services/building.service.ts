import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggedUser } from '@src/auth/types/logged-user.type';
import { Building } from '@src/location/entities/building.entity';
import { getEntityFilteredList } from '@src/paginator/paginator.service';
import { EntityFilteredListResults } from '@src/paginator/paginator.type';
import { UserNotOwnedCompanyException } from '@src/users/helpers/exceptions/user.exception';
import { UserService } from '@src/users/services/user.service';
import { RoleType } from '@src/users/types/role.types';
import { Repository } from 'typeorm';
import { BuildingQueryFilterDto } from '../dto/building/building-query-filter.dto';
import { CreateBuildingDto } from '../dto/building/create-building.dto';
import { SiteNotOwnedException } from '../helpers/exceptions/site.exception';
import { TypologyCode } from '../types/typology-code.types';
import { BuildingEnumService } from './building-enum.service';
import { SiteService } from './site.service';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
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
}
