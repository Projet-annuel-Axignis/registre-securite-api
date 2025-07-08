import { ApiProperty } from '@nestjs/swagger';

export class SwaggerSiteNotFound {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Site 5 not found' })
  message: string;
}

export class SwaggerSiteForbidden {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({ example: 'Access forbidden to site 5' })
  message: string;
}

export class SwaggerSiteExample {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Centre commercial la Part Dieu' })
  name: string;

  @ApiProperty({ example: '17' })
  streetNumber: string;

  @ApiProperty({ example: 'Rue Dr Bouchut' })
  street: string;

  @ApiProperty({ example: 69003 })
  postalCode: number;

  @ApiProperty({ example: 'Lyon' })
  city: string;

  @ApiProperty({ example: 'REF-001', required: false })
  reference?: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  updatedAt: string;

  @ApiProperty({ example: null })
  deletedAt: string | null;

  @ApiProperty({
    example: {
      id: 1,
      name: 'Company A',
      createdAt: '2024-01-15T10:30:00.000Z',
      updatedAt: '2024-01-15T10:30:00.000Z',
      deletedAt: null,
    },
  })
  company: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };

  @ApiProperty({
    example: [
      {
        id: 1,
        name: 'Bâtiment A',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z',
        deletedAt: null,
      },
    ],
  })
  buildings: Array<{
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }>;
}

export class SwaggerSiteUpdatedResponse {
  @ApiProperty({ example: 'Site archived' })
  message: string;

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Centre commercial la Part Dieu' })
  name: string;
}
