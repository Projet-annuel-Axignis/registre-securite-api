import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Name of the company', example: 'Axignis' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
