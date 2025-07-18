import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLoggerModule } from './activity-logger/activity-logger.module';
import { LoggingInterceptor } from './activity-logger/helpers/activity-logger.interceptor';
import { AuthModule } from './auth/auth.module';
import { BetModule } from './bet/bet.module';
import { ApiConfigModule } from './config/api-config.module';
import configuration from './config/helpers/api-config.config';
import { InterventionModule } from './intervention/intervention.module';
import { LocationModule } from './location/location.module';
import { dataSourceOptions } from './orm/data-source';
import { ReportModule } from './report/report.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ApiConfigModule,
    UserModule,
    ActivityLoggerModule,
    AuthModule,
    LocationModule,
    BetModule,
    InterventionModule,
    ReportModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
