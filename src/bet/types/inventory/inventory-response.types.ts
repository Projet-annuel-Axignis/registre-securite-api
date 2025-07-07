import { ApiProperty } from '@nestjs/swagger';

// Inventory Item Response
export class InventoryItemResponse {
  @ApiProperty({ description: 'Unique identifier of the inventory item' })
  id: number;

  @ApiProperty({ description: 'Location of the inventory' })
  location: string;

  @ApiProperty({ description: 'Date of the request (commission)' })
  commissioningDate: Date;

  @ApiProperty({ description: 'Extra data for the inventory' })
  extraValues: object;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
}
