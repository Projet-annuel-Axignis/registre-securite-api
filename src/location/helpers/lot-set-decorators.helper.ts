import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiOkResponsePaginated } from '@paginator/paginator.decorator';
import { Lot } from '../entities/lot.entity';
import { LotConfigSwagger } from './lot-config-swagger.helper';

export const SwaggerLotCreate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a lot' }),
    ApiCreatedResponse(LotConfigSwagger.SUCCESS_LOT_CREATE),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerLotFindAll = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all lots' }),
    ApiOkResponsePaginated(Lot, { description: 'Lots list' }),
  );
};

export const SwaggerLotFindOne = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get a lot by id' }),
    ApiOkResponse({ description: 'Lot', type: Lot }),
    ApiNotFoundResponse(LotConfigSwagger.LOT_NOT_FOUND),
  );
};

export const SwaggerLotUpdate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update a lot by id' }),
    ApiOkResponse(LotConfigSwagger.SUCCESS_LOT_UPDATE),
    ApiNotFoundResponse(LotConfigSwagger.LOT_NOT_FOUND),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerLotDelete = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a lot by id' }),
    ApiOkResponse({ description: 'Lot successfully deleted' }),
    ApiNotFoundResponse(LotConfigSwagger.LOT_NOT_FOUND),
  );
};

export const SwaggerLotUpdateState = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Archive or restore lot by id' }),
    ApiOkResponse({
      description: 'Lot state updated',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Lot archived' },
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Lot A' },
        },
      },
      examples: {
        archived: {
          summary: 'Lot archived',
          value: {
            message: 'Lot archived',
            id: 1,
            name: 'Lot A',
          },
        },
        restored: {
          summary: 'Lot restored',
          value: {
            message: 'Lot restored',
            id: 1,
            name: 'Lot A',
          },
        },
      },
    }),
    ApiNotFoundResponse(LotConfigSwagger.LOT_NOT_FOUND),
  );
};
