import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Resources } from '@src/activity-logger/types/resource.types';
import { Roles } from '@src/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt.guard';
import { RolesGuard } from '@src/auth/guards/role.guard';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { PaginatedList } from '@src/paginator/paginator.type';
import { RoleType } from '@src/users/types/role.types';
import { CreateEquipmentDomainDto } from '../dtos/equipment/create-equipment-domain.dto';
import { CreateEquipmentFamilyDto } from '../dtos/equipment/create-equipment-family.dto';
import { CreateEquipmentTypeDto } from '../dtos/equipment/create-equipment-type.dto';
import { EquipmentDomainQueryFilterDto } from '../dtos/equipment/equipment-domain-query-filter.dto';
import { EquipmentFamilyQueryFilterDto } from '../dtos/equipment/equipment-family-query-filter.dto';
import { EquipmentTypeQueryFilterDto } from '../dtos/equipment/equipment-type-query-filter.dto';
import { UpdateEquipmentDomainDto } from '../dtos/equipment/update-equipment-domain.dto';
import { UpdateEquipmentFamilyDto } from '../dtos/equipment/update-equipment-family.dto';
import { UpdateEquipmentTypeDto } from '../dtos/equipment/update-equipment-type.dto';
import {
  SwaggerEquipmentDomainCreate,
  SwaggerEquipmentDomainFindAll,
  SwaggerEquipmentDomainFindOne,
  SwaggerEquipmentDomainFindOneBySerialNumber,
  SwaggerEquipmentDomainRestore,
  SwaggerEquipmentDomainSoftDelete,
  SwaggerEquipmentDomainUpdate,
  SwaggerEquipmentFamilyCreate,
  SwaggerEquipmentFamilyFindAll,
  SwaggerEquipmentFamilyFindOne,
  SwaggerEquipmentFamilyFindOneBySerialNumber,
  SwaggerEquipmentFamilyRestore,
  SwaggerEquipmentFamilySoftDelete,
  SwaggerEquipmentFamilyUpdate,
  SwaggerEquipmentTypeCreate,
  SwaggerEquipmentTypeFindAll,
  SwaggerEquipmentTypeFindOne,
  SwaggerEquipmentTypeFindOneBySerialNumber,
  SwaggerEquipmentTypeRestore,
  SwaggerEquipmentTypeSoftDelete,
  SwaggerEquipmentTypeUpdate,
} from '../helpers/equipment-set-decorators.helper';
import { BetApiErrorResponse } from '../services/abstract-bet.service';
import { EquipmentService } from '../services/equipment.service';
import {
  EquipmentDomainResponse,
  EquipmentFamilyResponse,
  EquipmentTypeResponse,
} from '../types/equipment/equipment-response.types';

