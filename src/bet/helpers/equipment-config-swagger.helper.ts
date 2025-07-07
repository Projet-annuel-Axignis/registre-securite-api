import { ApiResponseOptions } from '@nestjs/swagger';
import { ClassCommonGet } from '../types/common-response.types';
import {
  SwaggerEquipmentAlreadyExists,
  SwaggerEquipmentBadRequest,
  SwaggerEquipmentDeleteResponse,
  SwaggerEquipmentNotFound,
  SwaggerEquipmentRestoreResponse,
} from '../types/equipment/equipment-swagger-response.types';

export class EquipmentConfigSwagger {
  // Equipment Types
  static readonly SUCCESS_EQUIPMENT_TYPE_CREATE: ApiResponseOptions = {
    description: 'The equipment type has been successfully created',
    type: ClassCommonGet,
  };

  static readonly SUCCESS_EQUIPMENT_TYPE_UPDATE: ApiResponseOptions = {
    description: 'The equipment type has been successfully updated',
    type: ClassCommonGet,
  };

  static readonly SUCCESS_EQUIPMENT_TYPE_DELETE: ApiResponseOptions = {
    description: 'The equipment type has been successfully soft deleted',
    type: SwaggerEquipmentDeleteResponse,
  };

  static readonly SUCCESS_EQUIPMENT_TYPE_RESTORE: ApiResponseOptions = {
    description: 'The equipment type has been successfully restored',
    type: SwaggerEquipmentRestoreResponse,
  };

  // Equipment Domains
  static readonly SUCCESS_EQUIPMENT_DOMAIN_CREATE: ApiResponseOptions = {
    description: 'The equipment domain has been successfully created',
    type: ClassCommonGet,
  };

  static readonly SUCCESS_EQUIPMENT_DOMAIN_UPDATE: ApiResponseOptions = {
    description: 'The equipment domain has been successfully updated',
    type: ClassCommonGet,
  };

  static readonly SUCCESS_EQUIPMENT_DOMAIN_DELETE: ApiResponseOptions = {
    description: 'The equipment domain has been successfully soft deleted',
    type: SwaggerEquipmentDeleteResponse,
  };

  static readonly SUCCESS_EQUIPMENT_DOMAIN_RESTORE: ApiResponseOptions = {
    description: 'The equipment domain has been successfully restored',
    type: SwaggerEquipmentRestoreResponse,
  };

  // Equipment Families
  static readonly SUCCESS_EQUIPMENT_FAMILY_CREATE: ApiResponseOptions = {
    description: 'The equipment family has been successfully created',
    type: ClassCommonGet,
  };

  static readonly SUCCESS_EQUIPMENT_FAMILY_UPDATE: ApiResponseOptions = {
    description: 'The equipment family has been successfully updated',
    type: ClassCommonGet,
  };

  static readonly SUCCESS_EQUIPMENT_FAMILY_DELETE: ApiResponseOptions = {
    description: 'The equipment family has been successfully soft deleted',
    type: SwaggerEquipmentDeleteResponse,
  };

  static readonly SUCCESS_EQUIPMENT_FAMILY_RESTORE: ApiResponseOptions = {
    description: 'The equipment family has been successfully restored',
    type: SwaggerEquipmentRestoreResponse,
  };

  // Common Error Responses
  static readonly EQUIPMENT_NOT_FOUND: ApiResponseOptions = {
    description: 'Equipment not found',
    type: SwaggerEquipmentNotFound,
  };

  static readonly EQUIPMENT_ALREADY_EXISTS: ApiResponseOptions = {
    description: 'Equipment already exists',
    type: SwaggerEquipmentAlreadyExists,
  };

  static readonly EQUIPMENT_BAD_REQUEST: ApiResponseOptions = {
    description: 'Invalid equipment data',
    type: SwaggerEquipmentBadRequest,
  };
}
