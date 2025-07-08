import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { SwaggerBuildingExample, SwaggerBuildingNotFound } from '../types/building-swagger-response.types';

export const SwaggerBuildingFindAll = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all buildings' }),
    ApiOkResponse({
      description: 'Buildings list',
      schema: {
        type: 'object',
        properties: {
          offset: { type: 'number', example: 0 },
          limit: { type: 'number', example: 20 },
          sortOrder: { type: 'string', example: 'desc' },
          sortField: { type: 'string', example: 'createdAt' },
          search: { type: 'string', example: null },
          filterField: { type: 'string', example: null },
          filterOp: { type: 'string', example: null },
          filter: { type: 'string', example: null },
          currentResults: { type: 'number', example: 2 },
          totalResults: { type: 'number', example: 2 },
          results: {
            type: 'array',
            items: { $ref: '#/components/schemas/SwaggerBuildingExample' },
          },
        },
      },
      examples: {
        buildings: {
          summary: 'Buildings list example',
          value: {
            offset: 0,
            limit: 20,
            sortOrder: 'desc',
            sortField: 'createdAt',
            search: null,
            filterField: null,
            filterOp: null,
            filter: null,
            currentResults: 2,
            totalResults: 2,
            results: [
              {
                id: 1,
                name: 'Bâtiment A',
                createdAt: '2024-01-15T10:30:00.000Z',
                updatedAt: '2024-01-15T10:30:00.000Z',
                deletedAt: null,
                site: {
                  id: 1,
                  name: 'Site Principal',
                  address: '123 Rue de la Paix',
                  city: 'Paris',
                  postalCode: '75001',
                  country: 'France',
                  createdAt: '2024-01-15T10:30:00.000Z',
                  updatedAt: '2024-01-15T10:30:00.000Z',
                  deletedAt: null,
                },
                typologies: [
                  {
                    code: 'RES',
                    name: 'Résidentiel',
                    description: 'Bâtiment à usage résidentiel',
                  },
                ],
                ighClasses: [
                  {
                    code: 'IGH1',
                    name: 'IGH 1',
                    description: 'Immeuble de Grande Hauteur classe 1',
                  },
                ],
                erpCategory: {
                  code: 'ERP1',
                  name: 'ERP Type 1',
                  description: 'Établissement Recevant du Public Type 1',
                },
                parts: [
                  {
                    id: 1,
                    name: 'Partie A',
                    type: 'COMMON',
                    createdAt: '2024-01-15T10:30:00.000Z',
                    updatedAt: '2024-01-15T10:30:00.000Z',
                    deletedAt: null,
                  },
                ],
                BuildingFloors: [
                  {
                    id: 1,
                    name: 'Rez-de-chaussée',
                    floorNumber: 0,
                    createdAt: '2024-01-15T10:30:00.000Z',
                    updatedAt: '2024-01-15T10:30:00.000Z',
                    deletedAt: null,
                  },
                ],
                users: [
                  {
                    id: 1,
                    email: 'john.doe@example.com',
                    name: 'John Doe',
                    createdAt: '2024-01-15T10:30:00.000Z',
                    updatedAt: '2024-01-15T10:30:00.000Z',
                    deletedAt: null,
                  },
                ],
                lots: [
                  {
                    id: 1,
                    name: 'Lot A',
                    description: 'Lot principal du bâtiment',
                    createdAt: '2024-01-15T10:30:00.000Z',
                    updatedAt: '2024-01-15T10:30:00.000Z',
                    deletedAt: null,
                  },
                ],
              },
              {
                id: 2,
                name: 'Bâtiment B',
                createdAt: '2024-01-16T10:30:00.000Z',
                updatedAt: '2024-01-16T10:30:00.000Z',
                deletedAt: null,
                site: {
                  id: 1,
                  name: 'Site Principal',
                  address: '123 Rue de la Paix',
                  city: 'Paris',
                  postalCode: '75001',
                  country: 'France',
                  createdAt: '2024-01-15T10:30:00.000Z',
                  updatedAt: '2024-01-15T10:30:00.000Z',
                  deletedAt: null,
                },
                typologies: [
                  {
                    code: 'COM',
                    name: 'Commercial',
                    description: 'Bâtiment à usage commercial',
                  },
                ],
                ighClasses: [],
                erpCategory: null,
                parts: [],
                BuildingFloors: [],
                users: [],
                lots: [],
              },
            ],
          },
        },
      },
    }),
  );
};

export const SwaggerBuildingFindOne = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get a building by id' }),
    ApiOkResponse({
      description: 'Building',
      type: SwaggerBuildingExample,
      examples: {
        building: {
          summary: 'Building example',
          value: {
            id: 1,
            name: 'Bâtiment A',
            createdAt: '2024-01-15T10:30:00.000Z',
            updatedAt: '2024-01-15T10:30:00.000Z',
            deletedAt: null,
            site: {
              id: 1,
              name: 'Site Principal',
              address: '123 Rue de la Paix',
              city: 'Paris',
              postalCode: '75001',
              country: 'France',
              createdAt: '2024-01-15T10:30:00.000Z',
              updatedAt: '2024-01-15T10:30:00.000Z',
              deletedAt: null,
            },
            typologies: [
              {
                code: 'RES',
                name: 'Résidentiel',
                description: 'Bâtiment à usage résidentiel',
              },
            ],
            ighClasses: [
              {
                code: 'IGH1',
                name: 'IGH 1',
                description: 'Immeuble de Grande Hauteur classe 1',
              },
            ],
            erpCategory: {
              code: 'ERP1',
              name: 'ERP Type 1',
              description: 'Établissement Recevant du Public Type 1',
            },
            parts: [
              {
                id: 1,
                name: 'Partie A',
                type: 'COMMON',
                createdAt: '2024-01-15T10:30:00.000Z',
                updatedAt: '2024-01-15T10:30:00.000Z',
                deletedAt: null,
              },
            ],
            BuildingFloors: [
              {
                id: 1,
                name: 'Rez-de-chaussée',
                floorNumber: 0,
                createdAt: '2024-01-15T10:30:00.000Z',
                updatedAt: '2024-01-15T10:30:00.000Z',
                deletedAt: null,
              },
            ],
            users: [
              {
                id: 1,
                email: 'john.doe@example.com',
                name: 'John Doe',
                createdAt: '2024-01-15T10:30:00.000Z',
                updatedAt: '2024-01-15T10:30:00.000Z',
                deletedAt: null,
              },
            ],
            lots: [
              {
                id: 1,
                name: 'Lot A',
                description: 'Lot principal du bâtiment',
                createdAt: '2024-01-15T10:30:00.000Z',
                updatedAt: '2024-01-15T10:30:00.000Z',
                deletedAt: null,
              },
            ],
          },
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'Building not found',
      type: SwaggerBuildingNotFound,
    }),
  );
};

export const SwaggerBuildingCreate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a building' }),
    ApiCreatedResponse({
      description: 'The building has been successfully created',
      type: SwaggerBuildingExample,
    }),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerBuildingUpdate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update a building by id' }),
    ApiOkResponse({
      description: 'The building has been successfully updated',
      type: SwaggerBuildingExample,
    }),
    ApiNotFoundResponse({
      description: 'Building not found',
      type: SwaggerBuildingNotFound,
    }),
    ApiBadRequestResponse({ description: 'Bad request - invalid data provided' }),
  );
};

export const SwaggerBuildingDelete = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a building by id' }),
    ApiOkResponse({ description: 'Building successfully deleted' }),
    ApiNotFoundResponse({
      description: 'Building not found',
      type: SwaggerBuildingNotFound,
    }),
  );
};
