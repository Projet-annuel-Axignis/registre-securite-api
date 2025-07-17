import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActivityLogger } from '@src/activity-logger/helpers/activity-logger.decorator';
import { Resources } from '@src/activity-logger/types/resource.types';
import { Roles } from '@src/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt.guard';
import { RolesGuard } from '@src/auth/guards/role.guard';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { PaginatedList } from '@src/paginator/paginator.type';
import { RoleType } from '@src/users/types/role.types';
import { CreateInterventionTypeDto } from '../dto/create-intervention-type.dto';
import { InterventionTypeQueryFilterDto } from '../dto/intervention-type-query-filter.dto';
import { UpdateInterventionTypeDto } from '../dto/update-intervention-type.dto';
import { InterventionType } from '../entities/intervention-type.entity';
import {
  SwaggerInterventionTypeCreate,
  SwaggerInterventionTypeDelete,
  SwaggerInterventionTypeFindAll,
  SwaggerInterventionTypeFindOne,
  SwaggerInterventionTypeUpdate,
} from '../helpers/intervention-type-set-decorators.helper';
import { InterventionTypeService } from '../services/intervention-type.service';

@ApiTags(Resources.INTERVENTION_TYPE)
@SwaggerFailureResponse()
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'intervention-types', version: ['1'] })
export class InterventionTypeController {
  constructor(private readonly interventionTypeService: InterventionTypeService) {}

  @Post()
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerInterventionTypeCreate()
  @ActivityLogger({ description: "Créer un nouveau type d'intervention" })
  async create(@Body() createInterventionTypeDto: CreateInterventionTypeDto): Promise<InterventionType> {
    return await this.interventionTypeService.create(createInterventionTypeDto);
  }

  @Get()
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerInterventionTypeFindAll()
  async findAll(@Query() query: InterventionTypeQueryFilterDto): Promise<PaginatedList<InterventionType>> {
    const [interventionTypes, currentResults, totalResults] = await this.interventionTypeService.findAll(query);
    return { ...query, totalResults, currentResults, results: interventionTypes };
  }

  @Get(':code')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerInterventionTypeFindOne()
  async findOne(@Param('code') code: string): Promise<InterventionType> {
    return await this.interventionTypeService.findOne(code);
  }

  @Patch(':code')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerInterventionTypeUpdate()
  @ActivityLogger({ description: "Modifier un type d'intervention" })
  async update(
    @Param('code') code: string,
    @Body() updateInterventionTypeDto: UpdateInterventionTypeDto,
  ): Promise<InterventionType> {
    return await this.interventionTypeService.update(code, updateInterventionTypeDto);
  }

  @Delete(':code')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerInterventionTypeDelete()
  @ActivityLogger({ description: "Supprimer un type d'intervention" })
  async remove(@Param('code') code: string): Promise<void> {
    await this.interventionTypeService.delete(code);
  }
}
