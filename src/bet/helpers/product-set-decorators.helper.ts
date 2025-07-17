import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import {
  ProductCreateSwaggerResponse,
  ProductFindAllSwaggerResponse,
  ProductFindOneSwaggerResponse,
  ProductRestoreSwaggerResponse,
  ProductSoftDeleteSwaggerResponse,
  ProductUpdateSwaggerResponse,
} from '../types/product/product-swagger-response.types';

export const SwaggerProductCreate = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Create a new product',
      description: 'Create a new product with the provided data',
    }),
    ApiResponse({
      status: 201,
      description: 'Product created successfully',
      type: ProductCreateSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerProductFindAll = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get all products',
      description: 'Retrieve a paginated list of all products with optional filtering and sorting',
    }),
    ApiResponse({
      status: 200,
      description: 'Products retrieved successfully',
      type: ProductFindAllSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerProductFindOne = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get product by ID',
      description: 'Retrieve a specific product by its unique identifier',
    }),
    ApiResponse({
      status: 200,
      description: 'Product retrieved successfully',
      type: ProductFindOneSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerProductUpdate = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Update product',
      description: 'Update an existing product with the provided data',
    }),
    ApiResponse({
      status: 200,
      description: 'Product updated successfully',
      type: ProductUpdateSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerProductSoftDelete = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Soft delete product',
      description: 'Soft delete a product (mark as deleted without removing from database)',
    }),
    ApiResponse({
      status: 200,
      description: 'Product soft deleted successfully',
      type: ProductSoftDeleteSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerProductRestore = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Restore product',
      description: 'Restore a soft deleted product',
    }),
    ApiResponse({
      status: 200,
      description: 'Product restored successfully',
      type: ProductRestoreSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );
