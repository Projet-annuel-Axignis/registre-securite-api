import { ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { PaginationParamsDto } from '@paginator/paginator.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

enum SiteEntityFields {
  ID = 'id',
  NAME = 'name',
  REFERENCE = 'reference',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
}

@ApiTags('Location', 'Site')
export class SiteQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: SiteEntityFields.NAME,
    description: 'Name of the column to sort',
    default: SiteEntityFields.CREATED_AT,
    enum: SiteEntityFields,
  })
  @IsEnum(SiteEntityFields)
  @IsOptional()
  sortField: string = SiteEntityFields.CREATED_AT;

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
