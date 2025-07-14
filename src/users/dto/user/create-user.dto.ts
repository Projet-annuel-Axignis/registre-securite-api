import { ApiProperty, ApiPropertyOptional, ApiTags, OmitType } from '@nestjs/swagger';
import { transformPhoneNumber } from '@src/auth/dtos/create-user-request.dto';
import { Match } from '@src/common/decorators/match-fields.decorator';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Matches } from 'class-validator';
import { Role } from '../../entities/role.entity';
import { RoleType } from '../../types/role.types';

@ApiTags('Users', 'User')
export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'john-doe@example.com' })
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ example: 'azerty123' })
  @IsStrongPassword()
  @IsNotEmpty({ message: 'password is required' })
  password: string;

  @ApiPropertyOptional({ description: 'Phone number of the user', example: '+33123456789' })
  @IsString()
  @Transform(transformPhoneNumber)
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'Phone number must be in international format (e.g., +33123456789)',
  })
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ example: 'azerty123' })
  @IsNotEmpty({ message: 'confirmPassword is required' })
  @Match('password')
  confirmPassword: string;

  @ApiProperty({ description: 'Role of the user', enum: RoleType, example: RoleType.ADMINISTRATOR })
  @IsEnum(RoleType)
  @IsNotEmpty()
  role: RoleType;

  @ApiPropertyOptional({ description: 'Id of the company. Need for creation by administrator only' })
  @IsInt()
  @IsOptional()
  companyId?: number;
}

export class FormattedCreatedUserDto extends OmitType(CreateUserDto, [
  'role',
  'password',
  'confirmPassword',
  'phoneNumber',
]) {
  role: Role | null;
  phoneNumber?: string | null;
}
