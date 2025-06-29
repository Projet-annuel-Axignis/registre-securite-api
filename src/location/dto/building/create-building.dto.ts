import { ApiProperty } from '@nestjs/swagger';
import { IghClassCode } from '@src/location/types/igh-class.types';
import { TypologyCode } from '@src/location/types/typology-code.types';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class CreateBuildingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  siteId: number;

  @ApiProperty()
  @IsEnum(TypologyCode, { each: true })
  typologyCodes: TypologyCode[];

  @ApiProperty()
  @ValidateIf((dto: CreateBuildingDto) => dto.typologyCodes.includes(TypologyCode.IGH))
  @IsEnum(IghClassCode, { each: true })
  ighClassCodes: IghClassCode[];

  @ApiProperty()
  @ValidateIf((dto: CreateBuildingDto) => dto.typologyCodes.includes(TypologyCode.ERP))
  @IsInt({ each: true })
  erpCategory: number;

  @ApiProperty()
  @IsInt({ each: true })
  @IsOptional()
  authorizedUserIds?: number[];
}
