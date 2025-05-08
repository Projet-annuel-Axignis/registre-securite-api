import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
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
import { CreateSiteDto } from '../dto/site/create-site.dto';
import { SiteQueryFilterDto } from '../dto/site/site-query-filter.dto';
import { UpdateSiteDto } from '../dto/site/update-site.dto';
import { Site } from '../entities/site.entity';
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

  @Post()
  @Roles(RoleType.COMPANY_MANAGER)
  @ActivityLogger({ description: 'Créer un nouveau site' })
  async create(@Body() createSiteDto: CreateSiteDto, @GetUser() user: LoggedUser): Promise<Site> {
    if (user.role.type !== RoleType.ADMINISTRATOR) {
      createSiteDto.companyId = user.company.id;
    }

    return await this.siteService.create(createSiteDto);
  }

  @Get()
  @Roles(RoleType.COMPANY_MEMBER)
  async findAll(@Query() query: SiteQueryFilterDto, @GetUser() user: LoggedUser): Promise<PaginatedList<Site>> {
    if (user.role.type !== RoleType.ADMINISTRATOR) {
      if (query.filter === '') {
        query.filterField = 'companyId';
        query.filterOp = FilterOp.EQUALS;
        query.filter = user.company.id.toString();
      } else {
        query.filterField += ',companyId';
        query.filterOp += `,${FilterOp.EQUALS}`;
        query.filter += `,${user.company.id}`;
      }
    }

    const [sites, totalResults, currentResults] = await this.siteService.findAll(query);
    return { ...query, totalResults, currentResults, results: sites };
  }

  @Get(':id')
  @Roles(RoleType.COMPANY_MEMBER)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Site> {
    return await this.siteService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleType.COMPANY_MANAGER)
  @ActivityLogger({ description: "Mettre à jour les informations d'un site" })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateSiteDto: UpdateSiteDto): Promise<Site> {
    return await this.siteService.update(id, updateSiteDto);
  }

  @Patch(':id/update-state')
  @Roles(RoleType.COMPANY_MANAGER)
  @ActivityLogger({ description: "Modifier l'état d'un site" })
  async updateState(@Param('id', ParseIntPipe) id: number): Promise<SiteUpdatedResponse> {
    const site = await this.siteService.findOne(id);

    if (site.deletedAt) {
      return await this.siteService.restore(site);
    } else {
      return await this.siteService.archive(site);
    }
  }
}
