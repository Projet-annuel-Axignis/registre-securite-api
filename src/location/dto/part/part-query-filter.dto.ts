import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@src/paginator/paginator.dto';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

enum PartEntityFields {
  ID = 'id',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
  NAME = 'name',
  IS_ICPE = 'isIcpe',
  TYPE = 'type',
}

export class PartQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: PartEntityFields.NAME,
    description: 'Name of the column to sort',
    default: PartEntityFields.CREATED_AT,
    enum: PartEntityFields,
  })
  @IsEnum(PartEntityFields)
  @IsOptional()
  sortField: string = PartEntityFields.CREATED_AT;

  @ApiPropertyOptional({ description: 'Boolean to get archived data', default: false })
  @IsBoolean()
  @IsOptional()
  includeDeleted?: boolean;
}
