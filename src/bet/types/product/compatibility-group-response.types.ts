import { ApiProperty } from '@nestjs/swagger';

// Compatibility Group Response
export class CompatibilityGroupResponse {
  @ApiProperty({ description: 'Unique identifier of the compatibility group' })
  id: number;

  @ApiProperty({ description: 'Name of the group' })
  name: string;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
}
