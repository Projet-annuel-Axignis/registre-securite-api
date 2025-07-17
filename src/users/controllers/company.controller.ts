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
import {
  SwaggerCompanyCreate,
  SwaggerCompanyFindAll,
  SwaggerCompanyFindOne,
  SwaggerCompanyUpdate,
  SwaggerCompanyUpdateState,
} from '../helpers/company-set-decorators.helper';
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

  /**
   * Crée une nouvelle société.
   *
   * @param {CreateCompanyDto} createCompanyDto - Les données nécessaires pour créer une société.
   * @returns {Promise<Company>} La société nouvellement créée.
   *
   * @example
   * POST /companies
   * Body: { name: "Nouvelle Société", address: "123 Rue Exemple" }
   */
  @Post()
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerCompanyCreate()
  @ActivityLogger({ description: 'Créer une nouvelle société' })
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return await this.companyService.create(createCompanyDto);
  }

  /**
   * Récupère une liste paginée de sociétés.
   *
   * @param {CompanyQueryFilterDto} query - Les filtres et paramètres de pagination.
   * @returns {Promise<PaginatedList<Company>>} Une liste paginée des sociétés.
   *
   * @example
   * GET /companies?page=1&limit=10
   */
  @Get()
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerCompanyFindAll()
  async findAll(@Query() query: CompanyQueryFilterDto): Promise<PaginatedList<Company>> {
    const [companies, currentResults, totalResults] = await this.companyService.findAll(query);
    return { ...query, totalResults, currentResults, results: companies };
  }

  /**
   * Récupère les détails d'une société spécifique.
   *
   * @param {number} id - L'identifiant unique de la société.
   * @returns {Promise<Company>} Les détails de la société.
   *
   * @throws {CompanyNotFoundException} - Si la société est introuvable.
   *
   * @example
   * GET /companies/1
   */
  @Get(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerCompanyFindOne()
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return await this.companyService.findOne(id);
  }

  /**
   * Met à jour les informations d'une société.
   *
   * @param {number} id - L'identifiant unique de la société.
   * @param {UpdateCompanyDto} updateCompanyDto - Les nouvelles données de la société.
   * @returns {Promise<Company>} La société mise à jour.
   *
   * @example
   * PATCH /companies/1
   * Body: { name: "Société Mise à Jour" }
   */
  @Patch(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerCompanyUpdate()
  @ActivityLogger({ description: "Mettre à jour les informations d'une société" })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    return await this.companyService.update(id, updateCompanyDto);
  }

  /**
   * Modifie l'état d'une société (par exemple, active/inactive).
   *
   * @param {number} id - L'identifiant unique de la société.
   * @returns {Promise<CompanyUpdatedResponse>} La réponse après mise à jour de l'état.
   *
   * @throws {CompanyNotFoundException} - Si la société est introuvable.
   *
   * @example
   * PATCH /companies/1/update-state
   */
  @Patch(':id/update-state')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerCompanyUpdateState()
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
