import { ApiProperty } from '@nestjs/swagger';
import { BrandResponse } from './brand-response.types';

export class BrandSwaggerResponse extends BrandResponse {}

export class BrandCreateSwaggerResponse extends BrandResponse {}

export class BrandFindOneSwaggerResponse extends BrandResponse {}

export class BrandUpdateSwaggerResponse extends BrandResponse {}

export class BrandFindAllSwaggerResponse {
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

  @ApiProperty({ description: 'List of brands', type: [BrandSwaggerResponse] })
  results: BrandSwaggerResponse[];
}

export class BrandSoftDeleteSwaggerResponse {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ description: 'ID of the soft deleted brand' })
  id: number;
}

export class BrandRestoreSwaggerResponse {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ description: 'ID of the restored brand' })
  id: number;
}
