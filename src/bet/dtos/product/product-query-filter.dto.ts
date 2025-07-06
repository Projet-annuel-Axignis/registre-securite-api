import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@paginator/paginator.dto';
import { IsEnum, IsOptional } from 'class-validator';

enum ProductEntityFields {
  NAME = 'name',
  SERIAL_NUMBER = 'serialNumber',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
}

export class ProductQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: ProductEntityFields.NAME,
    description: 'Name of the column to sort',
    default: ProductEntityFields.CREATED_AT,
    enum: ProductEntityFields,
  })
  @IsEnum(ProductEntityFields)
  @IsOptional()
  sortField: string = ProductEntityFields.CREATED_AT;
}
