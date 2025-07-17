import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';
import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@src/common/helpers/error-codes/custom.exception';

export enum PlanErrorCode {
  PLAN_NOT_FOUND = 'PLAN_NOT_FOUND',
}

type ErrorCode = CommonErrorCode | PlanErrorCode;

export class PlanHttpException extends CustomHttpException {
  declare readonly code: PlanErrorCode;

  constructor(code: ErrorCode, status: HttpStatus, details?: ErrorDetails, options?: HttpExceptionOptions) {
    super(code, status, details, options);
  }

  getMessage() {
    const messages: Record<PlanErrorCode, string> = {
      [PlanErrorCode.PLAN_NOT_FOUND]: 'Plan not found in database',
    };

    return messages[this.code] || null;
  }
}

export class PlanNotFoundException extends PlanHttpException {
  constructor(details?: Record<string, string | number>) {
    super(PlanErrorCode.PLAN_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}
