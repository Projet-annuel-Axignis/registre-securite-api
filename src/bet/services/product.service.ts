import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from '@src/config/services/api-config.service';
import { PaginatedList } from '@src/paginator/paginator.type';
import { AbstractBetService } from './abstract-bet.service';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { UpdateProductDto } from '../dtos/product/update-product.dto';
import { ProductQueryFilterDto } from '../dtos/product/product-query-filter.dto';
import { ProductResponse } from '../types/product-response.types';

@Injectable()
export class ProductService extends AbstractBetService {
  constructor(
    protected readonly configService: ApiConfigService,
    protected readonly httpService: HttpService,
  ) {
    super(configService, httpService);
  }

  // Product Methods
  async createProduct(createDto: CreateProductDto): Promise<ProductResponse> {
    return this.makeBetRequest<ProductResponse>({
      method: 'POST',
      endpoint: 'products',
      payload: createDto,
    });
  }

  async findAllProducts(query: ProductQueryFilterDto): Promise<PaginatedList<ProductResponse>> {
    return this.makeBetRequest<PaginatedList<ProductResponse>, ProductQueryFilterDto>({
      method: 'GET',
      endpoint: 'products',
      params: query,
    });
  }

  async findOneProductById(id: number): Promise<ProductResponse> {
    return this.makeBetRequest<ProductResponse>({
      method: 'GET',
      endpoint: `products/${id}`,
    });
  }

  async findOneProductBySerialNumber(serialNumber: string): Promise<ProductResponse> {
    return this.makeBetRequest<ProductResponse>({
      method: 'GET',
      endpoint: `products/serial/${serialNumber}`,
    });
  }

  async updateProduct(id: number, updateDto: UpdateProductDto): Promise<ProductResponse> {
    return this.makeBetRequest<ProductResponse>({
      method: 'PATCH',
      endpoint: `products/${id}`,
      payload: updateDto,
    });
  }

  async softDeleteProduct(id: number): Promise<{ message: string; id: number }> {
    return this.makeBetRequest<{ message: string; id: number }>({
      method: 'DELETE',
      endpoint: `products/${id}`,
    });
  }

  async restoreProduct(id: number): Promise<{ message: string; id: number }> {
    return this.makeBetRequest<{ message: string; id: number }>({
      method: 'POST',
      endpoint: `products/${id}/restore`,
    });
  }
}
