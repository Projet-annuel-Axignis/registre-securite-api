import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Product Document Type Response
export class ProductDocumentTypeResponse {
  @ApiProperty({ description: 'Unique identifier of the product document type' })
  id: number;

  @ApiProperty({ description: 'Name of the type' })
  name: string;

  @ApiProperty({ description: 'Serial number of the type (for searching)' })
  serialNumber: string;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;

  @ApiPropertyOptional({ description: 'Soft delete timestamp' })
  deletedAt?: Date;
}
