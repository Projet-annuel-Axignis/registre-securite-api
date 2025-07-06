import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProductDocumentTypeDto {
  @ApiPropertyOptional({ description: 'Name of the document type', example: 'User Manual' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Serial number of the document type (for searching)',
    example: 'DOC-USER-MANUAL-001',
  })
  @IsOptional()
  @IsString()
  serialNumber?: string;
}
