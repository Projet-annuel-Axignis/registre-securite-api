import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@paginator/paginator.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

enum EquipmentTypeEntityFields {
  TITLE = 'title',
  SUB_TITLE = 'subTitle',
  SERIAL_NUMBER = 'serialNumber',
  INVENTORY_REQUIRED = 'inventoryRequired',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
}

export class EquipmentTypeQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: EquipmentTypeEntityFields.TITLE,
    description: 'Name of the column to sort',
    default: EquipmentTypeEntityFields.CREATED_AT,
    enum: EquipmentTypeEntityFields,
  })
  @IsEnum(EquipmentTypeEntityFields)
  @IsOptional()
  sortField: string = EquipmentTypeEntityFields.CREATED_AT;

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
