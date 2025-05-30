import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@paginator/paginator.dto';
import { IsEnum, IsOptional } from 'class-validator';

enum BuildingFloorEntityFields {
  ID = 'id',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
  NAME = 'name',
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
}
