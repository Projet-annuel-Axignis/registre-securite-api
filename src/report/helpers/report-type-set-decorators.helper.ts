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
import { ReportType } from '../entities/report-type.entity';
import { ReportTypeConfigSwagger } from './report-type-config-swagger.helper';

export const SwaggerReportTypeCreate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a report type' }),
    ApiCreatedResponse(ReportTypeConfigSwagger.SUCCESS_REPORT_TYPE_CREATE),
    ApiConflictResponse(ReportTypeConfigSwagger.REPORT_TYPE_ALREADY_EXISTS),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerReportTypeFindAll = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all report types' }),
    ApiOkResponsePaginated(ReportType, { description: 'Report types list' }),
  );
};

export const SwaggerReportTypeFindOne = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get a report type by code' }),
    ApiOkResponse({ description: 'Report type', type: ReportType }),
    ApiNotFoundResponse(ReportTypeConfigSwagger.REPORT_TYPE_NOT_FOUND),
  );
};

export const SwaggerReportTypeUpdate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update a report type by code' }),
    ApiOkResponse(ReportTypeConfigSwagger.SUCCESS_REPORT_TYPE_UPDATE),
    ApiNotFoundResponse(ReportTypeConfigSwagger.REPORT_TYPE_NOT_FOUND),
    ApiConflictResponse(ReportTypeConfigSwagger.REPORT_TYPE_ALREADY_EXISTS),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerReportTypeDelete = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a report type by code' }),
    ApiOkResponse({ description: 'Report type successfully deleted' }),
    ApiNotFoundResponse(ReportTypeConfigSwagger.REPORT_TYPE_NOT_FOUND),
    ApiConflictResponse(ReportTypeConfigSwagger.REPORT_TYPE_IN_USE),
  );
};
