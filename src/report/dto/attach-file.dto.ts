import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class AttachFileDto {
  @ApiProperty({
    description: 'Title of the file',
    example: 'Photo de la non-conformité',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Description of the file',
    example: 'Photo montrant la non-conformité détectée dans la zone A',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Version number of the file',
    example: 1,
    minimum: 1,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  version: number;
}
