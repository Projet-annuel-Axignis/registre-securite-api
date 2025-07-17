import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({ description: 'Label of the report', example: 'Rapport de sécurité incendie' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({ description: 'Code of the report type', example: 'SECURITY' })
  @IsString()
  typeCode: string;

  @ApiPropertyOptional({ description: 'Code of the typology', example: 'ERP' })
  @IsOptional()
  @IsString()
  typologyCode?: string;

  @ApiPropertyOptional({ description: 'ID of the organization', example: 1 })
  @IsOptional()
  @IsNumber()
  organizationId?: number;

  @ApiPropertyOptional({ description: 'ID of the intervention', example: 1 })
  @IsOptional()
  @IsNumber()
  interventionId?: number;

  @ApiPropertyOptional({ description: 'Array of part IDs', example: [1, 2, 3] })
  @IsArray()
  @IsNumber({}, { each: true })
  partIds: number[];

  @ApiPropertyOptional({ description: 'Array of file IDs from BET API', example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  fileIds?: number[];

  @ApiPropertyOptional({ description: 'Array of equipment type IDs from BET API', example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  equipmentTypeIds?: number[];
}
