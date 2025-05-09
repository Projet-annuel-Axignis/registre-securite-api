import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@paginator/paginator.dto';
import { IsEnum, IsOptional } from 'class-validator';

enum CompanyEntityFields {
  ID = 'id',
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
}

export class CompanyQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: CompanyEntityFields.NAME,
    description: 'Name of the column to sort',
    default: CompanyEntityFields.CREATED_AT,
    enum: CompanyEntityFields,
  })
  @IsEnum(CompanyEntityFields)
  @IsOptional()
  sortField: string = CompanyEntityFields.CREATED_AT;
}
