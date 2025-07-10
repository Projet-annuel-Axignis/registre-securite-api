import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@src/paginator/paginator.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

enum ReportEntityFields {
  ID = 'id',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
  LABEL = 'label',
}

export class ReportQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: ReportEntityFields.CREATED_AT,
    description: 'Name of the column to sort',
    default: ReportEntityFields.CREATED_AT,
    enum: ReportEntityFields,
  })
  @IsEnum(ReportEntityFields)
  @IsOptional()
  sortField: string = ReportEntityFields.CREATED_AT;

  @ApiPropertyOptional({
    type: 'boolean',
    description: 'Boolean to get archived data',
    default: false,
  })
  @Transform(({ value }: { value: string }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  @IsOptional()
  includeDeleted?: boolean;
}
