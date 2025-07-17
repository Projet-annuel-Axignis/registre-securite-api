import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';
import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@src/common/helpers/error-codes/custom.exception';

export enum ObservationErrorCode {
  OBSERVATION_NOT_FOUND = 'OBSERVATION_NOT_FOUND',
  REPORT_NOT_FOUND = 'REPORT_NOT_FOUND',
  PARTS_NOT_FOUND = 'PARTS_NOT_FOUND',
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  OBSERVATION_FILE_NOT_FOUND = 'OBSERVATION_FILE_NOT_FOUND',
  INVALID_STATUS_TRANSITION = 'INVALID_STATUS_TRANSITION',
}

type ErrorCode = CommonErrorCode | ObservationErrorCode;

export class ObservationHttpException extends CustomHttpException {
  declare readonly code: ObservationErrorCode;

  constructor(code: ErrorCode, status: HttpStatus, details?: ErrorDetails, options?: HttpExceptionOptions) {
    super(code, status, details, options);
  }

  getMessage() {
    const messages: Record<ObservationErrorCode, string> = {
      [ObservationErrorCode.OBSERVATION_NOT_FOUND]: 'Observation not found in database',
      [ObservationErrorCode.REPORT_NOT_FOUND]: 'Report not found',
      [ObservationErrorCode.PARTS_NOT_FOUND]: 'Some parts were not found',
      [ObservationErrorCode.FILE_NOT_FOUND]: 'File not found in BET API',
      [ObservationErrorCode.OBSERVATION_FILE_NOT_FOUND]: 'File not found in observation',
      [ObservationErrorCode.INVALID_STATUS_TRANSITION]: 'Invalid status transition',
    };

    return messages[this.code] || null;
  }
}

export class ObservationNotFoundException extends ObservationHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ObservationErrorCode.OBSERVATION_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class ReportNotFoundException extends ObservationHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ObservationErrorCode.REPORT_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class PartsNotFoundException extends ObservationHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ObservationErrorCode.PARTS_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class FileNotFoundException extends ObservationHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ObservationErrorCode.FILE_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class ObservationFileNotFoundException extends ObservationHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ObservationErrorCode.OBSERVATION_FILE_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class InvalidStatusTransitionException extends ObservationHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ObservationErrorCode.INVALID_STATUS_TRANSITION, HttpStatus.BAD_REQUEST, details);
  }
}
