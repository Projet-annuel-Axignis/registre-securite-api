import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiOkResponsePaginated } from '@paginator/paginator.decorator';
import { BuildingFloor } from '../entities/building-floor.entity';
import { BuildingFloorConfigSwagger } from './building-floor-config-swagger.helper';

export const SwaggerBuildingFloorCreate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a building floor' }),
    ApiCreatedResponse(BuildingFloorConfigSwagger.SUCCESS_BUILDING_FLOOR_CREATE),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerBuildingFloorFindAll = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all building floors' }),
    ApiOkResponsePaginated(BuildingFloor, { description: 'Building floors list' }),
  );
};

export const SwaggerBuildingFloorFindOne = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get a building floor by id' }),
    ApiOkResponse({ description: 'Building floor', type: BuildingFloor }),
    ApiNotFoundResponse(BuildingFloorConfigSwagger.BUILDING_FLOOR_NOT_FOUND),
  );
};

export const SwaggerBuildingFloorUpdate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update a building floor by id' }),
    ApiOkResponse(BuildingFloorConfigSwagger.SUCCESS_BUILDING_FLOOR_UPDATE),
    ApiNotFoundResponse(BuildingFloorConfigSwagger.BUILDING_FLOOR_NOT_FOUND),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerBuildingFloorDelete = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a building floor by id' }),
    ApiOkResponse({ description: 'Building floor successfully deleted' }),
    ApiNotFoundResponse(BuildingFloorConfigSwagger.BUILDING_FLOOR_NOT_FOUND),
  );
};
