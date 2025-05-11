import { IghClassCode } from '@src/location/types/igh-class.types';
import { TypologyCode } from '@src/location/types/typology-code.types';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class CreateBuildingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  siteId: number;

  @IsEnum(TypologyCode, { each: true })
  typologyCodes: TypologyCode[];

  @ValidateIf((dto: CreateBuildingDto) => dto.typologyCodes.includes(TypologyCode.IGH))
  @IsEnum(IghClassCode, { each: true })
  ighClassCodes: IghClassCode[];

  @ValidateIf((dto: CreateBuildingDto) => dto.typologyCodes.includes(TypologyCode.ERP))
  @IsInt({ each: true })
  erpCategory: number;

  @IsInt({ each: true })
  @IsOptional()
  authorizedUserIds?: number[];
}
