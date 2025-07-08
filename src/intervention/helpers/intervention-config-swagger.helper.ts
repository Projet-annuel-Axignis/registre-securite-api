import { ApiResponseOptions } from '@nestjs/swagger';
import {
  SwaggerInterventionExample,
  SwaggerInterventionForbidden,
  SwaggerInterventionNotFound,
  SwaggerInterventionTypeExample,
  SwaggerInterventionTypeForbidden,
  SwaggerInterventionTypeNotFound,
  SwaggerInterventionTypeUpdatedResponse,
  SwaggerInterventionUpdatedResponse,
} from '../types/intervention-swagger-response.types';

export class InterventionConfigSwagger {
  static readonly SUCCESS_INTERVENTION_CREATE: ApiResponseOptions = {
    description: 'The intervention has been successfully created',
    type: SwaggerInterventionExample,
  };

  static readonly SUCCESS_INTERVENTION_UPDATE: ApiResponseOptions = {
    description: 'The intervention has been successfully updated',
    type: SwaggerInterventionExample,
  };

  static readonly SUCCESS_INTERVENTION_STATE_UPDATE: ApiResponseOptions = {
    description: 'The intervention state has been successfully updated',
    type: SwaggerInterventionUpdatedResponse,
  };

  static readonly INTERVENTION_NOT_FOUND: ApiResponseOptions = {
    description: 'Intervention not found',
    type: SwaggerInterventionNotFound,
  };

  static readonly INTERVENTION_FORBIDDEN: ApiResponseOptions = {
    description: 'Access forbidden to intervention',
    type: SwaggerInterventionForbidden,
  };

  static readonly SUCCESS_INTERVENTION_TYPE_CREATE: ApiResponseOptions = {
    description: 'The intervention type has been successfully created',
    type: SwaggerInterventionTypeExample,
  };

  static readonly SUCCESS_INTERVENTION_TYPE_UPDATE: ApiResponseOptions = {
    description: 'The intervention type has been successfully updated',
    type: SwaggerInterventionTypeExample,
  };

  static readonly SUCCESS_INTERVENTION_TYPE_STATE_UPDATE: ApiResponseOptions = {
    description: 'The intervention type state has been successfully updated',
    type: SwaggerInterventionTypeUpdatedResponse,
  };

  static readonly INTERVENTION_TYPE_NOT_FOUND: ApiResponseOptions = {
    description: 'Intervention type not found',
    type: SwaggerInterventionTypeNotFound,
  };

  static readonly INTERVENTION_TYPE_FORBIDDEN: ApiResponseOptions = {
    description: 'Access forbidden to intervention type',
    type: SwaggerInterventionTypeForbidden,
  };
}
