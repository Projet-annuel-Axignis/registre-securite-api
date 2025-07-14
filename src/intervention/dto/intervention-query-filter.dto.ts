import { ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { PaginationParamsDto } from '@src/paginator/paginator.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

enum InterventionEntityFields {
  ID = 'id',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
  LABEL = 'label',
  COMPANY_NAME = 'companyName',
  EMPLOYEE_NAME = 'employeeName',
  STATUS = 'status',
  PERIODICITY = 'periodicity',
  PLANNED_AT = 'plannedAt',
  STARTED_AT = 'startedAt',
  ENDED_AT = 'endedAt',
}

@ApiTags('Intervention')
export class InterventionQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: InterventionEntityFields.CREATED_AT,
    description: 'Name of the column to sort',
    default: InterventionEntityFields.CREATED_AT,
    enum: InterventionEntityFields,
  })
  @IsEnum(InterventionEntityFields)
  @IsOptional()
  sortField: string = InterventionEntityFields.CREATED_AT;

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
