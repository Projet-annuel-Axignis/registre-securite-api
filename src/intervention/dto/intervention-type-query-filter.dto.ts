import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class InterventionTypeQueryFilterDto {
  @ApiProperty({
    description: 'Filter by intervention type code',
    example: 'regulatory',
    required: false,
  })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({
    description: 'Filter by intervention type name',
    example: 'Vérification',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