@ApiTags(Resources.EQUIPMENT)
@SwaggerFailureResponse()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller({ path: 'equipments', version: ['1'] })
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  // Equipment Types Endpoints
  @Post('types')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentTypeCreate()
  async createEquipmentType(
    @Body() createDto: CreateEquipmentTypeDto,
  ): Promise<EquipmentTypeResponse | BetApiErrorResponse> {
    return await this.equipmentService.createEquipmentType(createDto);
  }

  @Get('types')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentTypeFindAll()
  async findAllEquipmentTypes(
    @Query() query: EquipmentTypeQueryFilterDto,
  ): Promise<PaginatedList<EquipmentTypeResponse> | BetApiErrorResponse> {
    return await this.equipmentService.findAllEquipmentTypes(query);
  }

  @Get('types/:id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentTypeFindOne()
  async findOneEquipmentTypeById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EquipmentTypeResponse | BetApiErrorResponse> {
    return await this.equipmentService.findOneEquipmentTypeById(id);
  }

  @Get('types/serial/:serialNumber')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentTypeFindOneBySerialNumber()
  async findOneEquipmentTypeBySerialNumber(
    @Param('serialNumber') serialNumber: string,
  ): Promise<EquipmentTypeResponse | BetApiErrorResponse> {
    return await this.equipmentService.findOneEquipmentTypeBySerialNumber(serialNumber);
  }

  @Patch('types/:id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentTypeUpdate()
  async updateEquipmentType(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateEquipmentTypeDto,
  ): Promise<EquipmentTypeResponse | BetApiErrorResponse> {
    return await this.equipmentService.updateEquipmentType(id, updateDto);
  }

  @Delete('types/:id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentTypeSoftDelete()
  async softDeleteEquipmentType(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; id: number } | BetApiErrorResponse> {
    return await this.equipmentService.softDeleteEquipmentType(id);
  }

  @Patch('types/:id/restore')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentTypeRestore()
  async restoreEquipmentType(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; id: number } | BetApiErrorResponse> {
    return await this.equipmentService.restoreEquipmentType(id);
  }

  // Equipment Domains Endpoints
  @Post('domains')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentDomainCreate()
  async createEquipmentDomain(
    @Body() createDto: CreateEquipmentDomainDto,
  ): Promise<EquipmentDomainResponse | BetApiErrorResponse> {
    return await this.equipmentService.createEquipmentDomain(createDto);
  }

  @Get('domains')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentDomainFindAll()
  async findAllEquipmentDomains(
    @Query() query: EquipmentDomainQueryFilterDto,
  ): Promise<PaginatedList<EquipmentDomainResponse> | BetApiErrorResponse> {
    return await this.equipmentService.findAllEquipmentDomains(query);
  }

  @Get('domains/:id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentDomainFindOne()
  async findOneEquipmentDomainById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EquipmentDomainResponse | BetApiErrorResponse> {
    return await this.equipmentService.findOneEquipmentDomainById(id);
  }

  @Get('domains/serial/:serialNumber')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentDomainFindOneBySerialNumber()
  async findOneEquipmentDomainBySerialNumber(
    @Param('serialNumber') serialNumber: string,
  ): Promise<EquipmentDomainResponse | BetApiErrorResponse> {
    return await this.equipmentService.findOneEquipmentDomainBySerialNumber(serialNumber);
  }

  @Patch('domains/:id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentDomainUpdate()
  async updateEquipmentDomain(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateEquipmentDomainDto,
  ): Promise<EquipmentDomainResponse | BetApiErrorResponse> {
    return await this.equipmentService.updateEquipmentDomain(id, updateDto);
  }

  @Delete('domains/:id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentDomainSoftDelete()
  async softDeleteEquipmentDomain(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; id: number } | BetApiErrorResponse> {
    return await this.equipmentService.softDeleteEquipmentDomain(id);
  }

  @Patch('domains/:id/restore')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentDomainRestore()
  async restoreEquipmentDomain(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; id: number } | BetApiErrorResponse> {
    return await this.equipmentService.restoreEquipmentDomain(id);
  }

  // Equipment Families Endpoints
  @Post('families')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentFamilyCreate()
  async createEquipmentFamily(
    @Body() createDto: CreateEquipmentFamilyDto,
  ): Promise<EquipmentFamilyResponse | BetApiErrorResponse> {
    return await this.equipmentService.createEquipmentFamily(createDto);
  }

  @Get('families')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentFamilyFindAll()
  async findAllEquipmentFamilies(
    @Query() query: EquipmentFamilyQueryFilterDto,
  ): Promise<PaginatedList<EquipmentFamilyResponse> | BetApiErrorResponse> {
    return await this.equipmentService.findAllEquipmentFamilies(query);
  }

  @Get('families/:id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentFamilyFindOne()
  async findOneEquipmentFamilyById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EquipmentFamilyResponse | BetApiErrorResponse> {
    return await this.equipmentService.findOneEquipmentFamilyById(id);
  }

  @Get('families/serial/:serialNumber')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentFamilyFindOneBySerialNumber()
  async findOneEquipmentFamilyBySerialNumber(
    @Param('serialNumber') serialNumber: string,
  ): Promise<EquipmentFamilyResponse | BetApiErrorResponse> {
    return await this.equipmentService.findOneEquipmentFamilyBySerialNumber(serialNumber);
  }

  @Patch('families/:id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentFamilyUpdate()
  async updateEquipmentFamily(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateEquipmentFamilyDto,
  ): Promise<EquipmentFamilyResponse | BetApiErrorResponse> {
    return await this.equipmentService.updateEquipmentFamily(id, updateDto);
  }

  @Delete('families/:id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentFamilySoftDelete()
  async softDeleteEquipmentFamily(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; id: number } | BetApiErrorResponse> {
    return await this.equipmentService.softDeleteEquipmentFamily(id);
  }

  @Patch('families/:id/restore')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerEquipmentFamilyRestore()
  async restoreEquipmentFamily(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; id: number } | BetApiErrorResponse> {
    return await this.equipmentService.restoreEquipmentFamily(id);
  }
}
