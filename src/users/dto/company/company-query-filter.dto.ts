import { ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { PaginationParamsDto } from '@paginator/paginator.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

enum CompanyEntityFields {
  ID = 'id',
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
}

@ApiTags('Users', 'Company')
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

  @ApiPropertyOptional({ description: 'Boolean to get archived data', default: false })
  @Transform(({ value }: { value: string }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  @IsOptional()
  includeDeleted?: boolean;
}
