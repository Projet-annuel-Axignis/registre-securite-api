import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';
import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@src/common/helpers/error-codes/custom.exception';

export enum ErpTypeErrorCode {
  ERP_TYPE_NOT_FOUND = 'ERP_TYPE_NOT_FOUND',
}

type ErrorCode = CommonErrorCode | ErpTypeErrorCode;

export class ErpTypeHttpException extends CustomHttpException {
  declare readonly code: ErpTypeErrorCode;

  constructor(code: ErrorCode, status: HttpStatus, details?: ErrorDetails, options?: HttpExceptionOptions) {
    super(code, status, details, options);
  }

  getMessage() {
    const messages: Record<ErpTypeErrorCode, string> = {
      [ErpTypeErrorCode.ERP_TYPE_NOT_FOUND]: 'ErpType not found in database',
    };

    return messages[this.code] || null;
  }
}

export class ErpTypeNotFoundException extends ErpTypeHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ErpTypeErrorCode.ERP_TYPE_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}
