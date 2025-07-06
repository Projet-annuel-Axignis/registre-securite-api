import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Length } from 'class-validator';

export class CreateEquipmentTypeDto {
  @ApiProperty({
    description: 'Title of the equipment type',
    example: 'éclairage de sécurité',
    minLength: 2,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @Length(2, 100, { message: 'Title must be between 2 and 100 characters' })
  title: string;

  @ApiPropertyOptional({
    description: 'Subtitle of the equipment type',
    maxLength: 200,
  })
  @IsOptional()
  @IsString({ message: 'Subtitle must be a string' })
  @Length(0, 200, { message: 'Subtitle must be between 0 and 200 characters' })
  subTitle?: string;

  @ApiProperty({
    description: 'Serial number of the type (for searching)',
    example: 'LIGHT001',
    minLength: 3,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'Serial number is required' })
  @IsString({ message: 'Serial number must be a string' })
  @Length(3, 50, { message: 'Serial number must be between 3 and 50 characters' })
  serialNumber: string;

  @ApiProperty({
    description: 'Boolean to indicates if the type is required for inventory',
    example: true,
  })
  @IsNotEmpty({ message: 'Inventory required flag is required' })
  @IsBoolean({ message: 'Inventory required must be a boolean' })
  inventoryRequired: boolean;

  @ApiPropertyOptional({
    description: 'Field for extra data',
    example: {
      capacity: {
        label: 'Capacité (L)',
        type: 'decimal',
      },
      agent: {
        label: 'Nature du produit',
        type: 'enum',
        values: ['EAU', 'CO2', 'Poudre'],
      },
    },
  })
  @IsOptional()
  @IsObject({ message: 'Extra schema must be an object' })
  extraSchema?: object;

  @ApiProperty({
    description: 'ID of the equipment family this type belongs to',
    example: 1,
  })
  @IsNotEmpty({ message: 'Family ID is required' })
  @IsNumber({}, { message: 'Family ID must be a number' })
  familyId: number;
}
