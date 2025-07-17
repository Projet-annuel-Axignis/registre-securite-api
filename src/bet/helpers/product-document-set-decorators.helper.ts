import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductDocumentSwaggerResponse } from '../types/product/product-document-swagger-response.types';

export const SwaggerProductDocumentUpload = () =>
  applyDecorators(
    ApiOperation({ summary: 'Upload a product document' }),
    ApiResponse({
      status: 201,
      description: 'Document uploaded successfully',
      type: ProductDocumentSwaggerResponse,
    }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 404, description: 'Document type or products not found' }),
    ApiResponse({ status: 409, description: 'Document with same serial number and version already exists' }),
  );

export const SwaggerProductDocumentFindOne = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get a product document by ID' }),
    ApiResponse({
      status: 200,
      description: 'Document retrieved successfully',
      type: ProductDocumentSwaggerResponse,
    }),
    ApiResponse({ status: 404, description: 'Document not found' }),
  );

export const SwaggerProductDocumentFindOneBySerialNumber = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get a product document by serial number' }),
    ApiResponse({
      status: 200,
      description: 'Document retrieved successfully',
      type: ProductDocumentSwaggerResponse,
    }),
    ApiResponse({ status: 404, description: 'Document not found' }),
  );

export const SwaggerProductDocumentFindAllByProduct = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get all documents for a specific product' }),
    ApiResponse({
      status: 200,
      description: 'Documents retrieved successfully',
      type: [ProductDocumentSwaggerResponse],
    }),
  );

export const SwaggerProductDocumentDownload = () =>
  applyDecorators(
    ApiOperation({ summary: 'Download a product document file' }),
    ApiResponse({ status: 200, description: 'File downloaded successfully' }),
    ApiResponse({ status: 404, description: 'Document or file not found' }),
  );

export const SwaggerProductDocumentUpdateStatus = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update document status' }),
    ApiResponse({
      status: 200,
      description: 'Document status updated successfully',
      type: ProductDocumentSwaggerResponse,
    }),
    ApiResponse({ status: 404, description: 'Document not found' }),
    ApiResponse({ status: 400, description: 'Invalid status' }),
  );

export const SwaggerProductDocumentSoftDelete = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete a product document' }),
    ApiResponse({ status: 200, description: 'Document deleted successfully' }),
    ApiResponse({ status: 404, description: 'Document not found' }),
  );

export const SwaggerProductDocumentValidateChecksum = () =>
  applyDecorators(
    ApiOperation({ summary: 'Validate document file checksum' }),
    ApiResponse({
      status: 200,
      description: 'Checksum validation result',
      schema: {
        type: 'object',
        properties: {
          isValid: { type: 'boolean' },
        },
      },
    }),
    ApiResponse({ status: 404, description: 'Document not found' }),
  );
