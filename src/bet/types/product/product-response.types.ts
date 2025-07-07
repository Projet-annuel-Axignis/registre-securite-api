import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Product Response
export class ProductResponse {
  @ApiProperty({ description: 'Unique identifier of the product' })
  id: number;

  @ApiProperty({ description: 'Name of the product', example: 'électricité' })
  name: string;

  @ApiProperty({ description: 'Serial number of the product (for searching)' })
  serialNumber: string;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;

  @ApiPropertyOptional({ description: 'Soft delete timestamp' })
  deletedAt?: Date;
}
