import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Periodicity } from '@src/intervention/types/periodicity.types';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

@ApiTags('Report', 'ReportType')
export class CreateReportTypeDto {
  @ApiProperty({
    description: 'Unique code identifier for the report type',
    example: 'monthly_report',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'French name/description of the report type',
    example: 'Rapport mensuel',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Frequency of the report',
    enum: Periodicity,
    example: Periodicity.MONTHLY,
  })
  @IsEnum(Periodicity)
  @IsNotEmpty()
  periodicity: Periodicity;
}
