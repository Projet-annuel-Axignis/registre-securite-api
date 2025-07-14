import { ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { InterventionStatus } from '../types/intervention-status.types';
import { Periodicity } from '../types/periodicity.types';

@ApiTags('Intervention')
export class CreateInterventionDto {
  @ApiProperty({
    description: 'Label or title of the intervention',
    example: 'Vérification sécurité incendie',
  })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({
    description: 'Name of the company where the intervention takes place',
    example: 'Entreprise ABC',
  })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({
    description: 'Name of the employee responsible for the intervention',
    example: 'Jean Dupont',
  })
  @IsString()
  @IsNotEmpty()
  employeeName: string;

  @ApiProperty({
    description: 'Current status of the intervention',
    enum: InterventionStatus,
    example: InterventionStatus.PLANNED,
  })
  @IsEnum(InterventionStatus)
  status: InterventionStatus;

  @ApiProperty({
    description: 'Frequency of the intervention',
    enum: Periodicity,
    example: Periodicity.ANNUAL,
  })
  @IsEnum(Periodicity)
  periodicity: Periodicity;

  @ApiPropertyOptional({
    description: 'Planned date and time for the intervention',
    example: '2024-06-15T09:00:00.000Z',
    required: false,
  })
  @IsDateString()
  plannedAt?: string;

  @ApiPropertyOptional({
    description: 'Actual start date and time of the intervention',
    example: '2024-06-15T09:30:00.000Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  startedAt?: string;

  @ApiPropertyOptional({
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
  })
  @IsNumber()
  typeId: number;

  @ApiProperty({
    description: 'ID of the user who terminated the intervention',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  terminatedById?: number;
}
