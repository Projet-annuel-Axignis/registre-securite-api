import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Resources } from '@src/activity-logger/types/resource.types';
import { Roles } from '@src/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt.guard';
import { RolesGuard } from '@src/auth/guards/role.guard';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { PaginatedList } from '@src/paginator/paginator.type';
import { RoleType } from '@src/users/types/role.types';
import { CreateInventoryItemDto } from '../dtos/inventory/create-inventory-item.dto';
import { InventoryItemQueryFilterDto } from '../dtos/inventory/inventory-item-query-filter.dto';
import { UpdateInventoryItemDto } from '../dtos/inventory/update-inventory-item.dto';
import {
  SwaggerInventoryItemCreate,
  SwaggerInventoryItemFindAll,
  SwaggerInventoryItemFindOne,
  SwaggerInventoryItemRestore,
  SwaggerInventoryItemSoftDelete,
  SwaggerInventoryItemUpdate,
} from '../helpers/inventory-set-decorators.helper';
import { BetApiErrorResponse } from '../services/abstract-bet.service';
import { InventoryService } from '../services/inventory.service';
import { InventoryItemResponse } from '../types/inventory/inventory-response.types';

@ApiTags(Resources.INVENTORY)
@SwaggerFailureResponse()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller({ path: 'inventories', version: ['1'] })
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  // Inventory Items Endpoints
  @Post()
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerInventoryItemCreate()
  async createInventoryItem(
    @Body() createDto: CreateInventoryItemDto,
  ): Promise<InventoryItemResponse | BetApiErrorResponse> {
    return await this.inventoryService.createInventoryItem(createDto);
  }

  @Get()
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerInventoryItemFindAll()
  async findAllInventoryItems(
    @Query() query: InventoryItemQueryFilterDto,
  ): Promise<PaginatedList<InventoryItemResponse> | BetApiErrorResponse> {
    return await this.inventoryService.findAllInventoryItems(query);
  }

  @Get(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerInventoryItemFindOne()
  async findOneInventoryItemById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<InventoryItemResponse | BetApiErrorResponse> {
    return await this.inventoryService.findOneInventoryItemById(id);
  }

  @Patch(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerInventoryItemUpdate()
  async updateInventoryItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateInventoryItemDto,
  ): Promise<InventoryItemResponse | BetApiErrorResponse> {
    return await this.inventoryService.updateInventoryItem(id, updateDto);
  }

  @Delete(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerInventoryItemSoftDelete()
  async softDeleteInventoryItem(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; id: number } | BetApiErrorResponse> {
    return await this.inventoryService.softDeleteInventoryItem(id);
  }

  @Patch(':id/restore')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerInventoryItemRestore()
  async restoreInventoryItem(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; id: number } | BetApiErrorResponse> {
    return await this.inventoryService.restoreInventoryItem(id);
  }
}
