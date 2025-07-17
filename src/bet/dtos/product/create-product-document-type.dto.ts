import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDocumentTypeDto {
  @ApiProperty({ description: 'Name of the document type', example: 'User Manual' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Serial number of the document type (for searching)', example: 'DOC-USER-MANUAL-001' })
  @IsNotEmpty()
  @IsString()
  serialNumber: string;
}
