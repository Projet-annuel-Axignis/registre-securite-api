import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Equipment Type Response
export class EquipmentTypeResponse {
  @ApiProperty({ description: 'Unique identifier of the equipment type' })
  id: number;

  @ApiProperty({ description: 'Title of the type', example: 'éclairage de sécurité' })
  title: string;

  @ApiPropertyOptional({ description: 'Subtitle of the type' })
  subTitle?: string;

  @ApiProperty({ description: 'Serial number of the type (for searching)' })
  serialNumber: string;

  @ApiProperty({ description: 'Boolean to indicates if the type is required for inventory' })
  inventoryRequired: boolean;

  @ApiPropertyOptional({
    description: 'Field for extra data',
    example: {
      capacity: {
        label: 'Capacité (L)',
        type: 'decimal',
      },
      agent: {
        label: 'Nature du produit',
        type: 'enum',
        values: ['EAU', 'CO2', 'Poudre'],
      },
    },
  })
  extraSchema?: object;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;

  @ApiPropertyOptional({ description: 'Soft delete timestamp' })
  deletedAt?: Date;
}

// Equipment Domain Response
export class EquipmentDomainResponse {
  @ApiProperty({ description: 'Unique identifier of the equipment domain' })
  id: number;

  @ApiProperty({ description: 'Name of the domain', example: 'électricité' })
  name: string;

  @ApiProperty({ description: 'Serial number of the domain (for searching)' })
  serialNumber: string;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;

  @ApiPropertyOptional({ description: 'Soft delete timestamp' })
  deletedAt?: Date;
}

// Equipment Family Response
export class EquipmentFamilyResponse {
  @ApiProperty({ description: 'Unique identifier of the equipment family' })
  id: number;

  @ApiProperty({ description: 'Name of the family', example: 'éclairage' })
  name: string;

  @ApiProperty({ description: 'Serial number of the family (for searching)' })
  serialNumber: string;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;

  @ApiPropertyOptional({ description: 'Soft delete timestamp' })
  deletedAt?: Date;
}
