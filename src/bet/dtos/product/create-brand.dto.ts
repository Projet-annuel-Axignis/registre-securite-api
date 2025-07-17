import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ description: 'Name of the brand', example: 'Apple' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Serial number of the brand (for searching)', example: 'BR-APPLE-001' })
  @IsNotEmpty()
  @IsString()
  serialNumber: string;
}
