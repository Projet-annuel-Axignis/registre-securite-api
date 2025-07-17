import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';
import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@src/common/helpers/error-codes/custom.exception';

export enum SiteErrorCode {
  SITE_NOT_FOUND = 'SITE_NOT_FOUND',
  SITE_NOT_OWNED = 'SITE_NOT_OWNED',
}

type ErrorCode = CommonErrorCode | SiteErrorCode;

export class SiteHttpException extends CustomHttpException {
  declare readonly code: SiteErrorCode;

  constructor(code: ErrorCode, status: HttpStatus, details?: ErrorDetails, options?: HttpExceptionOptions) {
    super(code, status, details, options);
  }

  getMessage() {
    const messages: Record<SiteErrorCode, string> = {
      [SiteErrorCode.SITE_NOT_FOUND]: 'Site not found in database',
      [SiteErrorCode.SITE_NOT_OWNED]: "You don't have rights to access on this site",
    };

    return messages[this.code] || null;
  }
}

export class SiteNotFoundException extends SiteHttpException {
  constructor(details?: Record<string, string | number>) {
    super(SiteErrorCode.SITE_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class SiteNotOwnedException extends SiteHttpException {
  constructor(details?: Record<string, string | number>) {
    super(SiteErrorCode.SITE_NOT_OWNED, HttpStatus.FORBIDDEN, details);
  }
}
