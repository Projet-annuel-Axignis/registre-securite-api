import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@common/helpers/error-codes/custom.exception';
import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';

export enum AuthErrorCode {
  FORBIDDEN_ACCESS = 'FORBIDDEN_ACCESS',
  NO_API_KEY = 'NO_API_KEY',
  NO_ACTIVE_ACCOUNT = 'NO_ACTIVE_ACCOUNT',
  INVALID_API_KEY = 'INVALID_API_KEY',
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
      [AuthErrorCode.NO_API_KEY]: 'No api key found in headers, key must be named X-API-KEY',
      [AuthErrorCode.NO_ACTIVE_ACCOUNT]: 'No active account found',
      [AuthErrorCode.INVALID_API_KEY]: 'Invalid API Key',
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

export class InvalidApiKeyException extends AuthHttpException {
  constructor(details?: Record<string, string | number>) {
    super(AuthErrorCode.INVALID_API_KEY, HttpStatus.UNAUTHORIZED, details);
  }
}

export class AuthNoApiKeyException extends AuthHttpException {
  constructor() {
    super(AuthErrorCode.NO_API_KEY, HttpStatus.UNAUTHORIZED);
  }
}
