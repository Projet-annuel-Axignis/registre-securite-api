import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@paginator/paginator.dto';
import { IsEnum, IsOptional } from 'class-validator';

enum BrandEntityFields {
  NAME = 'name',
  SERIAL_NUMBER = 'serialNumber',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
}

export class BrandQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: BrandEntityFields.NAME,
    description: 'Name of the column to sort',
    default: BrandEntityFields.CREATED_AT,
    enum: BrandEntityFields,
  })
  @IsEnum(BrandEntityFields)
  @IsOptional()
  sortField: string = BrandEntityFields.CREATED_AT;
}
