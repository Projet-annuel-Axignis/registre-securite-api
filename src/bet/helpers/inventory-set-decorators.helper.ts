import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import {
  InventoryItemCreateSwaggerResponse,
  InventoryItemFindAllSwaggerResponse,
  InventoryItemFindOneSwaggerResponse,
  InventoryItemRestoreSwaggerResponse,
  InventoryItemSoftDeleteSwaggerResponse,
  InventoryItemUpdateSwaggerResponse,
} from '../types/inventory-swagger-response.types';

export const SwaggerInventoryItemCreate = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Create a new inventory item',
      description: 'Create a new inventory item with the provided data',
    }),
    ApiResponse({
      status: 201,
      description: 'Inventory item created successfully',
      type: InventoryItemCreateSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerInventoryItemFindAll = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get all inventory items',
      description: 'Retrieve a paginated list of all inventory items with optional filtering and sorting',
    }),
    ApiResponse({
      status: 200,
      description: 'Inventory items retrieved successfully',
      type: InventoryItemFindAllSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerInventoryItemFindOne = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get inventory item by ID',
      description: 'Retrieve a specific inventory item by its unique identifier',
    }),
    ApiResponse({
      status: 200,
      description: 'Inventory item retrieved successfully',
      type: InventoryItemFindOneSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerInventoryItemUpdate = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Update inventory item',
      description: 'Update an existing inventory item with the provided data',
    }),
    ApiResponse({
      status: 200,
      description: 'Inventory item updated successfully',
      type: InventoryItemUpdateSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerInventoryItemSoftDelete = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Soft delete inventory item',
      description: 'Soft delete an inventory item (mark as deleted without removing from database)',
    }),
    ApiResponse({
      status: 200,
      description: 'Inventory item soft deleted successfully',
      type: InventoryItemSoftDeleteSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerInventoryItemRestore = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Restore inventory item',
      description: 'Restore a soft deleted inventory item',
    }),
    ApiResponse({
      status: 200,
      description: 'Inventory item restored successfully',
      type: InventoryItemRestoreSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );
