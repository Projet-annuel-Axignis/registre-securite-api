import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Resources } from '@src/activity-logger/types/resource.types';
import { JwtAuthGuard } from '@src/auth/guards/jwt.guard';
import { RolesGuard } from '@src/auth/guards/role.guard';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { ProductService } from '../services/product.service';

@ApiTags(Resources.PRODUCT)
@SwaggerFailureResponse()
@UseGuards(RolesGuard, JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'products', version: ['1'] })
export class ProductController {
  constructor(private readonly productService: ProductService) {}
}
