import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EquipmentController } from './controllers/equipment.controller';
import { InventoryController } from './controllers/inventory.controller';
import { ProductController } from './controllers/product.controller';
import { EquipmentService } from './services/equipment.service';
import { InventoryService } from './services/inventory.service';
import { ProductService } from './services/product.service';
import { BrandController } from './controllers/brand.controller';
import { CompatibilityGroupController } from './controllers/compatibility-group.controller';
import { BrandService } from './services/brand.service';
import { CompatibilityGroupService } from './services/compatibility-group.service';
import { ProductDocumentTypeService } from './services/product-document-type.service';
import { ProductDocumentTypeController } from './controllers/product-document-type.controller';

@Module({
  imports: [HttpModule],
  controllers: [
    EquipmentController,
    InventoryController,
    ProductController,
    BrandController,
    CompatibilityGroupController,
    ProductDocumentTypeController,
  ],
  providers: [
    EquipmentService,
    InventoryService,
    ProductService,
    BrandService,
    CompatibilityGroupService,
    ProductDocumentTypeService,
  ],
})
export class BetModule {}
