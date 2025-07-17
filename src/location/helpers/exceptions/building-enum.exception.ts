import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';
import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@src/common/helpers/error-codes/custom.exception';

export enum BuildingEnumErrorCode {
  TYPOLOGY_NOT_FOUND = 'TYPOLOGY_NOT_FOUND',
  IGH_CLASS_NOT_FOUND = 'IGH_CLASS_NOT_FOUND',
  ERP_CATEGORY_NOT_FOUND = 'ERP_CATEGORY_NOT_FOUND',
}

type ErrorCode = CommonErrorCode | BuildingEnumErrorCode;

export class BuildingEnumHttpException extends CustomHttpException {
  declare readonly code: BuildingEnumErrorCode;

  constructor(code: ErrorCode, status: HttpStatus, details?: ErrorDetails, options?: HttpExceptionOptions) {
    super(code, status, details, options);
  }

  getMessage() {
    const messages: Record<BuildingEnumErrorCode, string> = {
      [BuildingEnumErrorCode.TYPOLOGY_NOT_FOUND]: 'Typology not found in database',
      [BuildingEnumErrorCode.IGH_CLASS_NOT_FOUND]: 'IGH class not found in database',
      [BuildingEnumErrorCode.ERP_CATEGORY_NOT_FOUND]: 'ERP category not found in database',
    };

    return messages[this.code] || null;
  }
}

export class TypologyNotFoundException extends BuildingEnumHttpException {
  constructor(details?: Record<string, string | number>) {
    super(BuildingEnumErrorCode.TYPOLOGY_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class IghClassNotFoundException extends BuildingEnumHttpException {
  constructor(details?: Record<string, string | number>) {
    super(BuildingEnumErrorCode.IGH_CLASS_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class ErpCategoryNotFoundException extends BuildingEnumHttpException {
  constructor(details?: Record<string, string | number>) {
    super(BuildingEnumErrorCode.ERP_CATEGORY_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}
