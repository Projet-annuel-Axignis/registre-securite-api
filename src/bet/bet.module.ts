import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EquipmentController } from './controllers/equipment.controller';
import { InventoryController } from './controllers/inventory.controller';
import { ProductController } from './controllers/product.controller';
import { EquipmentService } from './services/equipment.service';
import { InventoryService } from './services/inventory.service';
import { ProductService } from './services/product.service';

@Module({
  imports: [HttpModule],
  controllers: [EquipmentController, InventoryController, ProductController],
  providers: [EquipmentService, InventoryService, ProductService],
})
export class BetModule {}
