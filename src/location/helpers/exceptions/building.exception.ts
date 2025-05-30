import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';
import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@src/common/helpers/error-codes/custom.exception';

export enum BuildingErrorCode {
  BUILDING_NOT_FOUND = 'BUILDING_NOT_FOUND',
  BUILDING_NOT_OWNED = 'BUILDING_NOT_OWNED',
}

type ErrorCode = CommonErrorCode | BuildingErrorCode;

export class BuildingHttpException extends CustomHttpException {
  declare readonly code: BuildingErrorCode;

  constructor(code: ErrorCode, status: HttpStatus, details?: ErrorDetails, options?: HttpExceptionOptions) {
    super(code, status, details, options);
  }

  getMessage() {
    const messages: Record<BuildingErrorCode, string> = {
      [BuildingErrorCode.BUILDING_NOT_FOUND]: 'Building not found in database',
      [BuildingErrorCode.BUILDING_NOT_OWNED]: "You don't have rights to access on this building",
    };

    return messages[this.code] || null;
  }
}

export class BuildingNotFoundException extends BuildingHttpException {
  constructor(details?: Record<string, string | number>) {
    super(BuildingErrorCode.BUILDING_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class BuildingNotOwnedException extends BuildingHttpException {
  constructor(details?: Record<string, string | number>) {
    super(BuildingErrorCode.BUILDING_NOT_OWNED, HttpStatus.FORBIDDEN, details);
  }
}
