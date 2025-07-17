import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from '@src/config/services/api-config.service';
import { PaginatedList } from '@src/paginator/paginator.type';
import { BrandQueryFilterDto } from '../dtos/product/brand-query-filter.dto';
import { CreateBrandDto } from '../dtos/product/create-brand.dto';
import { UpdateBrandDto } from '../dtos/product/update-brand.dto';
import { BrandResponse } from '../types/product/brand-response.types';
import { AbstractBetService } from './abstract-bet.service';

@Injectable()
export class BrandService extends AbstractBetService {
  constructor(
    protected readonly configService: ApiConfigService,
    protected readonly httpService: HttpService,
  ) {
    super(configService, httpService);
  }

  // Brand Methods
  async createBrand(createDto: CreateBrandDto): Promise<BrandResponse> {
    return this.makeBetRequest<BrandResponse>({
      method: 'POST',
      endpoint: 'brands',
      payload: createDto,
    });
  }

  async findAllBrands(query: BrandQueryFilterDto): Promise<PaginatedList<BrandResponse>> {
    return this.makeBetRequest<PaginatedList<BrandResponse>, BrandQueryFilterDto>({
      method: 'GET',
      endpoint: 'brands',
      params: query,
    });
  }

  async findOneBrandById(id: number): Promise<BrandResponse> {
    return this.makeBetRequest<BrandResponse>({
      method: 'GET',
      endpoint: `brands/${id}`,
    });
  }

  async findOneBrandBySerialNumber(serialNumber: string): Promise<BrandResponse> {
    return this.makeBetRequest<BrandResponse>({
      method: 'GET',
      endpoint: `brands/serial/${serialNumber}`,
    });
  }

  async updateBrand(id: number, updateDto: UpdateBrandDto): Promise<BrandResponse> {
    return this.makeBetRequest<BrandResponse>({
      method: 'PATCH',
      endpoint: `brands/${id}`,
      payload: updateDto,
    });
  }

  async softDeleteBrand(id: number): Promise<{ message: string; id: number }> {
    return this.makeBetRequest<{ message: string; id: number }>({
      method: 'DELETE',
      endpoint: `brands/${id}`,
    });
  }

  async restoreBrand(id: number): Promise<{ message: string; id: number }> {
    return this.makeBetRequest<{ message: string; id: number }>({
      method: 'PATCH',
      endpoint: `brands/${id}/restore`,
    });
  }
}
