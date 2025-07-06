import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEquipmentDomainDto {
  @ApiProperty({
    description: 'Name of the equipment domain',
    example: 'électricité',
    minLength: 2,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  name: string;

  @ApiProperty({
    description: 'Serial number of the domain (for searching)',
    example: 'ELEC001',
    minLength: 3,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'Serial number is required' })
  @IsString({ message: 'Serial number must be a string' })
  @Length(3, 50, { message: 'Serial number must be between 3 and 50 characters' })
  serialNumber: string;
}
