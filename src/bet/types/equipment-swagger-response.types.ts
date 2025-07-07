import { ApiProperty } from '@nestjs/swagger';
import { EquipmentTypeResponse, EquipmentDomainResponse, EquipmentFamilyResponse } from './equipment-response.types';

// Equipment Type Swagger Responses
export class EquipmentTypeSwaggerResponse extends EquipmentTypeResponse {}

export class EquipmentTypeCreateSwaggerResponse extends EquipmentTypeResponse {}

export class EquipmentTypeFindOneSwaggerResponse extends EquipmentTypeResponse {}

export class EquipmentTypeUpdateSwaggerResponse extends EquipmentTypeResponse {}

export class EquipmentTypeFindAllSwaggerResponse {
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

  @ApiProperty({ description: 'List of equipment types', type: [EquipmentTypeSwaggerResponse] })
  results: EquipmentTypeSwaggerResponse[];
}

export class EquipmentTypeSoftDeleteSwaggerResponse {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ description: 'ID of the soft deleted equipment type' })
  id: number;
}

export class EquipmentTypeRestoreSwaggerResponse {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ description: 'ID of the restored equipment type' })
  id: number;
}

// Equipment Domain Swagger Responses
export class EquipmentDomainSwaggerResponse extends EquipmentDomainResponse {}

export class EquipmentDomainCreateSwaggerResponse extends EquipmentDomainResponse {}

export class EquipmentDomainFindOneSwaggerResponse extends EquipmentDomainResponse {}

export class EquipmentDomainUpdateSwaggerResponse extends EquipmentDomainResponse {}

export class EquipmentDomainFindAllSwaggerResponse {
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

  @ApiProperty({ description: 'List of equipment domains', type: [EquipmentDomainSwaggerResponse] })
  results: EquipmentDomainSwaggerResponse[];
}

export class EquipmentDomainSoftDeleteSwaggerResponse {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ description: 'ID of the soft deleted equipment domain' })
  id: number;
}

export class EquipmentDomainRestoreSwaggerResponse {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ description: 'ID of the restored equipment domain' })
  id: number;
}

// Equipment Family Swagger Responses
export class EquipmentFamilySwaggerResponse extends EquipmentFamilyResponse {}

export class EquipmentFamilyCreateSwaggerResponse extends EquipmentFamilyResponse {}

export class EquipmentFamilyFindOneSwaggerResponse extends EquipmentFamilyResponse {}

export class EquipmentFamilyUpdateSwaggerResponse extends EquipmentFamilyResponse {}

export class EquipmentFamilyFindAllSwaggerResponse {
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

  @ApiProperty({ description: 'List of equipment families', type: [EquipmentFamilySwaggerResponse] })
  results: EquipmentFamilySwaggerResponse[];
}

export class EquipmentFamilySoftDeleteSwaggerResponse {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ description: 'ID of the soft deleted equipment family' })
  id: number;
}

export class EquipmentFamilyRestoreSwaggerResponse {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ description: 'ID of the restored equipment family' })
  id: number;
}
