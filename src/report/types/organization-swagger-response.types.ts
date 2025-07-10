import { ApiProperty } from '@nestjs/swagger';

export class SwaggerOrganizationNotFound {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Organization with name "Organization ABC" not found' })
  message: string;
}

export class SwaggerOrganizationAlreadyExists {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: 'Organization with name "Organization ABC" already exists' })
  message: string;
}

export class SwaggerOrganizationInUse {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: 'Organization is being used and cannot be deleted' })
  message: string;
}

export class SwaggerOrganizationExample {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Organization ABC' })
  name: string;

  @ApiProperty({ example: 'OA' })
  type: string;

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
        title: 'Security Report 2024',
        description: 'Annual security assessment report',
        status: 'DRAFT',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z',
        deletedAt: null,
      },
    ],
    isArray: true,
  })
  reports: Array<{
    id: number;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }>;
}
