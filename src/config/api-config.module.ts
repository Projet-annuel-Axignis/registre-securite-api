import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './services/api-config.service';
import { MailerService } from './services/mailer.service';

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 60000,
      maxRedirects: 3,
    }),
  ],
  providers: [ApiConfigService, MailerService],
  exports: [ApiConfigService, MailerService],
})
export class ApiConfigModule {}
