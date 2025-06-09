import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from '@src/common/helpers/error-codes/custom.exception';

export enum BuildingFloorErrorCode {
  BUILDING_FLOOR_NOT_FOUND = 'BUILDING_FLOOR_NOT_FOUND',
  BUILDING_FLOOR_NOT_OWNED = 'BUILDING_FLOOR_NOT_OWNED',
}

export class BuildingFloorHttpException extends CustomHttpException {
  constructor(errorCode: BuildingFloorErrorCode, status: HttpStatus, details?: Record<string, string | number>) {
    super(errorCode, status, details);
  }

  getMessage(): string | null {
    const messages: Record<BuildingFloorErrorCode, string> = {
      [BuildingFloorErrorCode.BUILDING_FLOOR_NOT_FOUND]: 'Building floor not found',
      [BuildingFloorErrorCode.BUILDING_FLOOR_NOT_OWNED]: "Building floor is not owned by the user's company",
    };

    return messages[this.code as BuildingFloorErrorCode] || null;
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
