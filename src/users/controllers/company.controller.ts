import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActivityLogger } from '@src/activity-logger/helpers/activity-logger.decorator';
import { Resources } from '@src/activity-logger/types/resource.types';
import { Roles } from '@src/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt.guard';
import { RolesGuard } from '@src/auth/guards/role.guard';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { PaginatedList } from '@src/paginator/paginator.type';
import { CompanyQueryFilterDto } from '../dto/company/company-query-filter.dto';
import { CreateCompanyDto } from '../dto/company/create-company.dto';
import { UpdateCompanyDto } from '../dto/company/update-company.dto';
import { Company } from '../entities/company.entity';
import { CompanyUpdatedResponse } from '../types/company.types';
import { RoleType } from '../types/role.types';
import { CompanyService } from './../services/company.service';

@ApiTags(Resources.COMPANY)
@SwaggerFailureResponse()
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'companies', version: ['1'] })
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @Roles(RoleType.ADMINISTRATOR)
  @ActivityLogger({ description: 'Créer une nouvelle société' })
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return await this.companyService.create(createCompanyDto);
  }

  @Get()
  @Roles(RoleType.ADMINISTRATOR)
  async findAll(@Query() query: CompanyQueryFilterDto): Promise<PaginatedList<Company>> {
    const [companies, currentResults, totalResults] = await this.companyService.findAll(query);
    return { ...query, totalResults, currentResults, results: companies };
  }

  @Get(':id')
  @Roles(RoleType.ADMINISTRATOR)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return await this.companyService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @ActivityLogger({ description: "Mettre à jour les informations d'une société" })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    return await this.companyService.update(id, updateCompanyDto);
  }

  @Patch(':id/update-state')
  @Roles(RoleType.ADMINISTRATOR)
  @ActivityLogger({ description: "Modifier l'état d'une société" })
  async updateState(@Param('id', ParseIntPipe) id: number): Promise<CompanyUpdatedResponse> {
    const company = await this.companyService.findOne(id);

    if (company.deletedAt) {
      return await this.companyService.restoreCompany(company);
    } else {
      return await this.companyService.archiveCompany(company);
    }
  }
}
