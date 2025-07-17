import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

@ApiTags('Intervention')
export class UpdateInterventionTypeDto {
  @ApiProperty({
    description: 'Unique code identifier for the intervention type',
    example: 'regulatory_audit',
    required: false,
  })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({
    description: 'French name/description of the intervention type',
    example: 'Vérification réglementaire',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
