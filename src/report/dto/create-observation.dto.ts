import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { ObservationStatus } from '../types/observation-status.types';

export class CreateObservationDto {
  @ApiProperty({
    description: 'Title of the observation',
    example: 'Non-conformité détectée dans la zone A',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Reference number for the observation',
    example: 'OBS-2024-001',
  })
  @IsString()
  @IsNotEmpty()
  reference: string;

  @ApiPropertyOptional({
    description: 'Location where the observation was made',
    example: 'Zone A - Étage 2',
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({
    description: 'Priority level of the observation (1-5)',
    example: 3,
    minimum: 1,
    maximum: 5,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  priority?: number;

  @ApiProperty({
    description: 'Status of the observation',
    enum: ObservationStatus,
    example: ObservationStatus.OPEN,
  })
  @IsEnum(ObservationStatus)
  status: ObservationStatus;

  @ApiPropertyOptional({
    description: 'Start date and time of the observation',
    example: '2024-06-15T09:00:00.000Z',
  })
  @IsDateString()
  @IsOptional()
  startedAt?: string;

  @ApiPropertyOptional({
    description: 'End date and time of the observation',
    example: '2024-06-15T11:00:00.000Z',
  })
  @IsDateString()
  @IsOptional()
  endedAt?: string;

  @ApiProperty({
    description: 'ID of the report this observation belongs to',
    example: 1,
  })
  @IsNumber()
  reportId: number;

  @ApiPropertyOptional({
    description: 'IDs of parts related to this observation',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  partIds?: number[];

  @ApiPropertyOptional({
    description: 'IDs of files to attach to this observation (from BET API)',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  fileIds?: number[];
}
