import { ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { PaginationParamsDto } from '@paginator/paginator.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

enum UserEntityFields {
  ID = 'id',
  LAST_NAME = 'lastName',
  ROLE = 'role',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
}

@ApiTags('Users', 'User')
export class UserQueryFilterDto extends PaginationParamsDto {
  @ApiPropertyOptional({
    example: UserEntityFields.LAST_NAME,
    description: 'Name of the column to sort',
    default: UserEntityFields.CREATED_AT,
    enum: UserEntityFields,
  })
  @IsEnum(UserEntityFields)
  @IsOptional()
  sortField: string = UserEntityFields.CREATED_AT;

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
