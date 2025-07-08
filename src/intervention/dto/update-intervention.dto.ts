import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { InterventionStatus } from '../types/intervention-status.types';
import { Periodicity } from '../types/periodicity.types';

export class UpdateInterventionDto {
  @ApiProperty({
    description: 'Label or title of the intervention',
    example: 'Vérification sécurité incendie',
    required: false,
  })
  @IsString()
  @IsOptional()
  label?: string;

  @ApiProperty({
    description: 'Name of the company where the intervention takes place',
    example: 'Entreprise ABC',
    required: false,
  })
  @IsString()
  @IsOptional()
  companyName?: string;

  @ApiProperty({
    description: 'Name of the employee responsible for the intervention',
    example: 'Jean Dupont',
    required: false,
  })
  @IsString()
  @IsOptional()
  employeeName?: string;

  @ApiProperty({
    description: 'Current status of the intervention',
    enum: InterventionStatus,
    example: InterventionStatus.IN_PROGRESS,
    required: false,
  })
  @IsEnum(InterventionStatus)
  @IsOptional()
  status?: InterventionStatus;

  @ApiProperty({
    description: 'Frequency of the intervention',
    enum: Periodicity,
    example: Periodicity.ANNUAL,
    required: false,
  })
  @IsEnum(Periodicity)
  @IsOptional()
  periodicity?: Periodicity;

  @ApiProperty({
    description: 'Planned date and time for the intervention',
    example: '2024-06-15T09:00:00.000Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  plannedAt?: string;

  @ApiProperty({
    description: 'Actual start date and time of the intervention',
    example: '2024-06-15T09:30:00.000Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  startedAt?: string;

  @ApiProperty({
    description: 'Actual end date and time of the intervention',
    example: '2024-06-15T11:00:00.000Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  endedAt?: string;

  @ApiProperty({
    description: 'ID of the intervention type',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  typeId?: number;

  @ApiProperty({
    description: 'ID of the user who terminated the intervention',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  terminatedById?: number;
}
