import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@paginator/paginator.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

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

  @ApiPropertyOptional({
    type: 'boolean',
    description: 'Boolean to get archived data',
    default: false,
  })
  @Transform(({ value }: { value: string }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  @IsOptional()
  includeDeleted?: boolean;
}
