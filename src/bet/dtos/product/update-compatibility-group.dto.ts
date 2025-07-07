import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCompatibilityGroupDto {
  @ApiPropertyOptional({ description: 'Name of the compatibility group' })
  @IsOptional()
  @IsString()
  name?: string;
}
