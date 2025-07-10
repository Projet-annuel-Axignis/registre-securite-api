import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';
import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@src/common/helpers/error-codes/custom.exception';

export enum InterventionTypeErrorCode {
  INTERVENTION_TYPE_NOT_FOUND = 'INTERVENTION_TYPE_NOT_FOUND',
  INTERVENTION_TYPE_ALREADY_EXISTS = 'INTERVENTION_TYPE_ALREADY_EXISTS',
  INTERVENTION_TYPE_IN_USE = 'INTERVENTION_TYPE_IN_USE',
}

type ErrorCode = CommonErrorCode | InterventionTypeErrorCode;

export class InterventionTypeHttpException extends CustomHttpException {
  declare readonly code: InterventionTypeErrorCode;

  constructor(code: ErrorCode, status: HttpStatus, details?: ErrorDetails, options?: HttpExceptionOptions) {
    super(code, status, details, options);
  }

  getMessage() {
    const messages: Record<InterventionTypeErrorCode, string> = {
      [InterventionTypeErrorCode.INTERVENTION_TYPE_NOT_FOUND]: 'Intervention type not found in database',
      [InterventionTypeErrorCode.INTERVENTION_TYPE_ALREADY_EXISTS]: 'Intervention type with this code already exists',
      [InterventionTypeErrorCode.INTERVENTION_TYPE_IN_USE]: 'Intervention type is being used and cannot be deleted',
    };

    return messages[this.code] || null;
  }
}

export class InterventionTypeNotFoundException extends InterventionTypeHttpException {
  constructor(details?: Record<string, string | number>) {
    super(InterventionTypeErrorCode.INTERVENTION_TYPE_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class InterventionTypeAlreadyExistsException extends InterventionTypeHttpException {
  constructor(details?: Record<string, string | number>) {
    super(InterventionTypeErrorCode.INTERVENTION_TYPE_ALREADY_EXISTS, HttpStatus.CONFLICT, details);
  }
}

export class InterventionTypeInUseException extends InterventionTypeHttpException {
  constructor(details?: Record<string, string | number>) {
    super(InterventionTypeErrorCode.INTERVENTION_TYPE_IN_USE, HttpStatus.CONFLICT, details);
  }
}
