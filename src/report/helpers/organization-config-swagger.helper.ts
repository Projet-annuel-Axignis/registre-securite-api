import { ApiResponseOptions } from '@nestjs/swagger';
import {
  SwaggerOrganizationAlreadyExists,
  SwaggerOrganizationExample,
  SwaggerOrganizationInUse,
  SwaggerOrganizationNotFound,
} from '../types/organization-swagger-response.types';

export class OrganizationConfigSwagger {
  static readonly SUCCESS_ORGANIZATION_CREATE: ApiResponseOptions = {
    description: 'The organization has been successfully created',
    type: SwaggerOrganizationExample,
  };

  static readonly SUCCESS_ORGANIZATION_UPDATE: ApiResponseOptions = {
    description: 'The organization has been successfully updated',
    type: SwaggerOrganizationExample,
  };

  static readonly ORGANIZATION_NOT_FOUND: ApiResponseOptions = {
    description: 'Organization not found',
    type: SwaggerOrganizationNotFound,
  };

  static readonly ORGANIZATION_ALREADY_EXISTS: ApiResponseOptions = {
    description: 'Organization already exists',
    type: SwaggerOrganizationAlreadyExists,
  };

  static readonly ORGANIZATION_IN_USE: ApiResponseOptions = {
    description: 'Organization is being used and cannot be deleted',
    type: SwaggerOrganizationInUse,
  };
}
