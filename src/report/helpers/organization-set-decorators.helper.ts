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
import { Organization } from '../entities/organization.entity';
import { OrganizationConfigSwagger } from './organization-config-swagger.helper';

export const SwaggerOrganizationCreate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create an organization' }),
    ApiCreatedResponse(OrganizationConfigSwagger.SUCCESS_ORGANIZATION_CREATE),
    ApiConflictResponse(OrganizationConfigSwagger.ORGANIZATION_ALREADY_EXISTS),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerOrganizationFindAll = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all organizations' }),
    ApiOkResponsePaginated(Organization, { description: 'Organizations list' }),
  );
};

export const SwaggerOrganizationFindOne = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get an organization by name' }),
    ApiOkResponse({ description: 'Organization', type: Organization }),
    ApiNotFoundResponse(OrganizationConfigSwagger.ORGANIZATION_NOT_FOUND),
  );
};

export const SwaggerOrganizationUpdate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update an organization by name' }),
    ApiOkResponse(OrganizationConfigSwagger.SUCCESS_ORGANIZATION_UPDATE),
    ApiNotFoundResponse(OrganizationConfigSwagger.ORGANIZATION_NOT_FOUND),
    ApiConflictResponse(OrganizationConfigSwagger.ORGANIZATION_ALREADY_EXISTS),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerOrganizationDelete = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Delete an organization by name' }),
    ApiOkResponse({ description: 'Organization successfully deleted' }),
    ApiNotFoundResponse(OrganizationConfigSwagger.ORGANIZATION_NOT_FOUND),
    ApiConflictResponse(OrganizationConfigSwagger.ORGANIZATION_IN_USE),
  );
};
