import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';
import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@src/common/helpers/error-codes/custom.exception';

export enum CompanyErrorCode {
  COMPANY_NOT_FOUND = 'COMPANY_NOT_FOUND',
}

type ErrorCode = CommonErrorCode | CompanyErrorCode;

export class CompanyHttpException extends CustomHttpException {
  declare readonly code: CompanyErrorCode;

  constructor(code: ErrorCode, status: HttpStatus, details?: ErrorDetails, options?: HttpExceptionOptions) {
    super(code, status, details, options);
  }

  getMessage() {
    const messages: Record<CompanyErrorCode, string> = {
      [CompanyErrorCode.COMPANY_NOT_FOUND]: 'Company not found in database',
    };

    return messages[this.code] || null;
  }
}

export class CompanyNotFoundException extends CompanyHttpException {
  constructor(details?: Record<string, string | number>) {
    super(CompanyErrorCode.COMPANY_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}
