import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@src/paginator/paginator.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

enum ObservationEntityFields {
  ID = 'id',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
  TITLE = 'title',
  REFERENCE = 'reference',
  LOCATION = 'location',
  PRIORITY = 'priority',
  STATUS = 'status',
  STARTED_AT = 'startedAt',
  ENDED_AT = 'endedAt',
}

export class ObservationQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: ObservationEntityFields.CREATED_AT,
    description: 'Name of the column to sort',
    default: ObservationEntityFields.CREATED_AT,
    enum: ObservationEntityFields,
  })
  @IsEnum(ObservationEntityFields)
  @IsOptional()
  sortField: string = ObservationEntityFields.CREATED_AT;

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
