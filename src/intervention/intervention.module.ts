import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from '@src/location/location.module';
import { UserModule } from '@src/users/user.module';
import { InterventionTypeController } from './controllers/intervention-type.controller';
import { InterventionController } from './controllers/intervention.controller';
import { InterventionType } from './entities/intervention-type.entity';
import { Intervention } from './entities/intervention.entity';
import { InterventionTypeService } from './services/intervention-type.service';
import { InterventionService } from './services/intervention.service';

@Module({
  imports: [TypeOrmModule.forFeature([InterventionType, Intervention]), UserModule, LocationModule],
  controllers: [InterventionTypeController, InterventionController],
  providers: [InterventionTypeService, InterventionService],
  exports: [InterventionTypeService, InterventionService],
})
export class InterventionModule {}
