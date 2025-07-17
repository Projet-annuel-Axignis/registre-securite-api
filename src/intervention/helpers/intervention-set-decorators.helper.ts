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
import { InterventionType } from '../entities/intervention-type.entity';
import { Intervention } from '../entities/intervention.entity';
import { InterventionConfigSwagger } from './intervention-config-swagger.helper';

// Intervention decorators
export const SwaggerInterventionCreate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create an intervention' }),
    ApiCreatedResponse(InterventionConfigSwagger.SUCCESS_INTERVENTION_CREATE),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerInterventionFindAll = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all interventions' }),
    ApiOkResponsePaginated(Intervention, { description: 'Interventions list' }),
  );
};

export const SwaggerInterventionFindOne = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get an intervention by id' }),
    ApiOkResponse({ description: 'Intervention', type: Intervention }),
    ApiNotFoundResponse(InterventionConfigSwagger.INTERVENTION_NOT_FOUND),
    ApiForbiddenResponse(InterventionConfigSwagger.INTERVENTION_FORBIDDEN),
  );
};

export const SwaggerInterventionUpdate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update an intervention by id' }),
    ApiOkResponse(InterventionConfigSwagger.SUCCESS_INTERVENTION_UPDATE),
    ApiNotFoundResponse(InterventionConfigSwagger.INTERVENTION_NOT_FOUND),
    ApiForbiddenResponse(InterventionConfigSwagger.INTERVENTION_FORBIDDEN),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerInterventionUpdateState = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Archive or restore intervention by id' }),
    ApiOkResponse({
      description: 'Intervention state updated',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Intervention archived' },
          id: { type: 'number', example: 1 },
          label: { type: 'string', example: 'Vérification sécurité incendie' },
        },
      },
      examples: {
        archived: {
          summary: 'Intervention archived',
          value: {
            message: 'Intervention archived',
            id: 1,
            label: 'Vérification sécurité incendie',
          },
        },
        restored: {
          summary: 'Intervention restored',
          value: {
            message: 'Intervention restored',
            id: 1,
            label: 'Vérification sécurité incendie',
          },
        },
      },
    }),
    ApiNotFoundResponse(InterventionConfigSwagger.INTERVENTION_NOT_FOUND),
    ApiForbiddenResponse(InterventionConfigSwagger.INTERVENTION_FORBIDDEN),
  );
};

export const SwaggerInterventionTerminate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Terminate an intervention by id' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          terminatedById: {
            type: 'number',
            description: 'ID of the user who terminated the intervention',
            example: 1,
          },
        },
        required: ['terminatedById'],
      },
    }),
    ApiOkResponse({
      description: 'Intervention terminated successfully',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Intervention terminated successfully' },
          id: { type: 'number', example: 1 },
          label: { type: 'string', example: 'Vérification sécurité incendie' },
        },
      },
    }),
    ApiNotFoundResponse(InterventionConfigSwagger.INTERVENTION_NOT_FOUND),
    ApiForbiddenResponse(InterventionConfigSwagger.INTERVENTION_FORBIDDEN),
  );
};

// Intervention Type decorators
export const SwaggerInterventionTypeCreate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create an intervention type' }),
    ApiCreatedResponse(InterventionConfigSwagger.SUCCESS_INTERVENTION_TYPE_CREATE),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerInterventionTypeFindAll = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all intervention types' }),
    ApiOkResponsePaginated(InterventionType, { description: 'Intervention types list' }),
  );
};

export const SwaggerInterventionTypeFindOne = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get an intervention type by id' }),
    ApiOkResponse({ description: 'Intervention type', type: InterventionType }),
    ApiNotFoundResponse(InterventionConfigSwagger.INTERVENTION_TYPE_NOT_FOUND),
    ApiForbiddenResponse(InterventionConfigSwagger.INTERVENTION_TYPE_FORBIDDEN),
  );
};

export const SwaggerInterventionTypeUpdate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update an intervention type by id' }),
    ApiOkResponse(InterventionConfigSwagger.SUCCESS_INTERVENTION_TYPE_UPDATE),
    ApiNotFoundResponse(InterventionConfigSwagger.INTERVENTION_TYPE_NOT_FOUND),
    ApiForbiddenResponse(InterventionConfigSwagger.INTERVENTION_TYPE_FORBIDDEN),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerInterventionTypeUpdateState = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Archive or restore intervention type by id' }),
    ApiOkResponse({
      description: 'Intervention type state updated',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Intervention type archived' },
          id: { type: 'number', example: 1 },
          code: { type: 'string', example: 'regulatory_audit' },
        },
      },
      examples: {
        archived: {
          summary: 'Intervention type archived',
          value: {
            message: 'Intervention type archived',
            id: 1,
            code: 'regulatory_audit',
          },
        },
        restored: {
          summary: 'Intervention type restored',
          value: {
            message: 'Intervention type restored',
            id: 1,
            code: 'regulatory_audit',
          },
        },
      },
    }),
    ApiNotFoundResponse(InterventionConfigSwagger.INTERVENTION_TYPE_NOT_FOUND),
    ApiForbiddenResponse(InterventionConfigSwagger.INTERVENTION_TYPE_FORBIDDEN),
  );
};
