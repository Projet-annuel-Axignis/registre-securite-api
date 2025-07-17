import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';
import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@src/common/helpers/error-codes/custom.exception';

export enum ReportErrorCode {
  REPORT_NOT_FOUND = 'REPORT_NOT_FOUND',
  REPORT_TYPE_NOT_FOUND = 'REPORT_TYPE_NOT_FOUND',
  TYPOLOGY_NOT_FOUND = 'TYPOLOGY_NOT_FOUND',
  PARTS_NOT_FOUND = 'PARTS_NOT_FOUND',
  REPORT_IN_USE = 'REPORT_IN_USE',
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  REPORT_FILE_NOT_FOUND = 'REPORT_FILE_NOT_FOUND',
  EQUIPMENT_TYPE_NOT_FOUND = 'EQUIPMENT_TYPE_NOT_FOUND',
  REPORT_EQUIPMENT_NOT_FOUND = 'REPORT_EQUIPMENT_NOT_FOUND',
}

type ErrorCode = CommonErrorCode | ReportErrorCode;

export class ReportHttpException extends CustomHttpException {
  declare readonly code: ReportErrorCode;

  constructor(code: ErrorCode, status: HttpStatus, details?: ErrorDetails, options?: HttpExceptionOptions) {
    super(code, status, details, options);
  }

  getMessage() {
    const messages: Record<ReportErrorCode, string> = {
      [ReportErrorCode.REPORT_NOT_FOUND]: 'Report not found in database',
      [ReportErrorCode.REPORT_TYPE_NOT_FOUND]: 'Report type not found',
      [ReportErrorCode.TYPOLOGY_NOT_FOUND]: 'Typology not found',
      [ReportErrorCode.PARTS_NOT_FOUND]: 'Some parts were not found',
      [ReportErrorCode.REPORT_IN_USE]: 'Report is being used and cannot be deleted',
      [ReportErrorCode.FILE_NOT_FOUND]: 'File not found in BET API',
      [ReportErrorCode.REPORT_FILE_NOT_FOUND]: 'File not found in report',
      [ReportErrorCode.EQUIPMENT_TYPE_NOT_FOUND]: 'Equipment type not found in BET API',
      [ReportErrorCode.REPORT_EQUIPMENT_NOT_FOUND]: 'Equipment not found in report',
    };

    return messages[this.code] || null;
  }
}

export class ReportNotFoundException extends ReportHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ReportErrorCode.REPORT_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class ReportTypeNotFoundException extends ReportHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ReportErrorCode.REPORT_TYPE_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class TypologyNotFoundException extends ReportHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ReportErrorCode.TYPOLOGY_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class PartsNotFoundException extends ReportHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ReportErrorCode.PARTS_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class ReportInUseException extends ReportHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ReportErrorCode.REPORT_IN_USE, HttpStatus.CONFLICT, details);
  }
}

export class FileNotFoundException extends ReportHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ReportErrorCode.FILE_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class ReportFileNotFoundException extends ReportHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ReportErrorCode.REPORT_FILE_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class EquipmentTypeNotFoundException extends ReportHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ReportErrorCode.EQUIPMENT_TYPE_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class ReportEquipmentNotFoundException extends ReportHttpException {
  constructor(details?: Record<string, string | number>) {
    super(ReportErrorCode.REPORT_EQUIPMENT_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}
