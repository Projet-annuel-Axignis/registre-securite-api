import { ApiProperty } from '@nestjs/swagger';

export class SwaggerBuildingFloorNotFound {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Building floor 5 not found' })
  message: string;
}

export class SwaggerBuildingFloorNotOwned {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({ example: 'Building floor 5 not owned by user' })
  message: string;
}

export class SwaggerBuildingFloorExample {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Rez-de-chaussée' })
  name: string;

  @ApiProperty({ example: 0, description: 'Level of the floor based on building' })
  levelNumber: number;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  updatedAt: string;

  @ApiProperty({ example: null })
  deletedAt: string | null;

  @ApiProperty({
    example: {
      id: 1,
      name: 'Bâtiment A',
      createdAt: '2024-01-15T10:30:00.000Z',
      updatedAt: '2024-01-15T10:30:00.000Z',
      deletedAt: null,
      site: {
        id: 1,
        name: 'Site Principal',
        address: '123 Rue de la Paix',
        city: 'Paris',
        postalCode: '75001',
        country: 'France',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z',
        deletedAt: null,
        company: {
          id: 1,
          name: 'Company A',
          createdAt: '2024-01-15T10:30:00.000Z',
          updatedAt: '2024-01-15T10:30:00.000Z',
          deletedAt: null,
        },
      },
      users: [
        {
          id: 1,
          email: 'john.doe@example.com',
          name: 'John Doe',
          createdAt: '2024-01-15T10:30:00.000Z',
          updatedAt: '2024-01-15T10:30:00.000Z',
          deletedAt: null,
        },
      ],
    },
  })
  building: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
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
      company: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
      };
    };
    users: Array<{
      id: number;
      email: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
    }>;
  };

  @ApiProperty({
    example: [
      {
        id: 1,
        name: 'Lot A',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z',
        deletedAt: null,
      },
    ],
  })
  lots: Array<{
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }>;

  @ApiProperty({
    example: [
      {
        id: 1,
        name: 'Partie A - Rez-de-chaussée',
        levelNumber: 0,
        publicCount: 50,
        staffCount: 10,
        exploitationSurface: 500.5,
        glaSurface: 450.0,
        publicAccessSurface: 400.0,
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z',
        deletedAt: null,
      },
    ],
  })
  partFloors: Array<{
    id: number;
    name: string;
    levelNumber: number;
    publicCount: number;
    staffCount: number;
    exploitationSurface: number;
    glaSurface: number;
    publicAccessSurface: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }>;
}
