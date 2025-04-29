import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@common/helpers/error-codes/custom.exception';
import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';

export enum AuthErrorCode {
  FORBIDDEN_ACCESS = 'FORBIDDEN_ACCESS',
  NO_USER = 'NO_API_KEY',
  NO_ACTIVE_ACCOUNT = 'NO_ACTIVE_ACCOUNT',
  INVALID_BEARER_TOKEN = 'INVALID_BEARER_TOKEN',
  UNKNOWN_VALIDATE_ERROR = 'UNKNOWN_VALIDATE_ERROR',
}

type ErrorCode = CommonErrorCode | AuthErrorCode;

export class AuthHttpException extends CustomHttpException {
  declare readonly code: AuthErrorCode;

  constructor(code: ErrorCode, status: HttpStatus, details?: ErrorDetails, options?: HttpExceptionOptions) {
    super(code, status, details, options);
  }

  getMessage() {
    const messages: Record<AuthErrorCode, string> = {
      [AuthErrorCode.FORBIDDEN_ACCESS]: "You haven't correct rights to access on this resource",
      [AuthErrorCode.NO_USER]: 'User not found in the request',
      [AuthErrorCode.NO_ACTIVE_ACCOUNT]: 'No active account found',
      [AuthErrorCode.INVALID_BEARER_TOKEN]: 'Invalid bearer token in the headers',
      [AuthErrorCode.UNKNOWN_VALIDATE_ERROR]: 'Unknown error occurred during validation',
    };

    return messages[this.code] || null;
  }
}

export class AuthForbiddenException extends AuthHttpException {
  constructor(details?: Record<string, string | number>) {
    super(AuthErrorCode.FORBIDDEN_ACCESS, HttpStatus.FORBIDDEN, details);
  }
}

export class InvalidBearerTokenException extends AuthHttpException {
  constructor(details?: Record<string, string | number>) {
    super(AuthErrorCode.INVALID_BEARER_TOKEN, HttpStatus.UNAUTHORIZED, details);
  }
}

export class AuthNoUserException extends AuthHttpException {
  constructor() {
    super(AuthErrorCode.NO_USER, HttpStatus.UNAUTHORIZED);
  }
}
