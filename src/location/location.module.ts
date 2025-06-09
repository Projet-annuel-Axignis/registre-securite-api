import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@src/users/user.module';
import { BuildingController } from './controllers/building.controller';
import { LotController } from './controllers/lot.controller';
import { PartController } from './controllers/part.controller';
import { SiteController } from './controllers/site.controller';
import { BuildingFloor } from './entities/building-floor.entity';
import { Building } from './entities/building.entity';
import { ErpCategory } from './entities/erp-category.entity';
import { ErpType } from './entities/erp-type.entity';
import { HabFamily } from './entities/hab-family.entity';
import { IghClass } from './entities/igh-class.entity';
import { Lot } from './entities/lot.entity';
import { PartFloor } from './entities/part-floor.entity';
import { Part } from './entities/part.entity';
import { Site } from './entities/site.entity';
import { Typology } from './entities/typology.entity';
import { BuildingEnumService } from './services/building-enum.service';
import { BuildingService } from './services/building.service';
import { ErpTypeService } from './services/erp-type.service';
import { HabFamilyService } from './services/hab-family.service';
import { LotService } from './services/lot.service';
import { PartFloorService } from './services/part-floor.service';
import { PartService } from './services/part.service';
import { SiteService } from './services/site.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Site,
      Building,
      Typology,
      IghClass,
      ErpCategory,
      Part,
      ErpType,
      HabFamily,
      BuildingFloor,
      Lot,
      PartFloor,
    ]),
    UserModule,
  ],
  controllers: [SiteController, BuildingController, LotController, PartController],
  providers: [
    SiteService,
    BuildingService,
    BuildingEnumService,
    LotService,
    PartService,
    PartFloorService,
    HabFamilyService,
    ErpTypeService,
  ],
})
export class LocationModule {}
