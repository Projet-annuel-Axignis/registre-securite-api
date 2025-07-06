import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@paginator/paginator.dto';
import { IsEnum, IsOptional } from 'class-validator';

enum ProductDocumentTypeEntityFields {
  NAME = 'name',
  SERIAL_NUMBER = 'serialNumber',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
}

export class ProductDocumentTypeQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: ProductDocumentTypeEntityFields.NAME,
    description: 'Name of the column to sort',
    default: ProductDocumentTypeEntityFields.CREATED_AT,
    enum: ProductDocumentTypeEntityFields,
  })
  @IsEnum(ProductDocumentTypeEntityFields)
  @IsOptional()
  sortField: string = ProductDocumentTypeEntityFields.CREATED_AT;
}
