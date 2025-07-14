import { ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { PlanType } from '../../types/plan.type';

@ApiTags('Users', 'Plan')
export class UpdatePlanDto {
  @ApiPropertyOptional({
    enum: PlanType,
    example: PlanType.ADMIN_MANAGE,
    description: 'Type of the plan',
  })
  @IsEnum(PlanType)
  @IsOptional()
  type?: PlanType;

  @ApiPropertyOptional({
    example: '2025-04-17T10:00:00.303Z',
    description: 'Expiration date of the plan',
  })
  @IsDateString()
  @IsOptional()
  expiredAt?: string;

  @ApiPropertyOptional({
    example: 'Updated plan comment',
    description: 'Comment for the plan',
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
