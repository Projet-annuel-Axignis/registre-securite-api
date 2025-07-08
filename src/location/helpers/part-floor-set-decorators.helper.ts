import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const SwaggerPartFloorUpdateState = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Update part floor state (archive/restore)',
      description:
        'Toggles the archive state of a part floor. If the part floor is archived, it will be restored. If it is active, it will be archived.',
    }),
    ApiResponse({
      status: 200,
      description: 'The part floor state has been successfully updated.',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Part floor archived' },
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Ground Floor' },
        },
      },
      examples: {
        archived: {
          summary: 'Part floor archived',
          value: {
            message: 'Part floor archived',
            id: 1,
            name: 'Ground Floor',
          },
        },
        restored: {
          summary: 'Part floor restored',
          value: {
            message: 'Part floor restored',
            id: 1,
            name: 'Ground Floor',
          },
        },
      },
    }),
    ApiResponse({ status: 400, description: 'Bad request.' }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
    ApiResponse({ status: 404, description: 'Part floor not found.' }),
  );
