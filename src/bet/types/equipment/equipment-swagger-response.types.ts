import { ApiProperty } from '@nestjs/swagger';

export class SwaggerEquipmentNotFound {
  @ApiProperty({ example: 'Equipment not found' })
  message: string;

  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'NOT_FOUND' })
  error: string;
}

export class SwaggerEquipmentAlreadyExists {
  @ApiProperty({ example: 'Equipment already exists' })
  message: string;

  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'BAD_REQUEST' })
  error: string;
}

export class SwaggerEquipmentBadRequest {
  @ApiProperty({ example: 'Invalid equipment data' })
  message: string;

  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'BAD_REQUEST' })
  error: string;
}

export class SwaggerEquipmentDeleteResponse {
  @ApiProperty({ example: 'Equipment soft deleted' })
  message: string;

  @ApiProperty({ example: 1 })
  id: number;
}

export class SwaggerEquipmentRestoreResponse {
  @ApiProperty({ example: 'Equipment restored' })
  message: string;

  @ApiProperty({ example: 1 })
  id: number;
}
