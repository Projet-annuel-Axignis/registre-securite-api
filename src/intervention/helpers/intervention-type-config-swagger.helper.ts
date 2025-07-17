import { ApiResponseOptions } from '@nestjs/swagger';
import {
  SwaggerInterventionTypeAlreadyExists,
  SwaggerInterventionTypeExample,
  SwaggerInterventionTypeInUse,
  SwaggerInterventionTypeNotFound,
} from '../types/intervention-type-swagger-response.types';

export class InterventionTypeConfigSwagger {
  static readonly SUCCESS_INTERVENTION_TYPE_CREATE: ApiResponseOptions = {
    description: 'The intervention type has been successfully created',
    type: SwaggerInterventionTypeExample,
  };

  static readonly SUCCESS_INTERVENTION_TYPE_UPDATE: ApiResponseOptions = {
    description: 'The intervention type has been successfully updated',
    type: SwaggerInterventionTypeExample,
  };

  static readonly INTERVENTION_TYPE_NOT_FOUND: ApiResponseOptions = {
    description: 'Intervention type not found',
    type: SwaggerInterventionTypeNotFound,
  };

  static readonly INTERVENTION_TYPE_ALREADY_EXISTS: ApiResponseOptions = {
    description: 'Intervention type already exists',
    type: SwaggerInterventionTypeAlreadyExists,
  };

  static readonly INTERVENTION_TYPE_IN_USE: ApiResponseOptions = {
    description: 'Intervention type is being used and cannot be deleted',
    type: SwaggerInterventionTypeInUse,
  };
}
