import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLotDto {
  @ApiPropertyOptional({ description: 'Name of the lot' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'ID of the part floor this lot belongs to' })
  @IsNumber()
  @IsOptional()
  partFloorId?: number;
}
