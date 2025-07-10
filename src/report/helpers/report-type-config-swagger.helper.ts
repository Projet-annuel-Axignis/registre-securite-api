import { ApiResponseOptions } from '@nestjs/swagger';
import {
  SwaggerReportTypeAlreadyExists,
  SwaggerReportTypeExample,
  SwaggerReportTypeInUse,
  SwaggerReportTypeNotFound,
} from '../types/report-type-swagger-response.types';

export class ReportTypeConfigSwagger {
  static readonly SUCCESS_REPORT_TYPE_CREATE: ApiResponseOptions = {
    description: 'The report type has been successfully created',
    type: SwaggerReportTypeExample,
  };

  static readonly SUCCESS_REPORT_TYPE_UPDATE: ApiResponseOptions = {
    description: 'The report type has been successfully updated',
    type: SwaggerReportTypeExample,
  };

  static readonly REPORT_TYPE_NOT_FOUND: ApiResponseOptions = {
    description: 'Report type not found',
    type: SwaggerReportTypeNotFound,
  };

  static readonly REPORT_TYPE_ALREADY_EXISTS: ApiResponseOptions = {
    description: 'Report type already exists',
    type: SwaggerReportTypeAlreadyExists,
  };

  static readonly REPORT_TYPE_IN_USE: ApiResponseOptions = {
    description: 'Report type is being used and cannot be deleted',
    type: SwaggerReportTypeInUse,
  };
}
