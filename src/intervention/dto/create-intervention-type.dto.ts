import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInterventionTypeDto {
  @ApiProperty({
    description: 'Unique code identifier for the intervention type',
    example: 'regulatory_audit',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'French name/description of the intervention type',
    example: 'Vérification réglementaire',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
