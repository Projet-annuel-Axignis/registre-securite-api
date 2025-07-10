import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BrandController } from './controllers/brand.controller';
import { CompatibilityGroupController } from './controllers/compatibility-group.controller';
import { EquipmentController } from './controllers/equipment.controller';
import { InventoryController } from './controllers/inventory.controller';
import { ProductDocumentTypeController } from './controllers/product-document-type.controller';
import { ProductDocumentController } from './controllers/product-document.controller';
import { ProductController } from './controllers/product.controller';
import { BrandService } from './services/brand.service';
import { CompatibilityGroupService } from './services/compatibility-group.service';
import { EquipmentService } from './services/equipment.service';
import { InventoryService } from './services/inventory.service';
import { ProductDocumentTypeService } from './services/product-document-type.service';
import { ProductDocumentService } from './services/product-document.service';
import { ProductService } from './services/product.service';

@Module({
  imports: [HttpModule],
  controllers: [
    EquipmentController,
    InventoryController,
    ProductController,
    BrandController,
    CompatibilityGroupController,
    ProductDocumentTypeController,
    ProductDocumentController,
  ],
  providers: [
    EquipmentService,
    InventoryService,
    ProductService,
    BrandService,
    CompatibilityGroupService,
    ProductDocumentTypeService,
    ProductDocumentService,
  ],
  exports: [ProductDocumentService],
})
export class BetModule {}
