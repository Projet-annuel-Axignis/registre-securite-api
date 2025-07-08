import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterventionType } from './entities/intervention-type.entity';
import { Intervention } from './entities/intervention.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterventionType, Intervention])],
})
export class InterventionModule {}
