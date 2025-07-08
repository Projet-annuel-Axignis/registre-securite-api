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
import { CreateLotDto } from '../dto/lot/create-lot.dto';
import { LotQueryFilterDto } from '../dto/lot/lot-query-filter.dto';
import { UpdateLotDto } from '../dto/lot/update-lot.dto';
import { Lot } from '../entities/lot.entity';
import {
  SwaggerLotCreate,
  SwaggerLotDelete,
  SwaggerLotFindAll,
  SwaggerLotFindOne,
  SwaggerLotUpdate,
  SwaggerLotUpdateState,
} from '../helpers/lot-set-decorators.helper';
import { LotService } from '../services/lot.service';
import { LotUpdatedResponse } from '../types/building.types';

@ApiTags(Resources.LOT)
@SwaggerFailureResponse()
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'lots', version: ['1'] })
export class LotController {
  constructor(private readonly lotService: LotService) {}

  @Post()
  @Roles(RoleType.COMPANY_MANAGER)
  @SwaggerLotCreate()
  @ActivityLogger({ description: 'Créer un nouveau lot' })
  async create(@Body() createLotDto: CreateLotDto, @GetUser() user: LoggedUser): Promise<Lot> {
    return await this.lotService.create(createLotDto, user);
  }

  @Get()
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerLotFindAll()
  async findAll(@Query() query: LotQueryFilterDto, @GetUser() user: LoggedUser): Promise<PaginatedList<Lot>> {
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
    const [lots, currentResults, totalResults] = await this.lotService.findAll(query);
    return { ...query, totalResults, currentResults, results: lots };
  }

  @Get(':id')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerLotFindOne()
  async findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: LoggedUser) {
    return await this.lotService.findOne(id, user);
  }

  @Patch(':id')
  @Roles(RoleType.COMPANY_MANAGER)
  @SwaggerLotUpdate()
  @ActivityLogger({ description: 'Modifier un lot' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLotDto: UpdateLotDto,
    @GetUser() user: LoggedUser,
  ): Promise<Lot> {
    return await this.lotService.update(id, updateLotDto, user);
  }

  @Delete(':id')
  @Roles(RoleType.COMPANY_MANAGER)
  @SwaggerLotDelete()
  @ActivityLogger({ description: 'Supprimer un lot' })
  async remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: LoggedUser): Promise<void> {
    await this.lotService.softDelete(id, user);
  }

  @Patch(':id/update-state')
  @Roles(RoleType.COMPANY_MANAGER)
  @SwaggerLotUpdateState()
  @ActivityLogger({ description: "Modifier l'état d'un lot" })
  async updateState(@Param('id', ParseIntPipe) id: number, @GetUser() user: LoggedUser): Promise<LotUpdatedResponse> {
    const lot = await this.lotService.findOne(id, user);

    if (lot.deletedAt) {
      return await this.lotService.restoreLot(lot);
    } else {
      return await this.lotService.archiveLot(lot);
    }
  }
}
