import { ApiResponseOptions } from '@nestjs/swagger';
import {
  SwaggerSiteExample,
  SwaggerSiteForbidden,
  SwaggerSiteNotFound,
  SwaggerSiteUpdatedResponse,
} from '../types/site-swagger-response.types';

export class SiteConfigSwagger {
  static readonly SUCCESS_SITE_CREATE: ApiResponseOptions = {
    description: 'The site has been successfully created',
    type: SwaggerSiteExample,
  };

  static readonly SUCCESS_SITE_UPDATE: ApiResponseOptions = {
    description: 'The site has been successfully updated',
    type: SwaggerSiteExample,
  };

  static readonly SUCCESS_SITE_STATE_UPDATE: ApiResponseOptions = {
    description: 'The site state has been successfully updated',
    type: SwaggerSiteUpdatedResponse,
  };

  static readonly SITE_NOT_FOUND: ApiResponseOptions = {
    description: 'Site not found',
    type: SwaggerSiteNotFound,
  };

  static readonly SITE_FORBIDDEN: ApiResponseOptions = {
    description: 'Access forbidden to site',
    type: SwaggerSiteForbidden,
  };
}
