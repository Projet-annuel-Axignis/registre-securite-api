import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrganizationType } from '../types/organization-type.types';

@ApiTags('Report', 'Organization')
export class UpdateOrganizationDto {
  @ApiProperty({
    description: 'Unique name identifier for the organization',
    example: 'Organization ABC',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Type of the organization',
    enum: OrganizationType,
    example: OrganizationType.OA,
    required: false,
  })
  @IsEnum(OrganizationType)
  @IsOptional()
  type?: OrganizationType;
}
