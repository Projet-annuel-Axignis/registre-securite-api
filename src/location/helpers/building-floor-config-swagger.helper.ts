import { ApiResponseOptions } from '@nestjs/swagger';
import {
  SwaggerBuildingFloorExample,
  SwaggerBuildingFloorNotFound,
  SwaggerBuildingFloorNotOwned,
} from '../types/building-floor-swagger-response.types';

export class BuildingFloorConfigSwagger {
  static readonly SUCCESS_BUILDING_FLOOR_CREATE: ApiResponseOptions = {
    description: 'The building floor has been successfully created',
    type: SwaggerBuildingFloorExample,
  };

  static readonly SUCCESS_BUILDING_FLOOR_UPDATE: ApiResponseOptions = {
    description: 'The building floor has been successfully updated',
    type: SwaggerBuildingFloorExample,
  };

  static readonly BUILDING_FLOOR_NOT_FOUND: ApiResponseOptions = {
    description: 'Building floor not found',
    type: SwaggerBuildingFloorNotFound,
  };

  static readonly BUILDING_FLOOR_NOT_OWNED: ApiResponseOptions = {
    description: 'Building floor not owned by user',
    type: SwaggerBuildingFloorNotOwned,
  };
}
