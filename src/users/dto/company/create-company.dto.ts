import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Name of the company', example: 'Axignis' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'SIRET number of the company', example: 12345678901234 })
  @IsNumberString()
  @Length(14, 14)
  siretNumber: string;

  @ApiProperty({ description: 'Id of the plan', example: 1 })
  @IsInt()
  @IsNotEmpty()
  planId: number;
}
