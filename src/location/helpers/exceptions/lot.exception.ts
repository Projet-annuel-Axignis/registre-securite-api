import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';
import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@src/common/helpers/error-codes/custom.exception';

export enum LotErrorCode {
  LOT_NOT_FOUND = 'LOT_NOT_FOUND',
  LOT_NOT_OWNED = 'LOT_NOT_OWNED',
}

type ErrorCode = CommonErrorCode | LotErrorCode;

export class LotHttpException extends CustomHttpException {
  declare readonly code: LotErrorCode;

  constructor(code: ErrorCode, status: HttpStatus, details?: ErrorDetails, options?: HttpExceptionOptions) {
    super(code, status, details, options);
  }

  getMessage() {
    const messages: Record<LotErrorCode, string> = {
      [LotErrorCode.LOT_NOT_FOUND]: 'Lot not found in database',
      [LotErrorCode.LOT_NOT_OWNED]: "You don't have rights to access on this lot",
    };

    return messages[this.code] || null;
  }
}

export class LotNotFoundException extends LotHttpException {
  constructor(details?: Record<string, string | number>) {
    super(LotErrorCode.LOT_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class LotNotOwnedException extends LotHttpException {
  constructor(details?: Record<string, string | number>) {
    super(LotErrorCode.LOT_NOT_OWNED, HttpStatus.FORBIDDEN, details);
  }
}
