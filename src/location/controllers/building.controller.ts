import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
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
import { BuildingQueryFilterDto } from '../dto/building/building-query-filter.dto';
import { CreateBuildingDto } from '../dto/building/create-building.dto';
import { Building } from '../entities/building.entity';
import { BuildingService } from '../services/building.service';

@ApiTags(Resources.BUILDING)
@SwaggerFailureResponse()
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'buildings', version: ['1'] })
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post()
  @Roles(RoleType.COMPANY_MANAGER)
  @ActivityLogger({ description: 'Créer un nouveau bâtiment' })
  async create(@Body() createBuildingDto: CreateBuildingDto, @GetUser() user: LoggedUser): Promise<Building> {
    return await this.buildingService.create(createBuildingDto, user);
  }

  @Get()
  @Roles(RoleType.COMPANY_MEMBER)
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
}
