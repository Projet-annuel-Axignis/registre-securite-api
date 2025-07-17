import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiOkResponsePaginated } from '@paginator/paginator.decorator';
import { Site } from '../entities/site.entity';
import { SiteConfigSwagger } from './site-config-swagger.helper';

export const SwaggerSiteCreate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a site' }),
    ApiCreatedResponse(SiteConfigSwagger.SUCCESS_SITE_CREATE),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerSiteFindAll = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all sites' }),
    ApiOkResponsePaginated(Site, { description: 'Sites list' }),
  );
};

export const SwaggerSiteFindOne = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get a site by id' }),
    ApiOkResponse({ description: 'Site', type: Site }),
    ApiNotFoundResponse(SiteConfigSwagger.SITE_NOT_FOUND),
    ApiForbiddenResponse(SiteConfigSwagger.SITE_FORBIDDEN),
  );
};

export const SwaggerSiteUpdate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update a site by id' }),
    ApiOkResponse(SiteConfigSwagger.SUCCESS_SITE_UPDATE),
    ApiNotFoundResponse(SiteConfigSwagger.SITE_NOT_FOUND),
    ApiForbiddenResponse(SiteConfigSwagger.SITE_FORBIDDEN),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerSiteUpdateState = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Archive or restore site by id' }),
    ApiOkResponse({
      description: 'Site state updated',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Site archived' },
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Centre commercial la Part Dieu' },
        },
      },
      examples: {
        archived: {
          summary: 'Site archived',
          value: {
            message: 'Site archived',
            id: 1,
            name: 'Centre commercial la Part Dieu',
          },
        },
        restored: {
          summary: 'Site restored',
          value: {
            message: 'Site restored',
            id: 1,
            name: 'Centre commercial la Part Dieu',
          },
        },
      },
    }),
    ApiNotFoundResponse(SiteConfigSwagger.SITE_NOT_FOUND),
    ApiForbiddenResponse(SiteConfigSwagger.SITE_FORBIDDEN),
  );
};
