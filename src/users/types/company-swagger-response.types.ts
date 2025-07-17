import { ApiProperty } from '@nestjs/swagger';

export class SwaggerCompanyNotFound {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Company 5 not found' })
  message: string;
}

export class SwaggerCompanyExample {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Société Axignis' })
  name: string;

  @ApiProperty({ example: '12345678901234' })
  siretNumber: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  updatedAt: string;

  @ApiProperty({ example: null })
  deletedAt: string | null;

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
        type: 'SELF_MANAGE',
        expiredAt: '2025-12-31T23:59:59.000Z',
        comment: 'Initial plan for the company',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z',
        deletedAt: null,
      },
    ],
  })
  plans: Array<{
    id: number;
    type: string;
    expiredAt: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }>;

  @ApiProperty({
    example: [
      {
        id: 1,
        name: 'Centre commercial la Part Dieu',
        streetNumber: '17',
        street: 'Rue Dr Bouchut',
        postalCode: 69003,
        city: 'Lyon',
        reference: 'REF-001',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z',
        deletedAt: null,
      },
    ],
  })
  sites: Array<{
    id: number;
    name: string;
    streetNumber: string;
    street: string;
    postalCode: number;
    city: string;
    reference: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }>;
}

export class SwaggerCompanyUpdatedResponse {
  @ApiProperty({ example: 'Company archived' })
  message: string;

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Société Axignis' })
  name: string;
}
