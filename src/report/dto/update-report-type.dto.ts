import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Periodicity } from '@src/intervention/types/periodicity.types';
import { IsEnum, IsOptional, IsString } from 'class-validator';

@ApiTags('Report', 'ReportType')
export class UpdateReportTypeDto {
  @ApiProperty({
    description: 'Unique code identifier for the report type',
    example: 'monthly_report',
    required: false,
  })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({
    description: 'French name/description of the report type',
    example: 'Rapport mensuel',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Frequency of the report',
    enum: Periodicity,
    example: Periodicity.MONTHLY,
    required: false,
  })
  @IsEnum(Periodicity)
  @IsOptional()
  periodicity?: Periodicity;
}
