import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@src/paginator/paginator.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

enum PartFloorEntityFields {
  ID = 'id',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
  NAME = 'name',
  LEVEL_NUMBER = 'levelNumber',
}

export class PartFloorQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: PartFloorEntityFields.NAME,
    description: 'Name of the column to sort',
    default: PartFloorEntityFields.CREATED_AT,
    enum: PartFloorEntityFields,
  })
  @IsEnum(PartFloorEntityFields)
  @IsOptional()
  sortField: string = PartFloorEntityFields.CREATED_AT;

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
