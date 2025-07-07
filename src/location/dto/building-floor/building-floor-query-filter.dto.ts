import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@paginator/paginator.dto';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

enum BuildingFloorEntityFields {
  ID = 'id',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
  NAME = 'name',
  LEVEL_NUMBER = 'levelNumber',
}

export class BuildingFloorQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: BuildingFloorEntityFields.NAME,
    description: 'Name of the column to sort',
    default: BuildingFloorEntityFields.CREATED_AT,
    enum: BuildingFloorEntityFields,
  })
  @IsEnum(BuildingFloorEntityFields)
  @IsOptional()
  sortField: string = BuildingFloorEntityFields.CREATED_AT;

  @ApiPropertyOptional({ description: 'Boolean to get archived data', default: false })
  @IsBoolean()
  @IsOptional()
  includeDeleted?: boolean;
}
