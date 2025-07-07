import { ApiProperty } from '@nestjs/swagger';
import { ProductResponse } from '../product/product-response.types';

export class ProductSwaggerResponse extends ProductResponse {}

export class ProductCreateSwaggerResponse extends ProductResponse {}

export class ProductFindOneSwaggerResponse extends ProductResponse {}

export class ProductUpdateSwaggerResponse extends ProductResponse {}

export class ProductFindAllSwaggerResponse {
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

  @ApiProperty({ description: 'List of products', type: [ProductSwaggerResponse] })
  results: ProductSwaggerResponse[];
}

export class ProductSoftDeleteSwaggerResponse {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ description: 'ID of the soft deleted product' })
  id: number;
}

export class ProductRestoreSwaggerResponse {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ description: 'ID of the restored product' })
  id: number;
}
