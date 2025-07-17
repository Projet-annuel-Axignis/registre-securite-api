import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from '@src/common/helpers/error-codes/custom.exception';

export enum PartFloorErrorCode {
  PART_FLOOR_NOT_FOUND = 'PART_FLOOR_NOT_FOUND',
  PART_FLOOR_NOT_OWNED = 'PART_FLOOR_NOT_OWNED',
}

export class PartFloorHttpException extends CustomHttpException {
  constructor(errorCode: PartFloorErrorCode, status: HttpStatus, details?: Record<string, string | number>) {
    super(errorCode, status, details);
  }

  getMessage(): string | null {
    const messages: Record<PartFloorErrorCode, string> = {
      [PartFloorErrorCode.PART_FLOOR_NOT_FOUND]: 'Part floor not found',
      [PartFloorErrorCode.PART_FLOOR_NOT_OWNED]: "Part floor is not owned by the user's company",
    };

    return messages[this.code as PartFloorErrorCode] || null;
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
