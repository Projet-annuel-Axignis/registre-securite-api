import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@paginator/paginator.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

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
