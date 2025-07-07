import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Resources } from '@src/activity-logger/types/resource.types';
import { Roles } from '@src/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt.guard';
import { RolesGuard } from '@src/auth/guards/role.guard';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { PaginatedList } from '@src/paginator/paginator.type';
import { RoleType } from '@src/users/types/role.types';
import { ProductDocumentTypeService } from '../services/product-document-type.service';
import { CreateProductDocumentTypeDto } from '../dtos/product/create-product-document-type.dto';
import { UpdateProductDocumentTypeDto } from '../dtos/product/update-product-document-type.dto';
import { ProductDocumentTypeQueryFilterDto } from '../dtos/product/product-document-type-query-filter.dto';
import { ProductDocumentTypeResponse } from '../types/product-document-type-response.types';
import {
  SwaggerProductDocumentTypeCreate,
  SwaggerProductDocumentTypeFindAll,
  SwaggerProductDocumentTypeFindOne,
  SwaggerProductDocumentTypeFindOneBySerialNumber,
  SwaggerProductDocumentTypeUpdate,
  SwaggerProductDocumentTypeSoftDelete,
  SwaggerProductDocumentTypeRestore,
} from '../helpers/product-document-type-set-decorators.helper';

@ApiTags(Resources.PRODUCT)
@SwaggerFailureResponse()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller({ path: 'product-document-types', version: ['1'] })
export class ProductDocumentTypeController {
  constructor(private readonly productDocumentTypeService: ProductDocumentTypeService) {}

  // Product Document Type Endpoints
  @Post()
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductDocumentTypeCreate()
  async createProductDocumentType(
    @Body() createDto: CreateProductDocumentTypeDto,
  ): Promise<ProductDocumentTypeResponse> {
    return await this.productDocumentTypeService.createProductDocumentType(createDto);
  }

  @Get()
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductDocumentTypeFindAll()
  async findAllProductDocumentTypes(
    @Query() query: ProductDocumentTypeQueryFilterDto,
  ): Promise<PaginatedList<ProductDocumentTypeResponse>> {
    return await this.productDocumentTypeService.findAllProductDocumentTypes(query);
  }

  @Get(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductDocumentTypeFindOne()
  async findOneProductDocumentTypeById(@Param('id', ParseIntPipe) id: number): Promise<ProductDocumentTypeResponse> {
    return await this.productDocumentTypeService.findOneProductDocumentTypeById(id);
  }

  @Get('serial/:serialNumber')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductDocumentTypeFindOneBySerialNumber()
  async findOneProductDocumentTypeBySerialNumber(
    @Param('serialNumber') serialNumber: string,
  ): Promise<ProductDocumentTypeResponse> {
    return await this.productDocumentTypeService.findOneProductDocumentTypeBySerialNumber(serialNumber);
  }

  @Patch(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductDocumentTypeUpdate()
  async updateProductDocumentType(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProductDocumentTypeDto,
  ): Promise<ProductDocumentTypeResponse> {
    return await this.productDocumentTypeService.updateProductDocumentType(id, updateDto);
  }

  @Delete(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductDocumentTypeSoftDelete()
  async softDeleteProductDocumentType(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; id: number }> {
    return await this.productDocumentTypeService.softDeleteProductDocumentType(id);
  }

  @Patch(':id/restore')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerProductDocumentTypeRestore()
  async restoreProductDocumentType(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; id: number }> {
    return await this.productDocumentTypeService.restoreProductDocumentType(id);
  }
}
