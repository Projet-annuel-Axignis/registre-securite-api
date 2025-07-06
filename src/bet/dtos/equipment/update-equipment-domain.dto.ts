import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateEquipmentDomainDto {
  @ApiPropertyOptional({
    description: 'Name of the equipment domain',
    example: 'électricité',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Serial number of the domain (for searching)',
    example: 'ELEC001',
    minLength: 3,
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'Serial number must be a string' })
  @Length(3, 50, { message: 'Serial number must be between 3 and 50 characters' })
  serialNumber?: string;
}
