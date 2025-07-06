import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateEquipmentFamilyDto {
  @ApiPropertyOptional({
    description: 'Name of the equipment family',
    example: 'éclairage',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Serial number of the family (for searching)',
    example: 'LIGHT001',
    minLength: 3,
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'Serial number must be a string' })
  @Length(3, 50, { message: 'Serial number must be between 3 and 50 characters' })
  serialNumber?: string;

  @ApiPropertyOptional({
    description: 'ID of the equipment domain this family belongs to',
    example: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Domain ID must be a number' })
  domainId?: number;
}
