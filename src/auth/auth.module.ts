import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@src/users/user.module';
import { AuthController } from './controllers/auth.controller';
import { ApiKeyStrategy } from './helpers/api-key-strategy';
import { AuthService } from './services/auth.service';

@Module({
  imports: [PassportModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, ApiKeyStrategy],
})
export class AuthModule {}
