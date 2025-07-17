import { ApiProperty } from '@nestjs/swagger';
import { ProductDocumentResponse } from '@src/bet/types/product/product-document-response.types';

export class ObservationFileResponse {
  @ApiProperty({ description: 'ID of the observation file association', example: 1 })
  id: number;

  @ApiProperty({ description: 'ID of the file in BET API', example: 123 })
  fileId: number;

  @ApiProperty({
    description: 'Description of the file',
    example: 'Photo montrant la non-conformité détectée dans la zone A',
    required: false,
  })
  description?: string;
}

export class ObservationFileWithDetailsResponse extends ObservationFileResponse {
  @ApiProperty({ description: 'File information from BET API', required: false })
  file?: ProductDocumentResponse | null;
}

export class ObservationResponse {
  @ApiProperty({ description: 'ID of the observation', example: 1 })
  id: number;

  @ApiProperty({ description: 'Title of the observation', example: 'Fire safety inspection' })
  title: string;

  @ApiProperty({ description: 'Reference of the observation', example: 'OBS-2024-001' })
  reference: string;

  @ApiProperty({ description: 'Location of the observation', example: 'Building A, Floor 2' })
  location: string;

  @ApiProperty({ description: 'Priority of the observation', example: 'HIGH' })
  priority: string;

  @ApiProperty({ description: 'Status of the observation', example: 'OPEN' })
  status: string;

  @ApiProperty({ description: 'Start date', example: '2024-01-15T10:30:00.000Z', nullable: true })
  startedAt: Date | null;

  @ApiProperty({ description: 'End date', example: '2024-01-15T10:30:00.000Z', nullable: true })
  endedAt: Date | null;

  @ApiProperty({ description: 'Creation date', example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date', example: '2024-01-15T10:30:00.000Z' })
  updatedAt: Date;

  @ApiProperty({ description: 'Deletion date (if soft deleted)', example: null, nullable: true })
  deletedAt: Date | null;

  @ApiProperty({ description: 'Report information' })
  report: {
    id: number;
    label: string;
  };

  @ApiProperty({ description: 'Array of parts', type: [Object] })
  parts: Array<{
    id: number;
    name: string;
    type: string;
  }>;

  @ApiProperty({ description: 'Array of observation files', type: [ObservationFileResponse] })
  files: ObservationFileResponse[];
}

export class ObservationListResponse {
  @ApiProperty({ description: 'Array of observations', type: [ObservationResponse] })
  results: ObservationResponse[];

  @ApiProperty({ description: 'Current number of results', example: 10 })
  currentResults: number;

  @ApiProperty({ description: 'Total number of results', example: 50 })
  totalResults: number;

  @ApiProperty({ description: 'Offset for pagination', example: 0 })
  offset: number;

  @ApiProperty({ description: 'Limit for pagination', example: 20 })
  limit: number;
}
