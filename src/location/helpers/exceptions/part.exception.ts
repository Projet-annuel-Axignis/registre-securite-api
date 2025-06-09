import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';
import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@src/common/helpers/error-codes/custom.exception';

export enum PartErrorCode {
  PART_NOT_FOUND = 'PART_NOT_FOUND',
  PART_NOT_OWNED = 'PART_NOT_OWNED',
}

type ErrorCode = CommonErrorCode | PartErrorCode;

export class PartHttpException extends CustomHttpException {
  declare readonly code: PartErrorCode;

  constructor(code: ErrorCode, status: HttpStatus, details?: ErrorDetails, options?: HttpExceptionOptions) {
    super(code, status, details, options);
  }

  getMessage() {
    const messages: Record<PartErrorCode, string> = {
      [PartErrorCode.PART_NOT_FOUND]: 'Part not found in database',
      [PartErrorCode.PART_NOT_OWNED]: "You don't have rights to access on this part",
    };

    return messages[this.code] || null;
  }
}

export class PartNotFoundException extends PartHttpException {
  constructor(details?: Record<string, string | number>) {
    super(PartErrorCode.PART_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class PartNotOwnedException extends PartHttpException {
  constructor(details?: Record<string, string | number>) {
    super(PartErrorCode.PART_NOT_OWNED, HttpStatus.FORBIDDEN, details);
  }
}
