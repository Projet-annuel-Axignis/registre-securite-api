import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';
import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@src/common/helpers/error-codes/custom.exception';

export enum HabFamilyErrorCode {
  HAB_FAMILY_NOT_FOUND = 'HAB_FAMILY_NOT_FOUND',
}

type ErrorCode = CommonErrorCode | HabFamilyErrorCode;

export class HabFamilyHttpException extends CustomHttpException {
  declare readonly code: HabFamilyErrorCode;

  constructor(code: ErrorCode, status: HttpStatus, details?: ErrorDetails, options?: HttpExceptionOptions) {
    super(code, status, details, options);
  }

  getMessage() {
    const messages: Record<HabFamilyErrorCode, string> = {
      [HabFamilyErrorCode.HAB_FAMILY_NOT_FOUND]: 'HabFamily not found in database',
    };

    return messages[this.code] || null;
  }
}

export class HabFamilyNotFoundException extends HabFamilyHttpException {
  constructor(details?: Record<string, string | number>) {
    super(HabFamilyErrorCode.HAB_FAMILY_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}
