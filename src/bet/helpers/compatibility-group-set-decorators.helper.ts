import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import {
  CompatibilityGroupCreateSwaggerResponse,
  CompatibilityGroupFindAllSwaggerResponse,
  CompatibilityGroupFindOneSwaggerResponse,
  CompatibilityGroupRestoreSwaggerResponse,
  CompatibilityGroupSoftDeleteSwaggerResponse,
  CompatibilityGroupUpdateSwaggerResponse,
} from '../types/product/compatibility-group-swagger-response.types';

// Compatibility Group Swagger Decorators
export const SwaggerCompatibilityGroupCreate = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create a new compatibility group' }),
    ApiResponse({
      status: 201,
      description: 'Compatibility group created successfully',
      type: CompatibilityGroupCreateSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerCompatibilityGroupFindAll = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get all compatibility groups with pagination and filtering' }),
    ApiResponse({
      status: 200,
      description: 'Compatibility groups retrieved successfully',
      type: CompatibilityGroupFindAllSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerCompatibilityGroupFindOne = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get a compatibility group by ID' }),
    ApiResponse({
      status: 200,
      description: 'Compatibility group retrieved successfully',
      type: CompatibilityGroupFindOneSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerCompatibilityGroupUpdate = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update a compatibility group' }),
    ApiResponse({
      status: 200,
      description: 'Compatibility group updated successfully',
      type: CompatibilityGroupUpdateSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerCompatibilityGroupSoftDelete = () =>
  applyDecorators(
    ApiOperation({ summary: 'Soft delete a compatibility group' }),
    ApiResponse({
      status: 200,
      description: 'Compatibility group soft deleted successfully',
      type: CompatibilityGroupSoftDeleteSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerCompatibilityGroupRestore = () =>
  applyDecorators(
    ApiOperation({ summary: 'Restore a soft deleted compatibility group' }),
    ApiResponse({
      status: 200,
      description: 'Compatibility group restored successfully',
      type: CompatibilityGroupRestoreSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );
