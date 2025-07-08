import { ApiResponseOptions } from '@nestjs/swagger';
import {
  SwaggerCompanyExample,
  SwaggerCompanyNotFound,
  SwaggerCompanyUpdatedResponse,
} from '../types/company-swagger-response.types';

export class CompanyConfigSwagger {
  static readonly SUCCESS_COMPANY_CREATE: ApiResponseOptions = {
    description: 'The company has been successfully created',
    type: SwaggerCompanyExample,
  };

  static readonly SUCCESS_COMPANY_UPDATE: ApiResponseOptions = {
    description: 'The company has been successfully updated',
    type: SwaggerCompanyExample,
  };

  static readonly SUCCESS_COMPANY_STATE_UPDATE: ApiResponseOptions = {
    description: 'The company state has been successfully updated',
    type: SwaggerCompanyUpdatedResponse,
  };

  static readonly COMPANY_NOT_FOUND: ApiResponseOptions = {
    description: 'Company not found',
    type: SwaggerCompanyNotFound,
  };
}
