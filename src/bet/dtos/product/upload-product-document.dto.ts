import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DocumentStatus } from '@src/bet/types/product/document-status.types';
import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UploadProductDocumentDto {
  @ApiProperty({ description: 'Serial number of the document (for searching)', example: 'DOC-2024-001' })
  @IsNotEmpty()
  @IsString()
  serialNumber: string;

  @ApiProperty({ description: 'Name of the uploaded file', example: 'user-manual.pdf' })
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @ApiProperty({ description: 'Size of the file in bytes', example: 1024000 })
  @IsNotEmpty()
  @IsNumber()
  size: number;

  @ApiProperty({ description: 'MIME type of the file', example: 'application/pdf' })
  @IsOptional()
  @IsString()
  mimeType?: string;

  @ApiProperty({ description: 'File checksum for integrity verification', example: 'sha256:abc123...' })
  @IsOptional()
  @IsString()
  checksum?: string;

  @ApiProperty({ description: 'Issue date of the document', example: '2024-01-15T00:00:00.000Z' })
  @IsNotEmpty()
  @IsDateString()
  issueDate: string;

  @ApiPropertyOptional({ description: 'Expiry date of the document', example: '2025-01-15T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @ApiProperty({ description: 'Version number of the document', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  version: number;

  @ApiProperty({ description: 'ID of the document type', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  typeId: number;

  @ApiProperty({ description: 'Array of product IDs to associate with this document', example: [1, 2, 3] })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  productIds: number[];

  @ApiPropertyOptional({ description: 'Reference for the document', example: 'REF-2024-001' })
  @IsOptional()
  @IsString()
  reference?: string;

  @ApiPropertyOptional({
    description: 'Status of the document',
    enum: DocumentStatus,
    example: DocumentStatus.PUBLISHED,
  })
  @IsOptional()
  @IsEnum(DocumentStatus)
  status?: DocumentStatus;

  @ApiProperty({ description: 'ID of the user who uploaded the document', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  uploadedBy: number;
}
