import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({ description: 'Name of the product', example: 'iPhone 15 Pro' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Serial number of the product (for searching)', example: 'PR-IPHONE-15-PRO-001' })
  @IsOptional()
  @IsString()
  serialNumber?: string;

  @ApiPropertyOptional({ description: 'ID of the brand', example: 1 })
  @IsOptional()
  @IsNumber()
  brandId?: number;

  @ApiPropertyOptional({ description: 'ID of the equipment type', example: 1 })
  @IsOptional()
  @IsNumber()
  typeId?: number;

  @ApiPropertyOptional({ description: 'Array of compatibility group IDs', example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  groupIds?: number[];
}
