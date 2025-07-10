import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';
import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@src/common/helpers/error-codes/custom.exception';

export enum InterventionErrorCode {
  INTERVENTION_NOT_FOUND = 'INTERVENTION_NOT_FOUND',
  INTERVENTION_ALREADY_EXISTS = 'INTERVENTION_ALREADY_EXISTS',
  INTERVENTION_IN_USE = 'INTERVENTION_IN_USE',
  INTERVENTION_TYPE_NOT_FOUND = 'INTERVENTION_TYPE_NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  INVALID_STATUS_TRANSITION = 'INVALID_STATUS_TRANSITION',
}

type ErrorCode = CommonErrorCode | InterventionErrorCode;

export class InterventionHttpException extends CustomHttpException {
  declare readonly code: InterventionErrorCode;

  constructor(code: ErrorCode, status: HttpStatus, details?: ErrorDetails, options?: HttpExceptionOptions) {
    super(code, status, details, options);
  }

  getMessage() {
    const messages: Record<InterventionErrorCode, string> = {
      [InterventionErrorCode.INTERVENTION_NOT_FOUND]: 'Intervention not found in database',
      [InterventionErrorCode.INTERVENTION_ALREADY_EXISTS]: 'Intervention with this ID already exists',
      [InterventionErrorCode.INTERVENTION_IN_USE]: 'Intervention is being used and cannot be deleted',
      [InterventionErrorCode.INTERVENTION_TYPE_NOT_FOUND]: 'Intervention type not found',
      [InterventionErrorCode.USER_NOT_FOUND]: 'User not found',
      [InterventionErrorCode.INVALID_STATUS_TRANSITION]: 'Invalid status transition for intervention',
    };

    return messages[this.code] || null;
  }
}

export class InterventionNotFoundException extends InterventionHttpException {
  constructor(details?: Record<string, string | number>) {
    super(InterventionErrorCode.INTERVENTION_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class InterventionAlreadyExistsException extends InterventionHttpException {
  constructor(details?: Record<string, string | number>) {
    super(InterventionErrorCode.INTERVENTION_ALREADY_EXISTS, HttpStatus.CONFLICT, details);
  }
}

export class InterventionInUseException extends InterventionHttpException {
  constructor(details?: Record<string, string | number>) {
    super(InterventionErrorCode.INTERVENTION_IN_USE, HttpStatus.CONFLICT, details);
  }
}

export class InterventionTypeNotFoundException extends InterventionHttpException {
  constructor(details?: Record<string, string | number>) {
    super(InterventionErrorCode.INTERVENTION_TYPE_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class UserNotFoundException extends InterventionHttpException {
  constructor(details?: Record<string, string | number>) {
    super(InterventionErrorCode.USER_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class InvalidStatusTransitionException extends InterventionHttpException {
  constructor(details?: Record<string, string | number>) {
    super(InterventionErrorCode.INVALID_STATUS_TRANSITION, HttpStatus.BAD_REQUEST, details);
  }
}
