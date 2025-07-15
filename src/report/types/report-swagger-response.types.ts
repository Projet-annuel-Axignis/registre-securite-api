import { ApiProperty } from '@nestjs/swagger';
import { ProductDocumentResponse } from '@src/bet/types/product/product-document-response.types';

export class ReportFileResponse {
  @ApiProperty({ description: 'ID of the report file association', example: 1 })
  id: number;

  @ApiProperty({ description: 'ID of the file in BET API', example: 123 })
  fileId: number;
}

export class ReportFileWithDetailsResponse extends ReportFileResponse {
  @ApiProperty({ description: 'File information from BET API', required: false })
  file?: ProductDocumentResponse | null;
}

export class ReportResponse {
  @ApiProperty({ description: 'ID of the report', example: 1 })
  id: number;

  @ApiProperty({ description: 'Label of the report', example: 'Rapport de sécurité incendie' })
  label: string;

  @ApiProperty({ description: 'Creation date', example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date', example: '2024-01-15T10:30:00.000Z' })
  updatedAt: Date;

  @ApiProperty({ description: 'Deletion date (if soft deleted)', example: null, nullable: true })
  deletedAt: Date | null;

  @ApiProperty({ description: 'Report type information' })
  type: {
    id: number;
    code: string;
    name: string;
    periodicity: string;
  };

  @ApiProperty({ description: 'Typology information', nullable: true })
  typology: {
    code: string;
    description: string;
  } | null;

  @ApiProperty({ description: 'Organization information', nullable: true })
  organization: {
    id: number;
    name: string;
    type: string;
  } | null;

  @ApiProperty({ description: 'Intervention information', nullable: true })
  intervention: {
    id: number;
    label: string;
    companyName: string;
    employeeName: string;
    status: string;
  } | null;

  @ApiProperty({ description: 'Array of parts', type: [Object] })
  parts: Array<{
    id: number;
    name: string;
    type: string;
  }>;

  @ApiProperty({ description: 'Array of report files', type: [ReportFileResponse] })
  files: ReportFileResponse[];

  @ApiProperty({ description: 'Array of observations', type: [Object] })
  observations: Array<{
    id: number;
    title: string;
    reference: string;
    status: string;
  }>;
}

export class ReportListResponse {
  @ApiProperty({ description: 'Array of reports', type: [ReportResponse] })
  results: ReportResponse[];

  @ApiProperty({ description: 'Current number of results', example: 10 })
  currentResults: number;

  @ApiProperty({ description: 'Total number of results', example: 50 })
  totalResults: number;

  @ApiProperty({ description: 'Offset for pagination', example: 0 })
  offset: number;

  @ApiProperty({ description: 'Limit for pagination', example: 20 })
  limit: number;
}
