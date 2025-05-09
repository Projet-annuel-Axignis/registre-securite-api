import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSiteDto {
  @ApiProperty({ description: 'Name of the site', example: 'Centre commercial la Part Dieu' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Number of the street in the address', example: '17' })
  @IsString()
  @IsNotEmpty()
  streetNumber: string;

  @ApiProperty({ description: 'Street in address', example: 'Rue Dr Bouchut' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ description: 'Postal code in address', example: 69003 })
  @IsInt()
  postalCode: number;

  @ApiProperty({ description: 'City in address', example: 'Lyon' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiPropertyOptional({ description: 'Internal identity number' })
  @IsString()
  @IsOptional()
  reference?: string;

  @ApiPropertyOptional({ description: 'Id of the company' })
  @IsInt()
  @IsOptional()
  companyId?: number;
}
