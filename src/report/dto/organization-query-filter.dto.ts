import { ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { BooleanTransform } from '@src/common/decorators/boolean-transform.decorator';
import { PaginationParamsDto } from '@src/paginator/paginator.dto';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

enum OrganizationEntityFields {
  ID = 'id',
  NAME = 'name',
  TYPE = 'type',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
}

@ApiTags('Report', 'Organization')
export class OrganizationQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: OrganizationEntityFields.NAME,
    description: 'Name of the column to sort',
    default: OrganizationEntityFields.CREATED_AT,
    enum: OrganizationEntityFields,
  })
  @IsEnum(OrganizationEntityFields)
  @IsOptional()
  sortField: string = OrganizationEntityFields.CREATED_AT;

  @ApiProperty({
    description: 'Include soft deleted organizations',
    example: false,
    required: false,
  })
  @BooleanTransform()
  @IsBoolean()
  @IsOptional()
  includeDeleted?: boolean;
}
