import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DocumentStatus } from '@src/bet/types/product/document-status.types';
import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UploadProductDocumentDto {
  @ApiProperty({ description: 'Serial number of the document (for searching)', example: 'DOC-2024-001' })
  @IsNotEmpty()
  @IsString()
  serialNumber: string;

  @ApiProperty({ description: 'Title of the document', example: 'Product Manual v1.0' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Description of the document', example: 'User manual for Product XYZ' })
  @IsOptional()
  @IsString()
  description?: string;

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
  // @IsDateString()
  expiryDate?: string;

  @ApiProperty({ description: 'Version number of the document', example: 1 })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty()
  @IsNumber()
  version: number;

  @ApiProperty({ description: 'ID of the document type', example: 1 })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty()
  @IsNumber()
  typeId: number;

  @ApiProperty({ description: 'Array of product IDs to associate with this document', example: [1, 2, 3] })
  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v) => parseInt(v, 10));
    }
    if (typeof value === 'string') {
      return value.split(',').map((v) => parseInt(v.trim(), 10));
    }
    if (!value) return [];
    return value;
  })
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

  @ApiProperty({
    description: 'ID of the user from registre API who uploaded the document',
    example: '12345',
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  uploadedBy: number;
}
