import { ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { PaginationParamsDto } from '@paginator/paginator.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

enum BuildingFloorEntityFields {
  ID = 'id',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
  NAME = 'name',
  LEVEL_NUMBER = 'levelNumber',
}

@ApiTags('Location', 'BuildingFloor')
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
  @Transform(({ value }: { value: string }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  @IsOptional()
  includeDeleted?: boolean;
}
