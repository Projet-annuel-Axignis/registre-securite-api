import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Resources } from '@src/activity-logger/types/resource.types';
import { Roles } from '@src/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt.guard';
import { RolesGuard } from '@src/auth/guards/role.guard';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { PaginatedList } from '@src/paginator/paginator.type';
import { RoleType } from '@src/users/types/role.types';
import { CompatibilityGroupQueryFilterDto } from '../dtos/product/compatibility-group-query-filter.dto';
import { CreateCompatibilityGroupDto } from '../dtos/product/create-compatibility-group.dto';
import { UpdateCompatibilityGroupDto } from '../dtos/product/update-compatibility-group.dto';
import {
  SwaggerCompatibilityGroupCreate,
  SwaggerCompatibilityGroupFindAll,
  SwaggerCompatibilityGroupFindOne,
  SwaggerCompatibilityGroupRestore,
  SwaggerCompatibilityGroupSoftDelete,
  SwaggerCompatibilityGroupUpdate,
} from '../helpers/compatibility-group-set-decorators.helper';
import { CompatibilityGroupService } from '../services/compatibility-group.service';
import { CompatibilityGroupResponse } from '../types/product/compatibility-group-response.types';

@ApiTags(Resources.PRODUCT)
@SwaggerFailureResponse()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller({ path: 'compatibility-groups', version: ['1'] })
export class CompatibilityGroupController {
  constructor(private readonly compatibilityGroupService: CompatibilityGroupService) {}

  // Compatibility Group Endpoints
  @Post()
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerCompatibilityGroupCreate()
  async createCompatibilityGroup(@Body() createDto: CreateCompatibilityGroupDto): Promise<CompatibilityGroupResponse> {
    return await this.compatibilityGroupService.createCompatibilityGroup(createDto);
  }

  @Get()
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerCompatibilityGroupFindAll()
  async findAllCompatibilityGroups(
    @Query() query: CompatibilityGroupQueryFilterDto,
  ): Promise<PaginatedList<CompatibilityGroupResponse>> {
    return await this.compatibilityGroupService.findAllCompatibilityGroups(query);
  }

  @Get(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerCompatibilityGroupFindOne()
  async findOneCompatibilityGroupById(@Param('id', ParseIntPipe) id: number): Promise<CompatibilityGroupResponse> {
    return await this.compatibilityGroupService.findOneCompatibilityGroupById(id);
  }

  @Patch(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerCompatibilityGroupUpdate()
  async updateCompatibilityGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCompatibilityGroupDto,
  ): Promise<CompatibilityGroupResponse> {
    return await this.compatibilityGroupService.updateCompatibilityGroup(id, updateDto);
  }

  @Delete(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerCompatibilityGroupSoftDelete()
  async softDeleteCompatibilityGroup(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; id: number }> {
    return await this.compatibilityGroupService.softDeleteCompatibilityGroup(id);
  }

  @Patch(':id/restore')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerCompatibilityGroupRestore()
  async restoreCompatibilityGroup(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; id: number }> {
    return await this.compatibilityGroupService.restoreCompatibilityGroup(id);
  }
}
