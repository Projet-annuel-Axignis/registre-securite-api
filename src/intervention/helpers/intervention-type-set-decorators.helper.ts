import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiOkResponsePaginated } from '@src/paginator/paginator.decorator';
import { InterventionType } from '../entities/intervention-type.entity';
import { InterventionTypeConfigSwagger } from './intervention-type-config-swagger.helper';

export const SwaggerInterventionTypeCreate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create an intervention type' }),
    ApiCreatedResponse(InterventionTypeConfigSwagger.SUCCESS_INTERVENTION_TYPE_CREATE),
    ApiConflictResponse(InterventionTypeConfigSwagger.INTERVENTION_TYPE_ALREADY_EXISTS),
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
    ApiOperation({ summary: 'Get an intervention type by code' }),
    ApiOkResponse({ description: 'Intervention type', type: InterventionType }),
    ApiNotFoundResponse(InterventionTypeConfigSwagger.INTERVENTION_TYPE_NOT_FOUND),
  );
};

export const SwaggerInterventionTypeUpdate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update an intervention type by code' }),
    ApiOkResponse(InterventionTypeConfigSwagger.SUCCESS_INTERVENTION_TYPE_UPDATE),
    ApiNotFoundResponse(InterventionTypeConfigSwagger.INTERVENTION_TYPE_NOT_FOUND),
    ApiConflictResponse(InterventionTypeConfigSwagger.INTERVENTION_TYPE_ALREADY_EXISTS),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerInterventionTypeDelete = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Delete an intervention type by code' }),
    ApiOkResponse({ description: 'Intervention type successfully deleted' }),
    ApiNotFoundResponse(InterventionTypeConfigSwagger.INTERVENTION_TYPE_NOT_FOUND),
    ApiConflictResponse(InterventionTypeConfigSwagger.INTERVENTION_TYPE_IN_USE),
  );
};
