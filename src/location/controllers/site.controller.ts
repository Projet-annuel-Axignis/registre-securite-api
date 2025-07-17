import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActivityLogger } from '@src/activity-logger/helpers/activity-logger.decorator';
import { Resources } from '@src/activity-logger/types/resource.types';
import { Roles } from '@src/auth/decorators/role.decorator';
import { GetUser } from '@src/auth/decorators/user.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt.guard';
import { RolesGuard } from '@src/auth/guards/role.guard';
import { AuthForbiddenException } from '@src/auth/helpers/auth.exception';
import { LoggedUser } from '@src/auth/types/logged-user.type';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { FilterOp, PaginatedList } from '@src/paginator/paginator.type';
import { RoleType } from '@src/users/types/role.types';
import { CreateSiteDto } from '../dto/site/create-site.dto';
import { SiteQueryFilterDto } from '../dto/site/site-query-filter.dto';
import { UpdateSiteDto } from '../dto/site/update-site.dto';
import { Site } from '../entities/site.entity';
import {
  SwaggerSiteCreate,
  SwaggerSiteFindAll,
  SwaggerSiteFindOne,
  SwaggerSiteUpdate,
  SwaggerSiteUpdateState,
} from '../helpers/site-set-decorators.helper';
import { SiteService } from '../services/site.service';
import { SiteUpdatedResponse } from '../types/site.types';

@ApiTags(Resources.SITE)
@SwaggerFailureResponse()
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'sites', version: ['1'] })
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  /**
   * Crée un nouveau site.
   *
   * @param {CreateSiteDto} createSiteDto - Les données nécessaires pour créer un site.
   * @param {LoggedUser} user - L'utilisateur actuellement connecté.
   * @returns {Promise<Site>} - Le site nouvellement créé.
   *
   * @description
   * Cette méthode permet de créer un nouveau site. Si l'utilisateur connecté
   * n'est pas un administrateur, le `companyId` est automatiquement défini
   * sur celui de l'utilisateur.
   */
  @Post()
  @Roles(RoleType.COMPANY_MANAGER)
  @SwaggerSiteCreate()
  @ActivityLogger({ description: 'Créer un nouveau site' })
  async create(@Body() createSiteDto: CreateSiteDto, @GetUser() user: LoggedUser): Promise<Site> {
    if (user.role.type !== RoleType.ADMINISTRATOR) {
      createSiteDto.companyId = user.company.id;
    }

    return await this.siteService.create(createSiteDto);
  }

  /**
   * Récupère une liste paginée de sites en fonction des filtres fournis.
   *
   * @param {SiteQueryFilterDto} query - Les paramètres de filtrage et de pagination.
   * @param {LoggedUser} user - L'utilisateur actuellement connecté.
   * @returns {Promise<PaginatedList<Site>>} - Une liste paginée de sites.
   *
   * @description
   * Cette méthode permet de récupérer une liste de sites. Si l'utilisateur
   * connecté n'est pas un administrateur, les résultats sont automatiquement
   * filtrés pour inclure uniquement les sites appartenant à la même entreprise
   * que l'utilisateur.
   */
  @Get()
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerSiteFindAll()
  async findAll(@Query() query: SiteQueryFilterDto, @GetUser() user: LoggedUser): Promise<PaginatedList<Site>> {
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

    const [sites, totalResults, currentResults] = await this.siteService.findAll(query);
    return { ...query, totalResults, currentResults, results: sites };
  }

  /**
   * Récupère un site spécifique par son ID.
   *
   * @param {number} id - L'ID du site à récupérer.
   * @param {LoggedUser} user - L'utilisateur actuellement connecté.
   * @returns {Promise<Site>} - Le site correspondant à l'ID fourni.
   *
   * @throws {AuthForbiddenException} - Si l'utilisateur n'a pas les droits pour accéder au site.
   * @throws {SiteNotFoundException} - Si le site n'existe pas.
   *
   * @description
   * Cette méthode permet de récupérer un site spécifique. Si l'utilisateur
   * n'est pas administrateur, il ne peut accéder qu'aux sites appartenant
   * à son entreprise.
   */
  @Get(':id')
  @Roles(RoleType.COMPANY_MEMBER)
  @SwaggerSiteFindOne()
  async findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: LoggedUser): Promise<Site> {
    const site = await this.siteService.findOne(id);

    if (user.role.type !== RoleType.ADMINISTRATOR && site.companyId !== user.company.id) {
      throw new AuthForbiddenException({ resourceName: Resources.SITE, id });
    }

    return site;
  }

  /**
   * Met à jour les informations d'un site.
   *
   * @param {number} id - L'ID du site à mettre à jour.
   * @param {UpdateSiteDto} updateSiteDto - Les nouvelles données pour le site.
   * @param {LoggedUser} user - L'utilisateur actuellement connecté.
   * @returns {Promise<Site>} - Le site mis à jour.
   *
   * @throws {AuthForbiddenException} - Si l'utilisateur n'a pas les droits pour modifier le site.
   * @throws {SiteNotFoundException} - Si le site n'existe pas.
   *
   * @description
   * Cette méthode permet de mettre à jour les informations d'un site. Si
   * l'utilisateur n'est pas administrateur, il ne peut modifier que les
   * sites appartenant à son entreprise.
   */
  @Patch(':id')
  @Roles(RoleType.COMPANY_MANAGER)
  @SwaggerSiteUpdate()
  @ActivityLogger({ description: "Mettre à jour les informations d'un site" })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSiteDto: UpdateSiteDto,
    @GetUser() user: LoggedUser,
  ): Promise<Site> {
    const site = await this.siteService.findOne(id);

    if (user.role.type !== RoleType.ADMINISTRATOR && site.companyId !== user.company.id) {
      throw new AuthForbiddenException({ resourceName: Resources.SITE, id });
    }

    return await this.siteService.update(id, updateSiteDto);
  }

  /**
   * Modifie l'état d'un site.
   *
   * @param {number} id - L'ID du site dont l'état doit être modifié.
   * @param {LoggedUser} user - L'utilisateur actuellement connecté.
   * @returns {Promise<SiteUpdatedResponse>} - La réponse contenant l'état mis à jour du site.
   *
   * @throws {AuthForbiddenException} - Si l'utilisateur n'a pas les droits pour modifier l'état du site.
   * @throws {SiteNotFoundException} - Si le site n'existe pas.
   *
   * @description
   * Cette méthode permet de modifier l'état d'un site. Si l'utilisateur
   * n'est pas administrateur, il ne peut modifier que les sites appartenant
   * à son entreprise.
   */
  @Patch(':id/update-state')
  @Roles(RoleType.COMPANY_MANAGER)
  @SwaggerSiteUpdateState()
  @ActivityLogger({ description: "Modifier l'état d'un site" })
  async updateState(@Param('id', ParseIntPipe) id: number, @GetUser() user: LoggedUser): Promise<SiteUpdatedResponse> {
    const site = await this.siteService.findOne(id);

    if (user.role.type !== RoleType.ADMINISTRATOR && site.companyId !== user.company.id) {
      throw new AuthForbiddenException({ resourceName: Resources.SITE, id });
    }

    if (site.deletedAt) {
      return await this.siteService.restore(site);
    } else {
      return await this.siteService.archive(site);
    }
  }
}
