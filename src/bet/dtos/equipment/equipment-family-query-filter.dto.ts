import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@paginator/paginator.dto';
import { IsEnum, IsOptional } from 'class-validator';

enum EquipmentFamilyEntityFields {
  NAME = 'name',
  SERIAL_NUMBER = 'serialNumber',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
}

export class EquipmentFamilyQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: EquipmentFamilyEntityFields.NAME,
    description: 'Name of the column to sort',
    default: EquipmentFamilyEntityFields.CREATED_AT,
    enum: EquipmentFamilyEntityFields,
  })
  @IsEnum(EquipmentFamilyEntityFields)
  @IsOptional()
  sortField: string = EquipmentFamilyEntityFields.CREATED_AT;
}
