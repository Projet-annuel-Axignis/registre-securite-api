import { ApiProperty } from '@nestjs/swagger';
import { BetApiErrorResponse } from '../../services/abstract-bet.service';
import { DocumentStatus } from './document-status.types';

export class ProductDocumentResponse {
  @ApiProperty({ description: 'Unique identifier of the document', example: 1 })
  id: number;

  @ApiProperty({ description: 'Reference for the document', example: 'REF-2024-001', required: false })
  reference?: string;

  @ApiProperty({ description: 'Serial number of the document', example: 'DOC-2024-001' })
  serialNumber: string;

  @ApiProperty({ description: 'Name of the uploaded file', example: 'user-manual.pdf' })
  fileName: string;

  @ApiProperty({ description: 'Path to the file on disk', example: '/uploads/abc123.pdf' })
  filePath: string;

  @ApiProperty({ description: 'Size of the file in bytes', example: 1024000 })
  size: number;

  @ApiProperty({ description: 'Issue date of the document', example: '2024-01-15T00:00:00.000Z' })
  issueDate: string;

  @ApiProperty({ description: 'Expiry date of the document', example: '2025-01-15T00:00:00.000Z', required: false })
  expiryDate?: string;

  @ApiProperty({ description: 'Version number of the document', example: 1 })
  version: number;

  @ApiProperty({ description: 'MIME type of the file', example: 'application/pdf', required: false })
  mimeType?: string;

  @ApiProperty({
    description: 'File checksum for integrity verification',
    example: 'sha256:abc123...',
    required: false,
  })
  checksum?: string;

  @ApiProperty({
    description: 'Status of the document',
    enum: DocumentStatus,
    example: DocumentStatus.PUBLISHED,
  })
  status: DocumentStatus;

  @ApiProperty({ description: 'Creation timestamp', example: '2024-01-15T10:30:00.000Z' })
  createdAt: string;

  @ApiProperty({ description: 'Last update timestamp', example: '2024-01-15T10:30:00.000Z' })
  updatedAt: string;

  @ApiProperty({ description: 'User who uploaded the document', required: false })
  uploadedBy?: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };

  @ApiProperty({ description: 'Products associated with this document' })
  products: Array<{
    id: number;
    name: string;
    serialNumber: string;
  }>;

  @ApiProperty({ description: 'Document type information' })
  type: {
    id: number;
    name: string;
    serialNumber: string;
  };
}

/**
 * Union type for upload document response that can handle both success and error cases
 */
export type UploadDocumentResponse = ProductDocumentResponse | BetApiErrorResponse;
