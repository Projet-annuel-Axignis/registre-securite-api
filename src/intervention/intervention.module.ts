import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterventionTypeController } from './controllers/intervention-type.controller';
import { InterventionType } from './entities/intervention-type.entity';
import { Intervention } from './entities/intervention.entity';
import { InterventionTypeService } from './services/intervention-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([InterventionType, Intervention])],
  controllers: [InterventionTypeController],
  providers: [InterventionTypeService],
  exports: [InterventionTypeService],
})
export class InterventionModule {}
