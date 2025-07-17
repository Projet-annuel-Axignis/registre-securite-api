import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Name of the product', example: 'iPhone 15 Pro' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Serial number of the product (for searching)', example: 'PR-IPHONE-15-PRO-001' })
  @IsNotEmpty()
  @IsString()
  serialNumber: string;

  @ApiProperty({ description: 'ID of the brand', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  brandId: number;

  @ApiProperty({ description: 'ID of the equipment type', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  typeId: number;

  @ApiPropertyOptional({ description: 'Array of compatibility group IDs', example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  groupIds?: number[];
}
