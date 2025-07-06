import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompatibilityGroupDto {
  @ApiProperty({ description: 'Name of the compatibility group', example: 'Network Equipment' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
