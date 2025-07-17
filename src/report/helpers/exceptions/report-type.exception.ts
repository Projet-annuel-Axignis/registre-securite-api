import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';
import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@src/common/helpers/error-codes/custom.exception';

export enum ReportTypeErrorCode {
  REPORT_TYPE_NOT_FOUND = 'REPORT_TYPE_NOT_FOUND',
  REPORT_TYPE_ALREADY_EXISTS = 'REPORT_TYPE_ALREADY_EXISTS',
  REPORT_TYPE_IN_USE = 'REPORT_TYPE_IN_USE',
}

type ErrorCode = CommonErrorCode | ReportTypeErrorCode;

export class ReportTypeHttpException extends CustomHttpException {
  declare readonly code: ReportTypeErrorCode;

  constructor(code: ErrorCode, status: HttpStatus, details?: ErrorDetails, options?: HttpExceptionOptions) {
    super(code, status, details, options);
  }

  getMessage() {
    const messages: Record<ReportTypeErrorCode, string> = {
      [ReportTypeErrorCode.REPORT_TYPE_NOT_FOUND]: 'Report type not found in database',
      [ReportTypeErrorCode.REPORT_TYPE_ALREADY_EXISTS]: 'Report type with this code already exists',
      [ReportTypeErrorCode.REPORT_TYPE_IN_USE]: 'Report type is being used and cannot be deleted',
    };

    return messages[this.code] || null;
  }
}

export class ReportTypeNotFoundException extends ReportTypeHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ReportTypeErrorCode.REPORT_TYPE_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class ReportTypeAlreadyExistsException extends ReportTypeHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ReportTypeErrorCode.REPORT_TYPE_ALREADY_EXISTS, HttpStatus.CONFLICT, details);
  }
}

export class ReportTypeInUseException extends ReportTypeHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ReportTypeErrorCode.REPORT_TYPE_IN_USE, HttpStatus.CONFLICT, details);
  }
}
