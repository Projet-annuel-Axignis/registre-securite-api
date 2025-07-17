import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Resources } from '@src/activity-logger/types/resource.types';
import { Roles } from '@src/auth/decorators/role.decorator';
import { JwtAuthGuard } from '@src/auth/guards/jwt.guard';
import { RolesGuard } from '@src/auth/guards/role.guard';
import { SwaggerFailureResponse } from '@src/common/helpers/common-set-decorators.helper';
import { PaginatedList } from '@src/paginator/paginator.type';
import { RoleType } from '@src/users/types/role.types';
import { BrandQueryFilterDto } from '../dtos/product/brand-query-filter.dto';
import { CreateBrandDto } from '../dtos/product/create-brand.dto';
import { UpdateBrandDto } from '../dtos/product/update-brand.dto';
import {
  SwaggerBrandCreate,
  SwaggerBrandFindAll,
  SwaggerBrandFindOne,
  SwaggerBrandFindOneBySerialNumber,
  SwaggerBrandRestore,
  SwaggerBrandSoftDelete,
  SwaggerBrandUpdate,
} from '../helpers/brand-set-decorators.helper';
import { BrandService } from '../services/brand.service';
import { BrandResponse } from '../types/product/brand-response.types';

@ApiTags(Resources.PRODUCT)
@SwaggerFailureResponse()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller({ path: 'brands', version: ['1'] })
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  // Brand Endpoints
  @Post()
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerBrandCreate()
  async createBrand(@Body() createDto: CreateBrandDto): Promise<BrandResponse> {
    return await this.brandService.createBrand(createDto);
  }

  @Get()
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerBrandFindAll()
  async findAllBrands(@Query() query: BrandQueryFilterDto): Promise<PaginatedList<BrandResponse>> {
    return await this.brandService.findAllBrands(query);
  }

  @Get(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerBrandFindOne()
  async findOneBrandById(@Param('id', ParseIntPipe) id: number): Promise<BrandResponse> {
    return await this.brandService.findOneBrandById(id);
  }

  @Get('serial/:serialNumber')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerBrandFindOneBySerialNumber()
  async findOneBrandBySerialNumber(@Param('serialNumber') serialNumber: string): Promise<BrandResponse> {
    return await this.brandService.findOneBrandBySerialNumber(serialNumber);
  }

  @Patch(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerBrandUpdate()
  async updateBrand(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateBrandDto): Promise<BrandResponse> {
    return await this.brandService.updateBrand(id, updateDto);
  }

  @Delete(':id')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerBrandSoftDelete()
  async softDeleteBrand(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; id: number }> {
    return await this.brandService.softDeleteBrand(id);
  }

  @Patch(':id/restore')
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerBrandRestore()
  async restoreBrand(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; id: number }> {
    return await this.brandService.restoreBrand(id);
  }
}
