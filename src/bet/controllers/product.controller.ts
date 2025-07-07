import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Resources } from '@src/activity-logger/types/resource.types';
import { Roles } from '@src/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt.guard';
import { RolesGuard } from '@src/auth/guards/role.guard';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { PaginatedList } from '@src/paginator/paginator.type';
import { RoleType } from '@src/users/types/role.types';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { UpdateProductDto } from '../dtos/product/update-product.dto';
import { ProductQueryFilterDto } from '../dtos/product/product-query-filter.dto';
import { ProductResponse } from '../types/product-response.types';
import {
  SwaggerProductCreate,
  SwaggerProductFindAll,
  SwaggerProductFindOne,
  SwaggerProductUpdate,
  SwaggerProductSoftDelete,
  SwaggerProductRestore,
} from '../helpers/product-set-decorators.helper';
import { BetApiErrorResponse } from '../services/abstract-bet.service';

@ApiTags(Resources.PRODUCT)
@SwaggerFailureResponse()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller({ path: 'products', version: ['1'] })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Product Endpoints
  @Post()
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductCreate()
  async createProduct(@Body() createDto: CreateProductDto): Promise<ProductResponse | BetApiErrorResponse> {
    return await this.productService.createProduct(createDto);
  }

  @Get()
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductFindAll()
  async findAllProducts(
    @Query() query: ProductQueryFilterDto,
  ): Promise<PaginatedList<ProductResponse> | BetApiErrorResponse> {
    return await this.productService.findAllProducts(query);
  }

  @Get(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductFindOne()
  async findOneProductById(@Param('id', ParseIntPipe) id: number): Promise<ProductResponse | BetApiErrorResponse> {
    return await this.productService.findOneProductById(id);
  }

  @Get('serial/:serialNumber')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductFindOne()
  async findOneProductBySerialNumber(
    @Param('serialNumber') serialNumber: string,
  ): Promise<ProductResponse | BetApiErrorResponse> {
    return await this.productService.findOneProductBySerialNumber(serialNumber);
  }

  @Patch(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductUpdate()
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProductDto,
  ): Promise<ProductResponse | BetApiErrorResponse> {
    return await this.productService.updateProduct(id, updateDto);
  }

  @Delete(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductSoftDelete()
  async softDeleteProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; id: number } | BetApiErrorResponse> {
    return await this.productService.softDeleteProduct(id);
  }

  @Post(':id/restore')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductRestore()
  async restoreProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; id: number } | BetApiErrorResponse> {
    return await this.productService.restoreProduct(id);
  }
}
