import { ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { InterventionStatus } from '../types/intervention-status.types';

@ApiTags('Intervention')
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

  @ApiPropertyOptional({
    description: 'Array of part IDs to attach to the intervention',
    example: [1, 2, 3],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  partIds?: number[];
}
