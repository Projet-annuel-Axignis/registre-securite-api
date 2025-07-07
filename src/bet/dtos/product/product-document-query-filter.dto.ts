import { ApiPropertyOptional } from '@nestjs/swagger';
import { DocumentStatus } from '@src/bet/types/product/document-status.types';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class ProductDocumentQueryFilterDto {
  @ApiPropertyOptional({ description: 'Filter by serial number', example: 'DOC-2024-001' })
  @IsOptional()
  @IsString()
  serialNumber?: string;

  @ApiPropertyOptional({ description: 'Filter by file name', example: 'user-manual.pdf' })
  @IsOptional()
  @IsString()
  fileName?: string;

  @ApiPropertyOptional({ description: 'Filter by document type ID', example: 1 })
  @IsOptional()
  @IsString()
  typeId?: string;

  @ApiPropertyOptional({ description: 'Filter by product ID', example: 1 })
  @IsOptional()
  @IsString()
  productId?: string;

  @ApiPropertyOptional({
    description: 'Filter by document status',
    enum: DocumentStatus,
    example: DocumentStatus.PUBLISHED,
  })
  @IsOptional()
  @IsEnum(DocumentStatus)
  status?: DocumentStatus;

  @ApiPropertyOptional({ description: 'Filter by reference', example: 'REF-2024-001' })
  @IsOptional()
  @IsString()
  reference?: string;
}
