import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@paginator/paginator.dto';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

enum BuildingEntityFields {
  ID = 'id',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
  NAME = 'name',
}

export class BuildingQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: BuildingEntityFields.NAME,
    description: 'Name of the column to sort',
    default: BuildingEntityFields.CREATED_AT,
    enum: BuildingEntityFields,
  })
  @IsEnum(BuildingEntityFields)
  @IsOptional()
  sortField: string = BuildingEntityFields.CREATED_AT;

  @ApiPropertyOptional({ description: 'Boolean to get archived data', default: false })
  @IsBoolean()
  @IsOptional()
  includeDeleted?: boolean;
}
