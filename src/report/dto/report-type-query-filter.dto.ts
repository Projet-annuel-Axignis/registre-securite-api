import { ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { PaginationParamsDto } from '@src/paginator/paginator.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

enum ReportTypeEntityFields {
  ID = 'id',
  CODE = 'code',
  NAME = 'name',
  PERIODICITY = 'periodicity',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
}

@ApiTags('Report', 'ReportType')
export class ReportTypeQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: ReportTypeEntityFields.NAME,
    description: 'Name of the column to sort',
    default: ReportTypeEntityFields.CREATED_AT,
    enum: ReportTypeEntityFields,
  })
  @IsEnum(ReportTypeEntityFields)
  @IsOptional()
  sortField: string = ReportTypeEntityFields.CREATED_AT;

  @ApiProperty({
    description: 'Include soft deleted report types',
    example: false,
    required: false,
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
