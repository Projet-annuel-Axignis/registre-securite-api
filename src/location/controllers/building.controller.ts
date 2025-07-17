import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActivityLogger } from '@src/activity-logger/helpers/activity-logger.decorator';
import { Resources } from '@src/activity-logger/types/resource.types';
import { Roles } from '@src/auth/decorators/role.decorator';
import { GetUser } from '@src/auth/decorators/user.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt.guard';
import { RolesGuard } from '@src/auth/guards/role.guard';
import { LoggedUser } from '@src/auth/types/logged-user.type';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { FilterOp, PaginatedList } from '@src/paginator/paginator.type';
import { RoleType } from '@src/users/types/role.types';
import { BuildingFloorQueryFilterDto } from '../dto/building-floor/building-floor-query-filter.dto';
import { CreateBuildingFloorDto } from '../dto/building-floor/create-building-floor.dto';
import { UpdateBuildingFloorDto } from '../dto/building-floor/update-building-floor.dto';
import { BuildingQueryFilterDto } from '../dto/building/building-query-filter.dto';
import { CreateBuildingDto } from '../dto/building/create-building.dto';
import { UpdateBuildingDto } from '../dto/building/update-building.dto';
import { BuildingFloor } from '../entities/building-floor.entity';
import { Building } from '../entities/building.entity';
import {
  SwaggerBuildingFloorCreate,
  SwaggerBuildingFloorDelete,
  SwaggerBuildingFloorFindAll,
  SwaggerBuildingFloorFindOne,
  SwaggerBuildingFloorUpdate,
  SwaggerBuildingFloorUpdateState,
} from '../helpers/building-floor-set-decorators.helper';
import {
  SwaggerBuildingCreate,
  SwaggerBuildingDelete,
  SwaggerBuildingFindAll,
  SwaggerBuildingFindOne,
  SwaggerBuildingUpdate,
  SwaggerBuildingUpdateState,
} from '../helpers/building-set-decorators.helper';
import { BuildingService } from '../services/building.service';
import { BuildingFloorUpdatedResponse, BuildingUpdatedResponse } from '../types/building.types';

@ApiTags(Resources.BUILDING)
@SwaggerFailureResponse()
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'buildings', version: ['1'] })
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post('floors')
  @Roles(RoleType.COMPANY_MANAGER)
  @SwaggerBuildingFloorCreate()
  @ActivityLogger({ description: 'Créer un nouvel étage' })
  async createFloor(
    @Body() createBuildingFloorDto: CreateBuildingFloorDto,
    @GetUser() user: LoggedUser,
  ): Promise<BuildingFloor> {
    return await this.buildingService.createFloor(createBuildingFloorDto, user);
  }

  @Get('floors')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerBuildingFloorFindAll()
  async findAllFloors(@Query() query: BuildingFloorQueryFilterDto, @GetUser() user: LoggedUser) {
    if (user.role.type !== RoleType.ADMINISTRATOR) {
      if (query.filterField) {
        query.filterField += ',companyId';
        query.filterOp += `,${FilterOp.EQUALS}`;
        query.filter += `,${user.company.id}`;
      } else {
        query.filterField = 'companyId';
        query.filterOp = FilterOp.EQUALS;
        query.filter = user.company.id.toString();
      }
    }
    const [buildingFloors, currentResults, totalResults] = await this.buildingService.findAllFloor(query);
    return { ...query, totalResults, currentResults, results: buildingFloors };
  }

  @Get('floors/:id')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerBuildingFloorFindOne()
  async findOneFloor(@Param('id', ParseIntPipe) id: number, @GetUser() user: LoggedUser) {
    return await this.buildingService.findOneFloor(id, user);
  }

  @Patch('floors/:id')
  @Roles(RoleType.COMPANY_MANAGER)
  @SwaggerBuildingFloorUpdate()
  @ActivityLogger({ description: 'Modifier un étage' })
  async updateFloor(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBuildingFloorDto: UpdateBuildingFloorDto,
    @GetUser() user: LoggedUser,
  ): Promise<BuildingFloor> {
    return await this.buildingService.updateFloor(id, updateBuildingFloorDto, user);
  }

  @Delete('floors/:id')
  @Roles(RoleType.COMPANY_MANAGER)
  @SwaggerBuildingFloorDelete()
  @ActivityLogger({ description: 'Supprimer un étage' })
  async removeFloor(@Param('id', ParseIntPipe) id: number, @GetUser() user: LoggedUser): Promise<void> {
    await this.buildingService.softDeleteFloor(id, user);
  }

  @Patch('floors/:id/update-state')
  @Roles(RoleType.COMPANY_MANAGER)
  @SwaggerBuildingFloorUpdateState()
  @ActivityLogger({ description: "Modifier l'état d'un étage" })
  async updateFloorState(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: LoggedUser,
  ): Promise<BuildingFloorUpdatedResponse> {
    const buildingFloor = await this.buildingService.findOneFloor(id, user);

    if (buildingFloor.deletedAt) {
      return await this.buildingService.restoreBuildingFloor(buildingFloor);
    } else {
      return await this.buildingService.archiveBuildingFloor(buildingFloor);
    }
  }

  @Post()
  @Roles(RoleType.COMPANY_MANAGER)
  @SwaggerBuildingCreate()
  @ActivityLogger({ description: 'Créer un nouveau bâtiment' })
  async create(@Body() createBuildingDto: CreateBuildingDto, @GetUser() user: LoggedUser): Promise<Building> {
    return await this.buildingService.create(createBuildingDto, user);
  }

  // TODO : check user permissions (user location-building many to many)
  @Get()
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerBuildingFindAll()
  async findAll(@Query() query: BuildingQueryFilterDto, @GetUser() user: LoggedUser): Promise<PaginatedList<Building>> {
    if (user.role.type !== RoleType.ADMINISTRATOR) {
      if (query.filterField) {
        query.filterField += ',companyId';
        query.filterOp += `,${FilterOp.EQUALS}`;
        query.filter += `,${user.company.id}`;
      } else {
        query.filterField = 'companyId';
        query.filterOp = FilterOp.EQUALS;
        query.filter = user.company.id.toString();
      }
    }
    const [buildings, currentResults, totalResults] = await this.buildingService.findAll(query);
    return { ...query, totalResults, currentResults, results: buildings };
  }

  @Get(':id')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerBuildingFindOne()
  async findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: LoggedUser) {
    return await this.buildingService.findOne(id, user);
  }

  @Patch(':id')
  @Roles(RoleType.COMPANY_MANAGER)
  @SwaggerBuildingUpdate()
  @ActivityLogger({ description: 'Modifier un bâtiment' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBuildingDto: UpdateBuildingDto,
    @GetUser() user: LoggedUser,
  ): Promise<Building> {
    return await this.buildingService.update(id, updateBuildingDto, user);
  }

  @Delete(':id')
  @Roles(RoleType.COMPANY_MANAGER)
  @SwaggerBuildingDelete()
  @ActivityLogger({ description: 'Supprimer un bâtiment' })
  async remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: LoggedUser): Promise<void> {
    await this.buildingService.softDelete(id, user);
  }

  @Patch(':id/update-state')
  @Roles(RoleType.COMPANY_MANAGER)
  @SwaggerBuildingUpdateState()
  @ActivityLogger({ description: "Modifier l'état d'un bâtiment" })
  async updateState(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: LoggedUser,
  ): Promise<BuildingUpdatedResponse> {
    const building = await this.buildingService.findOne(id, user);

    if (building.deletedAt) {
      return await this.buildingService.restoreBuilding(building);
    } else {
      return await this.buildingService.archiveBuilding(building);
    }
  }
}
