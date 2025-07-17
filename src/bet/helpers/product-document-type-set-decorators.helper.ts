import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import {
  ProductDocumentTypeCreateSwaggerResponse,
  ProductDocumentTypeFindAllSwaggerResponse,
  ProductDocumentTypeFindOneSwaggerResponse,
  ProductDocumentTypeRestoreSwaggerResponse,
  ProductDocumentTypeSoftDeleteSwaggerResponse,
  ProductDocumentTypeUpdateSwaggerResponse,
} from '../types/product/product-document-type-swagger-response.types';

// Product Document Type Swagger Decorators
export const SwaggerProductDocumentTypeCreate = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create a new product document type' }),
    ApiResponse({
      status: 201,
      description: 'Product document type created successfully',
      type: ProductDocumentTypeCreateSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerProductDocumentTypeFindAll = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get all product document types with pagination and filtering' }),
    ApiResponse({
      status: 200,
      description: 'Product document types retrieved successfully',
      type: ProductDocumentTypeFindAllSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerProductDocumentTypeFindOne = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get a product document type by ID' }),
    ApiResponse({
      status: 200,
      description: 'Product document type retrieved successfully',
      type: ProductDocumentTypeFindOneSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerProductDocumentTypeFindOneBySerialNumber = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get a product document type by serial number' }),
    ApiResponse({
      status: 200,
      description: 'Product document type retrieved successfully',
      type: ProductDocumentTypeFindOneSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerProductDocumentTypeUpdate = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update a product document type' }),
    ApiResponse({
      status: 200,
      description: 'Product document type updated successfully',
      type: ProductDocumentTypeUpdateSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerProductDocumentTypeSoftDelete = () =>
  applyDecorators(
    ApiOperation({ summary: 'Soft delete a product document type' }),
    ApiResponse({
      status: 200,
      description: 'Product document type soft deleted successfully',
      type: ProductDocumentTypeSoftDeleteSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );

export const SwaggerProductDocumentTypeRestore = () =>
  applyDecorators(
    ApiOperation({ summary: 'Restore a soft deleted product document type' }),
    ApiResponse({
      status: 200,
      description: 'Product document type restored successfully',
      type: ProductDocumentTypeRestoreSwaggerResponse,
    }),
    SwaggerFailureResponse(),
  );
