import { IghClassCode } from '@src/location/types/igh-class.types';
import { TypologyCode } from '@src/location/types/typology-code.types';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBuildingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  siteId: number;

  @IsEnum(TypologyCode, { each: true })
  typologyCodes: TypologyCode[];

  @IsEnum(IghClassCode, { each: true })
  ighClassCodes: IghClassCode[];

  @IsInt({ each: true })
  erpCategory: number;

  @IsInt({ each: true })
  @IsOptional()
  authorizedUserIds?: number[];
}
