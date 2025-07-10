import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObservationFile } from './entities/observation-file.entity';
import { Observation } from './entities/observation.entity';
import { Organization } from './entities/organization.entity';
import { ReportFile } from './entities/report-file.entity';
import { ReportType } from './entities/report-type.entity';
import { Report } from './entities/report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportType, Report, Organization, Observation, ReportFile, ObservationFile])],
})
export class ReportModule {}
