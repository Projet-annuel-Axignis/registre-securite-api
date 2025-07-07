import { ApiProperty } from '@nestjs/swagger';
import { InventoryItemResponse } from './inventory-response.types';

export class InventoryItemSwaggerResponse extends InventoryItemResponse {}

export class InventoryItemCreateSwaggerResponse extends InventoryItemResponse {}

export class InventoryItemFindOneSwaggerResponse extends InventoryItemResponse {}

export class InventoryItemUpdateSwaggerResponse extends InventoryItemResponse {}

export class InventoryItemFindAllSwaggerResponse {
  @ApiProperty({ description: 'Current page number' })
  page: number;

  @ApiProperty({ description: 'Number of items per page' })
  limit: number;

  @ApiProperty({ description: 'Total number of results' })
  totalResults: number;

  @ApiProperty({ description: 'Number of results in current page' })
  currentResults: number;

  @ApiProperty({ description: 'Sort field' })
  sortField: string;

  @ApiProperty({ description: 'Sort order' })
  sortOrder: string;

  @ApiProperty({ description: 'Search term', required: false })
  search?: string;

  @ApiProperty({ description: 'List of inventory items', type: [InventoryItemSwaggerResponse] })
  results: InventoryItemSwaggerResponse[];
}

export class InventoryItemSoftDeleteSwaggerResponse {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ description: 'ID of the soft deleted inventory item' })
  id: number;
}

export class InventoryItemRestoreSwaggerResponse {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ description: 'ID of the restored inventory item' })
  id: number;
}
