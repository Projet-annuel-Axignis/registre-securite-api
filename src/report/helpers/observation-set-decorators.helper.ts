import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiOkResponsePaginated } from '@paginator/paginator.decorator';
import { ObservationFile } from '../entities/observation-file.entity';
import { Observation } from '../entities/observation.entity';
import { ObservationConfigSwagger } from './observation-config-swagger.helper';

// Observation decorators
export const SwaggerObservationCreate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create an observation' }),
    ApiCreatedResponse(ObservationConfigSwagger.SUCCESS_OBSERVATION_CREATE),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
    ApiNotFoundResponse({ description: 'Report or parts not found' }),
  );
};

export const SwaggerObservationFindAll = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all observations' }),
    ApiOkResponsePaginated(Observation, { description: 'Observations list' }),
  );
};

export const SwaggerObservationFindOne = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get an observation by id' }),
    ApiOkResponse({ description: 'Observation', type: Observation }),
    ApiNotFoundResponse(ObservationConfigSwagger.OBSERVATION_NOT_FOUND),
    ApiForbiddenResponse(ObservationConfigSwagger.OBSERVATION_FORBIDDEN),
  );
};

export const SwaggerObservationUpdate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update an observation by id' }),
    ApiOkResponse(ObservationConfigSwagger.SUCCESS_OBSERVATION_UPDATE),
    ApiNotFoundResponse(ObservationConfigSwagger.OBSERVATION_NOT_FOUND),
    ApiForbiddenResponse(ObservationConfigSwagger.OBSERVATION_FORBIDDEN),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerObservationUpdateState = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Archive or restore observation by id' }),
    ApiOkResponse({
      description: 'Observation state updated',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Observation archived' },
          id: { type: 'number', example: 1 },
          title: { type: 'string', example: 'Non-conformité détectée' },
        },
      },
      examples: {
        archived: {
          summary: 'Observation archived',
          value: {
            message: 'Observation archived',
            id: 1,
            title: 'Non-conformité détectée',
          },
        },
        restored: {
          summary: 'Observation restored',
          value: {
            message: 'Observation restored',
            id: 1,
            title: 'Non-conformité détectée',
          },
        },
      },
    }),
    ApiNotFoundResponse(ObservationConfigSwagger.OBSERVATION_NOT_FOUND),
    ApiForbiddenResponse(ObservationConfigSwagger.OBSERVATION_FORBIDDEN),
  );
};

export const SwaggerObservationStart = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Start an observation by id' }),
    ApiOkResponse({
      description: 'Observation started successfully',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Observation started successfully' },
          id: { type: 'number', example: 1 },
          title: { type: 'string', example: 'Non-conformité détectée' },
        },
      },
    }),
    ApiNotFoundResponse(ObservationConfigSwagger.OBSERVATION_NOT_FOUND),
    ApiForbiddenResponse(ObservationConfigSwagger.OBSERVATION_FORBIDDEN),
    ApiBadRequestResponse({ description: 'Invalid status transition' }),
  );
};

export const SwaggerObservationFinish = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Finish an observation by id' }),
    ApiOkResponse({
      description: 'Observation finished successfully',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Observation finished successfully' },
          id: { type: 'number', example: 1 },
          title: { type: 'string', example: 'Non-conformité détectée' },
        },
      },
    }),
    ApiNotFoundResponse(ObservationConfigSwagger.OBSERVATION_NOT_FOUND),
    ApiForbiddenResponse(ObservationConfigSwagger.OBSERVATION_FORBIDDEN),
    ApiBadRequestResponse({ description: 'Invalid status transition' }),
  );
};

export const SwaggerObservationAttachFile = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Attach a file to an observation' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
            description: 'File to upload (PDF, DOC, DOCX, JPG, JPEG, PNG) - Max 10MB',
          },
        },
        required: ['file'],
      },
    }),
    ApiCreatedResponse(ObservationConfigSwagger.SUCCESS_OBSERVATION_FILE_ATTACH),
    ApiNotFoundResponse(ObservationConfigSwagger.OBSERVATION_NOT_FOUND),
    ApiBadRequestResponse({ description: 'Invalid file format or size' }),
  );
};

export const SwaggerObservationGetFiles = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all files attached to an observation' }),
    ApiOkResponse({ description: 'Observation files', type: [ObservationFile] }),
    ApiNotFoundResponse(ObservationConfigSwagger.OBSERVATION_NOT_FOUND),
  );
};

export const SwaggerObservationRemoveFile = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Remove a file from an observation' }),
    ApiOkResponse({ description: 'File removed successfully' }),
    ApiNotFoundResponse(ObservationConfigSwagger.OBSERVATION_FILE_NOT_FOUND),
  );
};
