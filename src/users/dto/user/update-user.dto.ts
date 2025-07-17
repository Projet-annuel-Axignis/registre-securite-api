import { ApiTags, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

@ApiTags('Users', 'User')
export class UpdateUserDto extends PartialType(CreateUserDto) {}
