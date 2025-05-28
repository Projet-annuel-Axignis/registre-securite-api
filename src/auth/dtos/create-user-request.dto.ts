import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Match } from '@src/common/decorators/match-fields.decorator';
import { PlanType } from '@src/users/types/plan.type';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({ description: 'First name of the user', example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Name of the company', example: 'Acme Corp' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ description: 'SIRET number of the company', example: 12345678901234 })
  @IsNumber()
  @IsNotEmpty()
  siretNumber: number;

  @ApiProperty({ description: 'Type of plan selected', enum: PlanType, example: PlanType.SELF_MANAGE })
  @IsEnum(PlanType)
  @IsNotEmpty()
  planType: PlanType;

  @ApiPropertyOptional({ description: 'Additional comments or notes', example: 'Special requirements' })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({ description: 'Email address of the user', example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Phone number of the user', example: '+33123456789' })
  @IsString()
  @Matches(/^(\+33|0)[1-9](\d{2}){4}$/, {
    message: 'Phone number must be a valid French phone number',
  })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ description: 'Password for the user account', example: 'StrongP@ss123' })
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Confirmation of the password', example: 'StrongP@ss123' })
  @IsString()
  @IsNotEmpty()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
