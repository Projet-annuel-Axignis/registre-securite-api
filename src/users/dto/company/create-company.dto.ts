import { ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';
import { PlanType } from '../../types/plan.type';

@ApiTags('Users', 'Company')
export class CreateCompanyDto {
  @ApiProperty({ description: 'Name of the company', example: 'Axignis' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'SIRET number of the company', example: 12345678901234 })
  @IsNumberString()
  @Length(14, 14)
  siretNumber: string;

  @ApiPropertyOptional({
    enum: PlanType,
    example: PlanType.SELF_MANAGE,
    description: 'Type of the plan (required if creating a plan)',
  })
  @ValidateIf((o: CreateCompanyDto) => o.expiredAt !== undefined)
  @IsEnum(PlanType)
  @IsOptional()
  planType?: PlanType;

  @ApiPropertyOptional({
    example: '2025-12-31T23:59:59.000Z',
    description: 'Expiration date of the plan (required if creating a plan)',
  })
  @ValidateIf((o: CreateCompanyDto) => o.planType !== undefined)
  @IsDateString()
  @IsOptional()
  expiredAt?: string;

  @ApiPropertyOptional({
    example: 'Initial plan for the company',
    description: 'Comment for the plan (optional)',
  })
  @IsString()
  @IsOptional()
  planComment?: string;
}
