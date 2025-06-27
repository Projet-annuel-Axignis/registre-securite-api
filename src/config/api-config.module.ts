import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './services/api-config.service';
import { MailerService } from './services/mailer.service';

@Global()
@Module({
  imports: [],
  providers: [ApiConfigService, MailerService],
  exports: [ApiConfigService, MailerService],
})
export class ApiConfigModule {}
