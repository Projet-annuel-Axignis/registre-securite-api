import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OrganizationType } from '../types/organization-type.types';

export class CreateOrganizationDto {
  @ApiProperty({
    description: 'Unique name identifier for the organization',
    example: 'Organization ABC',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Type of the organization',
    enum: OrganizationType,
    example: OrganizationType.OA,
  })
  @IsEnum(OrganizationType)
  @IsNotEmpty()
  type: OrganizationType;
}
