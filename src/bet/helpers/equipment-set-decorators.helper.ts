import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiOkResponsePaginated } from '@paginator/paginator.decorator';
import { ClassCommonGet } from '../types/common-response.types';
import { EquipmentConfigSwagger } from './equipment-config-swagger.helper';

// Equipment Types Decorators
export const SwaggerEquipmentTypeCreate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new equipment type' }),
    ApiCreatedResponse(EquipmentConfigSwagger.SUCCESS_EQUIPMENT_TYPE_CREATE),
    ApiBadRequestResponse(EquipmentConfigSwagger.EQUIPMENT_BAD_REQUEST),
  );
};

export const SwaggerEquipmentTypeFindAll = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all equipment types' }),
    ApiOkResponsePaginated(ClassCommonGet, { description: 'Equipment types list' }),
  );
};

export const SwaggerEquipmentTypeFindOne = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get an equipment type by id' }),
    ApiOkResponse({ description: 'Equipment type', type: ClassCommonGet }),
    ApiNotFoundResponse(EquipmentConfigSwagger.EQUIPMENT_NOT_FOUND),
  );
};

export const SwaggerEquipmentTypeFindOneBySerialNumber = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get an equipment type by serial number' }),
    ApiOkResponse({ description: 'Equipment type', type: ClassCommonGet }),
    ApiNotFoundResponse(EquipmentConfigSwagger.EQUIPMENT_NOT_FOUND),
  );
};

export const SwaggerEquipmentTypeUpdate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update an equipment type by id' }),
    ApiOkResponse(EquipmentConfigSwagger.SUCCESS_EQUIPMENT_TYPE_UPDATE),
    ApiNotFoundResponse(EquipmentConfigSwagger.EQUIPMENT_NOT_FOUND),
    ApiBadRequestResponse(EquipmentConfigSwagger.EQUIPMENT_BAD_REQUEST),
  );
};

export const SwaggerEquipmentTypeSoftDelete = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Soft delete an equipment type by id' }),
    ApiOkResponse(EquipmentConfigSwagger.SUCCESS_EQUIPMENT_TYPE_DELETE),
    ApiNotFoundResponse(EquipmentConfigSwagger.EQUIPMENT_NOT_FOUND),
  );
};

export const SwaggerEquipmentTypeRestore = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Restore a soft deleted equipment type by id' }),
    ApiOkResponse(EquipmentConfigSwagger.SUCCESS_EQUIPMENT_TYPE_RESTORE),
    ApiNotFoundResponse(EquipmentConfigSwagger.EQUIPMENT_NOT_FOUND),
  );
};

// Equipment Domains Decorators
export const SwaggerEquipmentDomainCreate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new equipment domain' }),
    ApiCreatedResponse(EquipmentConfigSwagger.SUCCESS_EQUIPMENT_DOMAIN_CREATE),
    ApiBadRequestResponse(EquipmentConfigSwagger.EQUIPMENT_BAD_REQUEST),
  );
};

export const SwaggerEquipmentDomainFindAll = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all equipment domains' }),
    ApiOkResponsePaginated(ClassCommonGet, { description: 'Equipment domains list' }),
  );
};

export const SwaggerEquipmentDomainFindOne = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get an equipment domain by id' }),
    ApiOkResponse({ description: 'Equipment domain', type: ClassCommonGet }),
    ApiNotFoundResponse(EquipmentConfigSwagger.EQUIPMENT_NOT_FOUND),
  );
};

export const SwaggerEquipmentDomainFindOneBySerialNumber = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get an equipment domain by serial number' }),
    ApiOkResponse({ description: 'Equipment domain', type: ClassCommonGet }),
    ApiNotFoundResponse(EquipmentConfigSwagger.EQUIPMENT_NOT_FOUND),
  );
};

export const SwaggerEquipmentDomainUpdate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update an equipment domain by id' }),
    ApiOkResponse(EquipmentConfigSwagger.SUCCESS_EQUIPMENT_DOMAIN_UPDATE),
    ApiNotFoundResponse(EquipmentConfigSwagger.EQUIPMENT_NOT_FOUND),
    ApiBadRequestResponse(EquipmentConfigSwagger.EQUIPMENT_BAD_REQUEST),
  );
};

export const SwaggerEquipmentDomainSoftDelete = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Soft delete an equipment domain by id' }),
    ApiOkResponse(EquipmentConfigSwagger.SUCCESS_EQUIPMENT_DOMAIN_DELETE),
    ApiNotFoundResponse(EquipmentConfigSwagger.EQUIPMENT_NOT_FOUND),
  );
};

export const SwaggerEquipmentDomainRestore = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Restore a soft deleted equipment domain by id' }),
    ApiOkResponse(EquipmentConfigSwagger.SUCCESS_EQUIPMENT_DOMAIN_RESTORE),
    ApiNotFoundResponse(EquipmentConfigSwagger.EQUIPMENT_NOT_FOUND),
  );
};

// Equipment Families Decorators
export const SwaggerEquipmentFamilyCreate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new equipment family' }),
    ApiCreatedResponse(EquipmentConfigSwagger.SUCCESS_EQUIPMENT_FAMILY_CREATE),
    ApiBadRequestResponse(EquipmentConfigSwagger.EQUIPMENT_BAD_REQUEST),
  );
};

export const SwaggerEquipmentFamilyFindAll = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all equipment families' }),
    ApiOkResponsePaginated(ClassCommonGet, { description: 'Equipment families list' }),
  );
};

export const SwaggerEquipmentFamilyFindOne = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get an equipment family by id' }),
    ApiOkResponse({ description: 'Equipment family', type: ClassCommonGet }),
    ApiNotFoundResponse(EquipmentConfigSwagger.EQUIPMENT_NOT_FOUND),
  );
};

export const SwaggerEquipmentFamilyFindOneBySerialNumber = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get an equipment family by serial number' }),
    ApiOkResponse({ description: 'Equipment family', type: ClassCommonGet }),
    ApiNotFoundResponse(EquipmentConfigSwagger.EQUIPMENT_NOT_FOUND),
  );
};

export const SwaggerEquipmentFamilyUpdate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update an equipment family by id' }),
    ApiOkResponse(EquipmentConfigSwagger.SUCCESS_EQUIPMENT_FAMILY_UPDATE),
    ApiNotFoundResponse(EquipmentConfigSwagger.EQUIPMENT_NOT_FOUND),
    ApiBadRequestResponse(EquipmentConfigSwagger.EQUIPMENT_BAD_REQUEST),
  );
};

export const SwaggerEquipmentFamilySoftDelete = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Soft delete an equipment family by id' }),
    ApiOkResponse(EquipmentConfigSwagger.SUCCESS_EQUIPMENT_FAMILY_DELETE),
    ApiNotFoundResponse(EquipmentConfigSwagger.EQUIPMENT_NOT_FOUND),
  );
};

export const SwaggerEquipmentFamilyRestore = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Restore a soft deleted equipment family by id' }),
    ApiOkResponse(EquipmentConfigSwagger.SUCCESS_EQUIPMENT_FAMILY_RESTORE),
    ApiNotFoundResponse(EquipmentConfigSwagger.EQUIPMENT_NOT_FOUND),
  );
};
