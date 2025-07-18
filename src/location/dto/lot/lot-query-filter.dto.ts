import { ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { PaginationParamsDto } from '@src/paginator/paginator.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

enum LotEntityFields {
  ID = 'id',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
  NAME = 'name',
}

@ApiTags('Location', 'Lot')
export class LotQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: LotEntityFields.NAME,
    description: 'Name of the column to sort',
    default: LotEntityFields.CREATED_AT,
    enum: LotEntityFields,
  })
  @IsEnum(LotEntityFields)
  @IsOptional()
  sortField: string = LotEntityFields.CREATED_AT;

  @ApiPropertyOptional({ type: 'boolean', description: 'Boolean to get archived data', default: false })
  @Transform(({ value }: { value: string }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  @IsOptional()
  includeDeleted?: boolean;
}
