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
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { OrganizationQueryFilterDto } from '../dto/organization-query-filter.dto';
import { UpdateOrganizationDto } from '../dto/update-organization.dto';
import { Organization } from '../entities/organization.entity';
import {
  SwaggerOrganizationCreate,
  SwaggerOrganizationDelete,
  SwaggerOrganizationFindAll,
  SwaggerOrganizationFindOne,
  SwaggerOrganizationUpdate,
} from '../helpers/organization-set-decorators.helper';
import { OrganizationService } from '../services/organization.service';

@ApiTags(Resources.ORGANIZATION)
@SwaggerFailureResponse()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller({ path: 'organizations', version: ['1'] })
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerOrganizationCreate()
  @ActivityLogger({ description: 'Créer une nouvelle organisation' })
  async create(@Body() createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    return await this.organizationService.create(createOrganizationDto);
  }

  @Get()
  @Roles(RoleType.COMPANY_MANAGER)
  @SwaggerOrganizationFindAll()
  async findAll(@Query() query: OrganizationQueryFilterDto): Promise<PaginatedList<Organization>> {
    const [organizations, currentResults, totalResults] = await this.organizationService.findAll(query);
    return { ...query, totalResults, currentResults, results: organizations };
  }

  @Get(':name')
  @Roles(RoleType.COMPANY_MANAGER)
  @SwaggerOrganizationFindOne()
  async findOne(@Param('name') name: string): Promise<Organization> {
    return await this.organizationService.findOne(name);
  }

  @Patch(':name')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerOrganizationUpdate()
  @ActivityLogger({ description: 'Modifier une organisation' })
  async update(
    @Param('name') name: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    return await this.organizationService.update(name, updateOrganizationDto);
  }

  @Delete(':name')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerOrganizationDelete()
  @ActivityLogger({ description: 'Supprimer une organisation' })
  async remove(@Param('name') name: string): Promise<void> {
    await this.organizationService.delete(name);
  }
}
