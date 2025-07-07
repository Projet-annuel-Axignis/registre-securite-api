import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Brand Response
export class BrandResponse {
  @ApiProperty({ description: 'Unique identifier of the brand' })
  id: number;

  @ApiProperty({ description: 'Name of the brand', example: 'électricité' })
  name: string;

  @ApiProperty({ description: 'Serial number of the brand (for searching)' })
  serialNumber: string;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;

  @ApiPropertyOptional({ description: 'Soft delete timestamp' })
  deletedAt?: Date;
}
