import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetModule } from '@src/bet/bet.module';
import { InterventionModule } from '@src/intervention/intervention.module';
import { Part } from '@src/location/entities/part.entity';
import { Typology } from '@src/location/entities/typology.entity';
import { LocationModule } from '@src/location/location.module';
import { ObservationController } from './controllers/observation.controller';
import { OrganizationController } from './controllers/organization.controller';
import { ReportTypeController } from './controllers/report-type.controller';
import { ReportController } from './controllers/report.controller';
import { ObservationFile } from './entities/observation-file.entity';
import { Observation } from './entities/observation.entity';
import { Organization } from './entities/organization.entity';
import { ReportFile } from './entities/report-file.entity';
import { ReportType } from './entities/report-type.entity';
import { Report } from './entities/report.entity';
import { ObservationService } from './services/observation.service';
import { OrganizationService } from './services/organization.service';
import { ReportTypeService } from './services/report-type.service';
import { ReportService } from './services/report.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReportType,
      Report,
      Organization,
      Observation,
      ReportFile,
      ObservationFile,
      Part,
      Typology,
    ]),
    BetModule,
    InterventionModule,
    LocationModule,
  ],
  controllers: [ReportTypeController, OrganizationController, ReportController, ObservationController],
  providers: [ReportTypeService, OrganizationService, ReportService, ObservationService],
  exports: [ReportTypeService, OrganizationService, ReportService, ObservationService],
})
export class ReportModule {}
