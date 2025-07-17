import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiOkResponsePaginated } from '@paginator/paginator.decorator';
import { Company } from '../entities/company.entity';
import { CompanyConfigSwagger } from './company-config-swagger.helper';

export const SwaggerCompanyCreate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a company' }),
    ApiCreatedResponse(CompanyConfigSwagger.SUCCESS_COMPANY_CREATE),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerCompanyFindAll = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all companies' }),
    ApiOkResponsePaginated(Company, { description: 'Companies list' }),
  );
};

export const SwaggerCompanyFindOne = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get a company by id' }),
    ApiOkResponse({ description: 'Company', type: Company }),
    ApiNotFoundResponse(CompanyConfigSwagger.COMPANY_NOT_FOUND),
  );
};

export const SwaggerCompanyUpdate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update a company by id' }),
    ApiOkResponse(CompanyConfigSwagger.SUCCESS_COMPANY_UPDATE),
    ApiNotFoundResponse(CompanyConfigSwagger.COMPANY_NOT_FOUND),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerCompanyUpdateState = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Archive or restore company by id' }),
    ApiOkResponse({
      description: 'Company state updated',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Company archived' },
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Société Axignis' },
        },
      },
      examples: {
        archived: {
          summary: 'Company archived',
          value: {
            message: 'Company archived',
            id: 1,
            name: 'Société Axignis',
          },
        },
        restored: {
          summary: 'Company restored',
          value: {
            message: 'Company restored',
            id: 1,
            name: 'Société Axignis',
          },
        },
      },
    }),
    ApiNotFoundResponse(CompanyConfigSwagger.COMPANY_NOT_FOUND),
  );
};
