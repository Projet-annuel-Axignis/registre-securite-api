import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationController } from './controllers/organization.controller';
import { ReportTypeController } from './controllers/report-type.controller';
import { ObservationFile } from './entities/observation-file.entity';
import { Observation } from './entities/observation.entity';
import { Organization } from './entities/organization.entity';
import { ReportFile } from './entities/report-file.entity';
import { ReportType } from './entities/report-type.entity';
import { Report } from './entities/report.entity';
import { OrganizationService } from './services/organization.service';
import { ReportTypeService } from './services/report-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReportType, Report, Organization, Observation, ReportFile, ObservationFile])],
  controllers: [ReportTypeController, OrganizationController],
  providers: [ReportTypeService, OrganizationService],
  exports: [ReportTypeService, OrganizationService],
})
export class ReportModule {}
