import { ApiResponseOptions } from '@nestjs/swagger';
import { ReportFile } from '../entities/report-file.entity';
import { Report } from '../entities/report.entity';

export class ReportConfigSwagger {
  // Success responses
  static readonly SUCCESS_REPORT_CREATE: ApiResponseOptions = {
    description: 'Report created successfully',
    type: Report,
  };

  static readonly SUCCESS_REPORT_UPDATE: ApiResponseOptions = {
    description: 'Report updated successfully',
    type: Report,
  };

  static readonly SUCCESS_REPORT_FILE_ATTACH: ApiResponseOptions = {
    description: 'File attached to report successfully',
    type: ReportFile,
  };

  // Error responses
  static readonly REPORT_NOT_FOUND: ApiResponseOptions = {
    description: 'Report not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Report not found' },
        error: { type: 'string', example: 'Not Found' },
        details: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
          },
        },
      },
    },
  };

  static readonly REPORT_FORBIDDEN: ApiResponseOptions = {
    description: 'Access forbidden',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Access forbidden' },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  };

  static readonly REPORT_IN_USE: ApiResponseOptions = {
    description: 'Cannot delete report as it has observations',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'Cannot delete report as it has observations' },
        error: { type: 'string', example: 'Conflict' },
        details: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            observationsCount: { type: 'number', example: 3 },
          },
        },
      },
    },
  };

  static readonly FILE_NOT_FOUND: ApiResponseOptions = {
    description: 'File not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'File not found' },
        error: { type: 'string', example: 'Not Found' },
        details: {
          type: 'object',
          properties: {
            fileId: { type: 'number', example: 1 },
          },
        },
      },
    },
  };

  static readonly REPORT_FILE_NOT_FOUND: ApiResponseOptions = {
    description: 'Report file association not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Report file not found' },
        error: { type: 'string', example: 'Not Found' },
        details: {
          type: 'object',
          properties: {
            reportId: { type: 'number', example: 1 },
            fileId: { type: 'number', example: 1 },
          },
        },
      },
    },
  };
}
