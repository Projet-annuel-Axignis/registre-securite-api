import { ApiProperty } from '@nestjs/swagger';

export class SwaggerBuildingNotFound {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Building 5 not found' })
  message: string;
}

export class SwaggerBuildingExample {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Bâtiment A' })
  name: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  updatedAt: string;

  @ApiProperty({ example: null })
  deletedAt: string | null;

  @ApiProperty({
    example: {
      id: 1,
      name: 'Site Principal',
      address: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
      createdAt: '2024-01-15T10:30:00.000Z',
      updatedAt: '2024-01-15T10:30:00.000Z',
      deletedAt: null,
    },
  })
  site: {
    id: number;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };

  @ApiProperty({
    example: [
      {
        code: 'RES',
        name: 'Résidentiel',
        description: 'Bâtiment à usage résidentiel',
      },
    ],
  })
  typologies: Array<{
    code: string;
    name: string;
    description: string;
  }>;

  @ApiProperty({
    example: [
      {
        code: 'IGH1',
        name: 'IGH 1',
        description: 'Immeuble de Grande Hauteur classe 1',
      },
    ],
  })
  ighClasses: Array<{
    code: string;
    name: string;
    description: string;
  }>;

  @ApiProperty({
    example: {
      code: 'ERP1',
      name: 'ERP Type 1',
      description: 'Établissement Recevant du Public Type 1',
    },
    required: false,
  })
  erpCategory?: {
    code: string;
    name: string;
    description: string;
  } | null;

  @ApiProperty({
    example: [
      {
        id: 1,
        name: 'Partie A',
        type: 'COMMON',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z',
        deletedAt: null,
      },
    ],
  })
  parts: Array<{
    id: number;
    name: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }>;

  @ApiProperty({
    example: [
      {
        id: 1,
        name: 'Rez-de-chaussée',
        floorNumber: 0,
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z',
        deletedAt: null,
      },
    ],
  })
  BuildingFloors: Array<{
    id: number;
    name: string;
    floorNumber: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }>;

  @ApiProperty({
    example: [
      {
        id: 1,
        email: 'john.doe@example.com',
        name: 'John Doe',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z',
        deletedAt: null,
      },
    ],
  })
  users: Array<{
    id: number;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }>;

  @ApiProperty({
    example: [
      {
        id: 1,
        name: 'Lot A',
        description: 'Lot principal du bâtiment',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z',
        deletedAt: null,
      },
    ],
  })
  lots: Array<{
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }>;
}
