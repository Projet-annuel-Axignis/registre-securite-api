import { ApiProperty } from '@nestjs/swagger';
import { InterventionStatus } from './intervention-status.types';
import { Periodicity } from './periodicity.types';

export class SwaggerInterventionNotFound {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Intervention 5 not found' })
  message: string;
}

export class SwaggerInterventionForbidden {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({ example: 'Access forbidden to intervention 5' })
  message: string;
}

export class SwaggerInterventionTypeNotFound {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Intervention type "regulatory_audit" not found' })
  message: string;
}

export class SwaggerInterventionTypeForbidden {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({ example: 'Access forbidden to intervention type' })
  message: string;
}

export class SwaggerInterventionExample {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Vérification sécurité incendie' })
  label: string;

  @ApiProperty({ example: 'Entreprise ABC' })
  companyName: string;

  @ApiProperty({ example: 'Jean Dupont' })
  employeeName: string;

  @ApiProperty({
    enum: InterventionStatus,
    example: InterventionStatus.PLANNED,
  })
  status: InterventionStatus;

  @ApiProperty({
    enum: Periodicity,
    example: Periodicity.ANNUAL,
  })
  periodicity: Periodicity;

  @ApiProperty({ example: '2024-06-15T09:00:00.000Z' })
  plannedAt: string;

  @ApiProperty({ example: '2024-06-15T09:30:00.000Z' })
  startedAt: string;

  @ApiProperty({ example: '2024-06-15T11:00:00.000Z' })
  endedAt: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  updatedAt: string;

  @ApiProperty({ example: null })
  deletedAt: string | null;

  @ApiProperty({
    example: {
      id: 1,
      code: 'regulatory_audit',
      name: 'Vérification réglementaire',
      createdAt: '2024-01-15T10:30:00.000Z',
      updatedAt: '2024-01-15T10:30:00.000Z',
      deletedAt: null,
    },
  })
  type: {
    id: number;
    code: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };

  @ApiProperty({
    example: {
      id: 1,
      email: 'user@example.com',
      firstName: 'Jean',
      lastName: 'Dupont',
      createdAt: '2024-01-15T10:30:00.000Z',
      updatedAt: '2024-01-15T10:30:00.000Z',
      deletedAt: null,
    },
    required: false,
  })
  terminatedBy?: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  } | null;
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
        label: 'Vérification sécurité incendie',
        companyName: 'Entreprise ABC',
        employeeName: 'Jean Dupont',
        status: 'PLANNED',
        periodicity: 'ANNUAL',
        plannedAt: '2024-06-15T09:00:00.000Z',
        startedAt: '2024-06-15T09:30:00.000Z',
        endedAt: '2024-06-15T11:00:00.000Z',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z',
        deletedAt: null,
      },
    ],
  })
  interventions: Array<{
    id: number;
    label: string;
    companyName: string;
    employeeName: string;
    status: string;
    periodicity: string;
    plannedAt: string;
    startedAt: string;
    endedAt: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }>;
}

export class SwaggerInterventionUpdatedResponse {
  @ApiProperty({ example: 'Intervention updated successfully' })
  message: string;

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Vérification sécurité incendie' })
  label: string;
}

export class SwaggerInterventionTypeUpdatedResponse {
  @ApiProperty({ example: 'Intervention type updated successfully' })
  message: string;

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'regulatory_audit' })
  code: string;
}
