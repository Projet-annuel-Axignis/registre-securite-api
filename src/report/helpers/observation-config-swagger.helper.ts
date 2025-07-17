import { ApiResponseOptions } from '@nestjs/swagger';
import { ObservationFile } from '../entities/observation-file.entity';
import { Observation } from '../entities/observation.entity';

export class ObservationConfigSwagger {
  // Success responses
  static readonly SUCCESS_OBSERVATION_CREATE: ApiResponseOptions = {
    description: 'Observation created successfully',
    type: Observation,
  };

  static readonly SUCCESS_OBSERVATION_UPDATE: ApiResponseOptions = {
    description: 'Observation updated successfully',
    type: Observation,
  };

  static readonly SUCCESS_OBSERVATION_FILE_ATTACH: ApiResponseOptions = {
    description: 'File attached to observation successfully',
    type: ObservationFile,
  };

  // Error responses
  static readonly OBSERVATION_NOT_FOUND: ApiResponseOptions = {
    description: 'Observation not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Observation not found' },
        error: { type: 'string', example: 'Not Found' },
        details: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
          },
        },
      },
    },
  };

  static readonly OBSERVATION_FORBIDDEN: ApiResponseOptions = {
    description: 'Access forbidden',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Access forbidden' },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  };

  static readonly FILE_NOT_FOUND: ApiResponseOptions = {
    description: 'File not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'File not found' },
        error: { type: 'string', example: 'Not Found' },
        details: {
          type: 'object',
          properties: {
            fileId: { type: 'number', example: 1 },
          },
        },
      },
    },
  };

  static readonly OBSERVATION_FILE_NOT_FOUND: ApiResponseOptions = {
    description: 'Observation file association not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Observation file not found' },
        error: { type: 'string', example: 'Not Found' },
        details: {
          type: 'object',
          properties: {
            observationId: { type: 'number', example: 1 },
            fileId: { type: 'number', example: 1 },
          },
        },
      },
    },
  };
}
