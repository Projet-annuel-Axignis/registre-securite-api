import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const SwaggerPartUpdateState = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Update part state (archive/restore)',
      description:
        'Toggles the archive state of a part. If the part is archived, it will be restored. If it is active, it will be archived.',
    }),
    ApiResponse({
      status: 200,
      description: 'The part state has been successfully updated.',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Part archived' },
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Main Building Part A' },
        },
      },
      examples: {
        archived: {
          summary: 'Part archived',
          value: {
            message: 'Part archived',
            id: 1,
            name: 'Main Building Part A',
          },
        },
        restored: {
          summary: 'Part restored',
          value: {
            message: 'Part restored',
            id: 1,
            name: 'Main Building Part A',
          },
        },
      },
    }),
    ApiResponse({ status: 400, description: 'Bad request.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
    ApiResponse({ status: 404, description: 'Part not found.' }),
  );
