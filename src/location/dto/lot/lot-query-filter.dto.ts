import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@src/paginator/paginator.dto';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

enum LotEntityFields {
  ID = 'id',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
  NAME = 'name',
}

export class LotQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: LotEntityFields.NAME,
    description: 'Name of the column to sort',
    default: LotEntityFields.CREATED_AT,
    enum: LotEntityFields,
  })
  @IsEnum(LotEntityFields)
  @IsOptional()
  sortField: string = LotEntityFields.CREATED_AT;

  @ApiPropertyOptional({ description: 'Boolean to get archived data', default: false })
  @IsBoolean()
  @IsOptional()
  includeDeleted?: boolean;
}
