import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  ReportFileWithDetailsResponse,
  ReportListWithEquipmentTypesResponse,
  ReportWithEquipmentTypesResponse,
} from '../types/report-swagger-response.types';
import { ReportConfigSwagger } from './report-config-swagger.helper';

// Report decorators
export const SwaggerReportCreate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a report' }),
    ApiCreatedResponse(ReportConfigSwagger.SUCCESS_REPORT_CREATE),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
    ApiNotFoundResponse({ description: 'Report type, typology, parts, or files not found' }),
  );
};

export const SwaggerReportFindAll = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all reports' }),
    ApiOkResponse({
      description: 'Reports list with equipment types from BET API',
      type: ReportListWithEquipmentTypesResponse,
    }),
  );
};

export const SwaggerReportFindOne = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get a report by id' }),
    ApiOkResponse({
      description: 'Report with equipment types from BET API',
      type: ReportWithEquipmentTypesResponse,
    }),
    ApiNotFoundResponse(ReportConfigSwagger.REPORT_NOT_FOUND),
    ApiForbiddenResponse(ReportConfigSwagger.REPORT_FORBIDDEN),
  );
};

export const SwaggerReportUpdate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update a report by id' }),
    ApiOkResponse(ReportConfigSwagger.SUCCESS_REPORT_UPDATE),
    ApiNotFoundResponse(ReportConfigSwagger.REPORT_NOT_FOUND),
    ApiForbiddenResponse(ReportConfigSwagger.REPORT_FORBIDDEN),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerReportUpdateState = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Archive or restore report by id' }),
    ApiOkResponse({
      description: 'Report state updated',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Report archived' },
          id: { type: 'number', example: 1 },
          label: { type: 'string', example: 'Rapport de sécurité' },
        },
      },
      examples: {
        archived: {
          summary: 'Report archived',
          value: {
            message: 'Report archived',
            id: 1,
            label: 'Rapport de sécurité',
          },
        },
        restored: {
          summary: 'Report restored',
          value: {
            message: 'Report restored',
            id: 1,
            label: 'Rapport de sécurité',
          },
        },
      },
    }),
    ApiNotFoundResponse(ReportConfigSwagger.REPORT_NOT_FOUND),
    ApiForbiddenResponse(ReportConfigSwagger.REPORT_FORBIDDEN),
  );
};

export const SwaggerReportAttachFile = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Attach a file to a report' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
            description: 'File to upload (PDF, DOC, DOCX, JPG, JPEG, PNG) - Max 10MB',
          },
          title: {
            type: 'string',
            description: 'Title of the file',
            example: 'Photo de la non-conformité',
          },
          description: {
            type: 'string',
            description: 'Description of the file',
            example: 'Photo montrant la non-conformité détectée dans la zone A',
          },
          version: {
            type: 'number',
            description: 'Version number of the file',
            example: 1,
            minimum: 1,
          },
        },
        required: ['file', 'title', 'version'],
      },
    }),
    ApiCreatedResponse(ReportConfigSwagger.SUCCESS_REPORT_FILE_ATTACH),
    ApiNotFoundResponse(ReportConfigSwagger.REPORT_NOT_FOUND),
    ApiBadRequestResponse({ description: 'Invalid file format or size' }),
  );
};

export const SwaggerReportGetFiles = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all files attached to a report' }),
    ApiOkResponse({
      description: 'Report files with file details from BET API',
      type: [ReportFileWithDetailsResponse],
    }),
    ApiNotFoundResponse(ReportConfigSwagger.REPORT_NOT_FOUND),
  );
};

export const SwaggerReportRemoveFile = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Remove a file from a report' }),
    ApiOkResponse({ description: 'File removed successfully' }),
    ApiNotFoundResponse(ReportConfigSwagger.REPORT_FILE_NOT_FOUND),
  );
};
