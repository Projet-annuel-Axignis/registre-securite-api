import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@ApiTags('Auth')
export class LoginDto {
  @ApiProperty({ example: 'admin@admin.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Azerty1@' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
