import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { CreateCompanyDto } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @ApiPropertyOptional({ description: 'Id of the company plan', example: 1 })
  @IsInt()
  @IsOptional()
  planId?: number;
}
