import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../types/role.types';

export class CreateUserDto {
  @ApiProperty({ example: 'Registre de sécurité' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Role of the user', enum: Role, example: Role.ADMINISTRATOR })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
