import { HttpExceptionOptions, HttpStatus } from '@nestjs/common';
import { CommonErrorCode, CustomHttpException, ErrorDetails } from '@src/common/helpers/error-codes/custom.exception';

export enum BuildingFloorErrorCode {
  BUILDING_FLOOR_NOT_FOUND = 'BUILDING_FLOOR_NOT_FOUND',
  BUILDING_FLOOR_NOT_OWNED = 'BUILDING_FLOOR_NOT_OWNED',
}

type ErrorCode = CommonErrorCode | BuildingFloorErrorCode;

export class BuildingFloorHttpException extends CustomHttpException {
  declare readonly code: BuildingFloorErrorCode;

  constructor(code: ErrorCode, status: HttpStatus, details?: ErrorDetails, options?: HttpExceptionOptions) {
    super(code, status, details, options);
  }

  getMessage() {
    const messages: Record<BuildingFloorErrorCode, string> = {
      [BuildingFloorErrorCode.BUILDING_FLOOR_NOT_FOUND]: 'Building Floor not found in database',
      [BuildingFloorErrorCode.BUILDING_FLOOR_NOT_OWNED]: "You don't have rights to access on this building floor",
    };

    return messages[this.code] || null;
  }
}

export class BuildingFloorNotFoundException extends BuildingFloorHttpException {
  constructor(details?: Record<string, string | number>) {
    super(BuildingFloorErrorCode.BUILDING_FLOOR_NOT_FOUND, HttpStatus.NOT_FOUND, details);
  }
}

export class BuildingFloorNotOwnedException extends BuildingFloorHttpException {
  constructor(details?: Record<string, string | number>) {
    super(BuildingFloorErrorCode.BUILDING_FLOOR_NOT_OWNED, HttpStatus.FORBIDDEN, details);
  }
}
