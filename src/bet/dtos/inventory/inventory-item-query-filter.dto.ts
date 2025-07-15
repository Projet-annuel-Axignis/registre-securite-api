import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@paginator/paginator.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

enum InventoryItemEntityFields {
  LOCATION = 'location',
  COMMISSIONING_DATE = 'commissioningDate',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
}

export class InventoryItemQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: InventoryItemEntityFields.LOCATION,
    description: 'Name of the column to sort',
    default: InventoryItemEntityFields.CREATED_AT,
    enum: InventoryItemEntityFields,
  })
  @IsEnum(InventoryItemEntityFields)
  @IsOptional()
  sortField: string = InventoryItemEntityFields.CREATED_AT;

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
