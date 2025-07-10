import { ApiProperty } from '@nestjs/swagger';

export class SwaggerInterventionTypeNotFound {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Intervention type with code "regulatory_audit" not found' })
  message: string;
}

export class SwaggerInterventionTypeAlreadyExists {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: 'Intervention type with code "regulatory_audit" already exists' })
  message: string;
}

export class SwaggerInterventionTypeInUse {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: 'Intervention type is being used and cannot be deleted' })
  message: string;
}

export class SwaggerInterventionTypeExample {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'regulatory_audit' })
  code: string;

  @ApiProperty({ example: 'Vérification réglementaire' })
  name: string;

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
        title: 'Audit de sécurité',
        description: 'Vérification complète des équipements de sécurité',
        status: 'PENDING',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z',
        deletedAt: null,
      },
    ],
    isArray: true,
  })
  interventions: Array<{
    id: number;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }>;
}
