import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLotDto {
  @ApiProperty({ description: 'Name of the lot' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'ID of the building this lot belongs to' })
  @IsNumber()
  buildingId: number;

  @ApiProperty({ description: 'ID of the building floor this lot belongs to' })
  @IsNumber()
  buildingFloorId: number;

  @ApiPropertyOptional({ description: 'ID of the part floor this lot belongs to' })
  @IsNumber()
  @IsOptional()
  partFloorId?: number;
}
