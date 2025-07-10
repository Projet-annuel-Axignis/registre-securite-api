import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';
import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@src/common/helpers/error-codes/custom.exception';

export enum OrganizationErrorCode {
  ORGANIZATION_NOT_FOUND = 'ORGANIZATION_NOT_FOUND',
  ORGANIZATION_ALREADY_EXISTS = 'ORGANIZATION_ALREADY_EXISTS',
  ORGANIZATION_IN_USE = 'ORGANIZATION_IN_USE',
}

type ErrorCode = CommonErrorCode | OrganizationErrorCode;

export class OrganizationHttpException extends CustomHttpException {
  declare readonly code: OrganizationErrorCode;

  constructor(code: ErrorCode, status: HttpStatus, details?: ErrorDetails, options?: HttpExceptionOptions) {
    super(code, status, details, options);
  }

  getMessage() {
    const messages: Record<OrganizationErrorCode, string> = {
      [OrganizationErrorCode.ORGANIZATION_NOT_FOUND]: 'Organization not found in database',
      [OrganizationErrorCode.ORGANIZATION_ALREADY_EXISTS]: 'Organization with this name already exists',
      [OrganizationErrorCode.ORGANIZATION_IN_USE]: 'Organization is being used and cannot be deleted',
    };

    return messages[this.code] || null;
  }
}

export class OrganizationNotFoundException extends OrganizationHttpException {
  constructor(details?: Record<string, string | number>) {
    super(OrganizationErrorCode.ORGANIZATION_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class OrganizationAlreadyExistsException extends OrganizationHttpException {
  constructor(details?: Record<string, string | number>) {
    super(OrganizationErrorCode.ORGANIZATION_ALREADY_EXISTS, HttpStatus.CONFLICT, details);
  }
}

export class OrganizationInUseException extends OrganizationHttpException {
  constructor(details?: Record<string, string | number>) {
    super(OrganizationErrorCode.ORGANIZATION_IN_USE, HttpStatus.CONFLICT, details);
  }
}
