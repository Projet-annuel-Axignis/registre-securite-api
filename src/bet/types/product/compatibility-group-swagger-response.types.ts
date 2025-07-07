import { ApiProperty } from '@nestjs/swagger';
import { CompatibilityGroupResponse } from './compatibility-group-response.types';

export class CompatibilityGroupSwaggerResponse extends CompatibilityGroupResponse {}

export class CompatibilityGroupCreateSwaggerResponse extends CompatibilityGroupResponse {}

export class CompatibilityGroupFindOneSwaggerResponse extends CompatibilityGroupResponse {}

export class CompatibilityGroupUpdateSwaggerResponse extends CompatibilityGroupResponse {}

export class CompatibilityGroupFindAllSwaggerResponse {
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

  @ApiProperty({ description: 'List of compatibility groups', type: [CompatibilityGroupSwaggerResponse] })
  results: CompatibilityGroupSwaggerResponse[];
}

export class CompatibilityGroupSoftDeleteSwaggerResponse {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ description: 'ID of the soft deleted compatibility group' })
  id: number;
}

export class CompatibilityGroupRestoreSwaggerResponse {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ description: 'ID of the restored compatibility group' })
  id: number;
}
