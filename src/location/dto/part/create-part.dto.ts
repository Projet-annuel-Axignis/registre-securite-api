import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { PartType } from '../../types/part-type.types';

export class CreatePartDto {
  @ApiProperty({ description: 'Name of the part' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Building ID' })
  @IsInt()
  @IsPositive()
  buildingId: number;

  @ApiProperty({ description: 'Type of the part', enum: PartType })
  @IsString()
  @IsNotEmpty()
  type: PartType;

  @ApiProperty({ description: 'Whether the part is ICPE' })
  @IsBoolean()
  @IsOptional()
  isIcpe?: boolean;

  @ApiProperty({ description: 'HAB family name', required: false })
  @IsString()
  @IsOptional()
  habFamilyName?: string;

  @ApiProperty({ description: 'ERP type codes', required: false, type: [String] })
  @IsString({ each: true })
  @IsOptional()
  erpTypeCodes?: string[];

  @ApiProperty({ description: 'Part floor ID', required: false })
  @IsInt()
  @IsPositive()
  @IsOptional()
  partFloorId?: number;
}
