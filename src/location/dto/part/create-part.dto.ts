import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ErpTypeCode } from '@src/location/types/erp-type.types';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { HabFamilyName } from '../../types/hab-family-name.types';
import { PartType } from '../../types/part-type.types';

export class CreatePartDto {
  @ApiProperty({ description: 'Name of the part', example: 'Apple Store' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Defined if building part is ICPE', default: false })
  @IsBoolean()
  @IsOptional()
  isIcpe?: boolean;

  @ApiProperty({ enum: PartType, example: PartType.PRIVATE })
  @IsEnum(PartType)
  @IsNotEmpty()
  type: PartType;

  @ApiProperty({ description: 'Building ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  buildingId: number;

  @ApiPropertyOptional({ enum: HabFamilyName })
  @IsEnum(HabFamilyName)
  @IsOptional()
  habFamilyName?: HabFamilyName;

  @ApiProperty({ description: 'ERP Type codes', enum: ErpTypeCode, example: [ErpTypeCode.CTS] })
  @IsEnum(ErpTypeCode, { each: true })
  @IsOptional()
  erpTypeCodes?: ErpTypeCode[];
}
