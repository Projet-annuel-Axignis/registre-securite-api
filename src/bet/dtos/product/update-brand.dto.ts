import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBrandDto {
  @ApiProperty({ description: 'Name of the brand', example: 'Apple', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Serial number of the brand (for searching)', example: 'BR-APPLE-001', required: false })
  @IsOptional()
  @IsString()
  serialNumber?: string;
}
