import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';
import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@src/common/helpers/error-codes/custom.exception';

export enum PartFloorErrorCode {
  PART_FLOOR_NOT_FOUND = 'PART_FLOOR_NOT_FOUND',
  PART_FLOOR_NOT_OWNED = 'PART_FLOOR_NOT_OWNED',
}

type ErrorCode = CommonErrorCode | PartFloorErrorCode;

export class PartFloorHttpException extends CustomHttpException {
  declare readonly code: PartFloorErrorCode;

  constructor(code: ErrorCode, status: HttpStatus, details?: ErrorDetails, options?: HttpExceptionOptions) {
    super(code, status, details, options);
  }

  getMessage() {
    const messages: Record<PartFloorErrorCode, string> = {
      [PartFloorErrorCode.PART_FLOOR_NOT_FOUND]: 'PartFloor not found in database',
      [PartFloorErrorCode.PART_FLOOR_NOT_OWNED]: "You don't have rights to access on this part floor",
    };

    return messages[this.code] || null;
  }
}

export class PartFloorNotFoundException extends PartFloorHttpException {
  constructor(details?: Record<string, string | number>) {
    super(PartFloorErrorCode.PART_FLOOR_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class PartFloorNotOwnedException extends PartFloorHttpException {
  constructor(details?: Record<string, string | number>) {
    super(PartFloorErrorCode.PART_FLOOR_NOT_OWNED, HttpStatus.FORBIDDEN, details);
  }
}
