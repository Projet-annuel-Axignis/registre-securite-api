import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@paginator/paginator.dto';
import { IsEnum, IsOptional } from 'class-validator';

enum SiteEntityFields {
  ID = 'id',
  NAME = 'name',
  REFERENCE = 'reference',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
}

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
}
