import { ApiResponseOptions } from '@nestjs/swagger';
import { SwaggerLotExample, SwaggerLotNotFound, SwaggerLotNotOwned } from '../types/lot-swagger-response.types';

export class LotConfigSwagger {
  static readonly SUCCESS_LOT_CREATE: ApiResponseOptions = {
    description: 'The lot has been successfully created',
    type: SwaggerLotExample,
  };

  static readonly SUCCESS_LOT_UPDATE: ApiResponseOptions = {
    description: 'The lot has been successfully updated',
    type: SwaggerLotExample,
  };

  static readonly LOT_NOT_FOUND: ApiResponseOptions = {
    description: 'Lot not found',
    type: SwaggerLotNotFound,
  };

  static readonly LOT_NOT_OWNED: ApiResponseOptions = {
    description: 'Lot not owned by user',
    type: SwaggerLotNotOwned,
  };
}
