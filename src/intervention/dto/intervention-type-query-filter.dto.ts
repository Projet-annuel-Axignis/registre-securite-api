import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsDto } from '@src/paginator/paginator.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

enum InterventionTypeEntityFields {
  ID = 'id',
  CODE = 'code',
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
}

export class InterventionTypeQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: InterventionTypeEntityFields.NAME,
    description: 'Name of the column to sort',
    default: InterventionTypeEntityFields.CREATED_AT,
    enum: InterventionTypeEntityFields,
  })
  @IsEnum(InterventionTypeEntityFields)
  @IsOptional()
  sortField: string = InterventionTypeEntityFields.CREATED_AT;

  @ApiProperty({
    description: 'Include soft deleted intervention types',
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
