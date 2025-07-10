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
import { CreateInterventionDto } from '../dto/create-intervention.dto';
import { InterventionQueryFilterDto } from '../dto/intervention-query-filter.dto';
import { UpdateInterventionDto } from '../dto/update-intervention.dto';
import { Intervention } from '../entities/intervention.entity';
import {
  SwaggerInterventionCreate,
  SwaggerInterventionFindAll,
  SwaggerInterventionFindOne,
  SwaggerInterventionTerminate,
  SwaggerInterventionUpdate,
  SwaggerInterventionUpdateState,
} from '../helpers/intervention-set-decorators.helper';
import { InterventionService } from '../services/intervention.service';

@ApiTags(Resources.INTERVENTION)
@SwaggerFailureResponse()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller({ path: 'interventions', version: ['1'] })
export class InterventionController {
  constructor(private readonly interventionService: InterventionService) {}

  @Post()
  @Roles(RoleType.ADMINISTRATOR, RoleType.COMPANY_MEMBER)
  @SwaggerInterventionCreate()
  @ActivityLogger({ description: 'Créer une nouvelle intervention' })
  async create(@Body() createInterventionDto: CreateInterventionDto): Promise<Intervention> {
    return await this.interventionService.create(createInterventionDto);
  }

  @Get()
  @Roles(RoleType.ADMINISTRATOR, RoleType.COMPANY_MEMBER)
  @SwaggerInterventionFindAll()
  async findAll(@Query() query: InterventionQueryFilterDto): Promise<PaginatedList<Intervention>> {
    const [interventions, currentResults, totalResults] = await this.interventionService.findAll(query);
    return { ...query, totalResults, currentResults, results: interventions };
  }

  @Get(':id')
  @Roles(RoleType.ADMINISTRATOR, RoleType.COMPANY_MEMBER)
  @SwaggerInterventionFindOne()
  async findOne(@Param('id') id: string): Promise<Intervention> {
    return await this.interventionService.findOne(+id);
  }

  @Patch(':id')
  @Roles(RoleType.ADMINISTRATOR, RoleType.COMPANY_MEMBER)
  @SwaggerInterventionUpdate()
  @ActivityLogger({ description: 'Modifier une intervention' })
  async update(@Param('id') id: string, @Body() updateInterventionDto: UpdateInterventionDto): Promise<Intervention> {
    return await this.interventionService.update(+id, updateInterventionDto);
  }

  @Delete(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerInterventionUpdateState()
  @ActivityLogger({ description: 'Archiver une intervention' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.interventionService.delete(+id);
  }

  @Patch(':id/restore')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerInterventionUpdateState()
  @ActivityLogger({ description: 'Restaurer une intervention' })
  async restore(@Param('id') id: string): Promise<Intervention> {
    return await this.interventionService.restore(+id);
  }

  @Patch(':id/start')
  @Roles(RoleType.ADMINISTRATOR, RoleType.COMPANY_MEMBER)
  @SwaggerInterventionUpdate()
  @ActivityLogger({ description: 'Démarrer une intervention' })
  async startIntervention(@Param('id') id: string): Promise<Intervention> {
    return await this.interventionService.startIntervention(+id);
  }

  @Patch(':id/terminate')
  @Roles(RoleType.ADMINISTRATOR, RoleType.COMPANY_MEMBER)
  @SwaggerInterventionTerminate()
  @ActivityLogger({ description: 'Terminer une intervention' })
  async terminateIntervention(
    @Param('id') id: string,
    @Body() body: { terminatedById: number },
  ): Promise<Intervention> {
    return await this.interventionService.terminateIntervention(+id, body.terminatedById);
  }
}
