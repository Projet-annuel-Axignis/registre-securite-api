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
import { CreateReportTypeDto } from '../dto/create-report-type.dto';
import { ReportTypeQueryFilterDto } from '../dto/report-type-query-filter.dto';
import { UpdateReportTypeDto } from '../dto/update-report-type.dto';
import { ReportType } from '../entities/report-type.entity';
import {
  SwaggerReportTypeCreate,
  SwaggerReportTypeDelete,
  SwaggerReportTypeFindAll,
  SwaggerReportTypeFindOne,
  SwaggerReportTypeUpdate,
} from '../helpers/report-type-set-decorators.helper';
import { ReportTypeService } from '../services/report-type.service';

@ApiTags(Resources.REPORT_TYPE)
@SwaggerFailureResponse()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller({ path: 'report-types', version: ['1'] })
export class ReportTypeController {
  constructor(private readonly reportTypeService: ReportTypeService) {}

  @Post()
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerReportTypeCreate()
  @ActivityLogger({ description: 'Créer un nouveau type de rapport' })
  async create(@Body() createReportTypeDto: CreateReportTypeDto): Promise<ReportType> {
    return await this.reportTypeService.create(createReportTypeDto);
  }

  @Get()
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerReportTypeFindAll()
  async findAll(@Query() query: ReportTypeQueryFilterDto): Promise<PaginatedList<ReportType>> {
    const [reportTypes, currentResults, totalResults] = await this.reportTypeService.findAll(query);
    return { ...query, totalResults, currentResults, results: reportTypes };
  }

  @Get(':code')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerReportTypeFindOne()
  async findOne(@Param('code') code: string): Promise<ReportType> {
    return await this.reportTypeService.findOne(code);
  }

  @Patch(':code')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerReportTypeUpdate()
  @ActivityLogger({ description: 'Modifier un type de rapport' })
  async update(@Param('code') code: string, @Body() updateReportTypeDto: UpdateReportTypeDto): Promise<ReportType> {
    return await this.reportTypeService.update(code, updateReportTypeDto);
  }

  @Delete(':code')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerReportTypeDelete()
  @ActivityLogger({ description: 'Supprimer un type de rapport' })
  async remove(@Param('code') code: string): Promise<void> {
    await this.reportTypeService.delete(code);
  }
}
