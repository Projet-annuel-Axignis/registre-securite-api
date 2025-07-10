import { ApiProperty } from '@nestjs/swagger';
import { Periodicity } from '@src/intervention/types/periodicity.types';

export class SwaggerReportTypeNotFound {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Report type with code "monthly_report" not found' })
  message: string;
}

export class SwaggerReportTypeAlreadyExists {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: 'Report type with code "monthly_report" already exists' })
  message: string;
}

export class SwaggerReportTypeInUse {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: 'Report type is being used and cannot be deleted' })
  message: string;
}

export class SwaggerReportTypeExample {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'monthly_report' })
  code: string;

  @ApiProperty({ example: 'Rapport mensuel' })
  name: string;

  @ApiProperty({
    example: Periodicity.MONTHLY,
    enum: Periodicity,
  })
  periodicity: Periodicity;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  updatedAt: string;

  @ApiProperty({ example: null })
  deletedAt: string | null;

  @ApiProperty({
    example: [
      {
        id: 1,
        label: 'Rapport de sécurité janvier 2024',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z',
        deletedAt: null,
      },
    ],
    isArray: true,
  })
  reports: Array<{
    id: number;
    label: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }>;
}
