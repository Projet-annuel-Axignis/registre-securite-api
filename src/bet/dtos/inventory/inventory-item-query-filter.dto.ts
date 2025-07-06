import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@paginator/paginator.dto';
import { IsEnum, IsOptional } from 'class-validator';

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
}
