import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import {
  BrandCreateSwaggerResponse,
  BrandFindAllSwaggerResponse,
  BrandFindOneSwaggerResponse,
  BrandRestoreSwaggerResponse,
  BrandSoftDeleteSwaggerResponse,
  BrandUpdateSwaggerResponse,
} from '../types/product/brand-swagger-response.types';

// Brand Swagger Decorators
export const SwaggerBrandCreate = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create a new brand' }),
    ApiResponse({
      status: 201,
      description: 'Brand created successfully',
      type: BrandCreateSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerBrandFindAll = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get all brands with pagination and filtering' }),
    ApiResponse({
      status: 200,
      description: 'Brands retrieved successfully',
      type: BrandFindAllSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerBrandFindOne = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get a brand by ID' }),
    ApiResponse({
      status: 200,
      description: 'Brand retrieved successfully',
      type: BrandFindOneSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerBrandFindOneBySerialNumber = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get a brand by serial number' }),
    ApiResponse({
      status: 200,
      description: 'Brand retrieved successfully',
      type: BrandFindOneSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerBrandUpdate = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update a brand' }),
    ApiResponse({
      status: 200,
      description: 'Brand updated successfully',
      type: BrandUpdateSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerBrandSoftDelete = () =>
  applyDecorators(
    ApiOperation({ summary: 'Soft delete a brand' }),
    ApiResponse({
      status: 200,
      description: 'Brand soft deleted successfully',
      type: BrandSoftDeleteSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerBrandRestore = () =>
  applyDecorators(
    ApiOperation({ summary: 'Restore a soft deleted brand' }),
    ApiResponse({
      status: 200,
      description: 'Brand restored successfully',
      type: BrandRestoreSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );
