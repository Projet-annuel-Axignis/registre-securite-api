import { ApiProperty } from '@nestjs/swagger';
import { ProductDocumentTypeResponse } from './product-document-type-response.types';

export class ProductDocumentTypeSwaggerResponse extends ProductDocumentTypeResponse {}

export class ProductDocumentTypeCreateSwaggerResponse extends ProductDocumentTypeResponse {}

export class ProductDocumentTypeFindOneSwaggerResponse extends ProductDocumentTypeResponse {}

export class ProductDocumentTypeUpdateSwaggerResponse extends ProductDocumentTypeResponse {}

export class ProductDocumentTypeFindAllSwaggerResponse {
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

  @ApiProperty({ description: 'List of product document types', type: [ProductDocumentTypeSwaggerResponse] })
  results: ProductDocumentTypeSwaggerResponse[];
}

export class ProductDocumentTypeSoftDeleteSwaggerResponse {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ description: 'ID of the soft deleted product document type' })
  id: number;
}

export class ProductDocumentTypeRestoreSwaggerResponse {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ description: 'ID of the restored product document type' })
  id: number;
}
