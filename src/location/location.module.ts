import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@src/users/user.module';
import { SiteController } from './controllers/site.controller';
import { Site } from './entities/site.entity';
import { SiteService } from './services/site.service';

@Module({
  imports: [TypeOrmModule.forFeature([Site]), UserModule],
  controllers: [SiteController],
  providers: [SiteService],
})
export class LocationModule {}
