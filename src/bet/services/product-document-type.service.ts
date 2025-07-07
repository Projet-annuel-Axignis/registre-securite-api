import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from '@src/config/services/api-config.service';
import { PaginatedList } from '@src/paginator/paginator.type';
import { AbstractBetService } from './abstract-bet.service';
import { ProductDocumentTypeResponse } from '../types/product-document-type-response.types';
import { CreateProductDocumentTypeDto } from '../dtos/product/create-product-document-type.dto';
import { UpdateProductDocumentTypeDto } from '../dtos/product/update-product-document-type.dto';
import { ProductDocumentTypeQueryFilterDto } from '../dtos/product/product-document-type-query-filter.dto';

@Injectable()
export class ProductDocumentTypeService extends AbstractBetService {
  constructor(
    protected readonly configService: ApiConfigService,
    protected readonly httpService: HttpService,
  ) {
    super(configService, httpService);
  }

  // Product Document Type Methods
  async createProductDocumentType(createDto: CreateProductDocumentTypeDto): Promise<ProductDocumentTypeResponse> {
    return this.makeBetRequest<ProductDocumentTypeResponse>({
      method: 'POST',
      endpoint: 'products/document-types',
      payload: createDto,
    });
  }

  async findAllProductDocumentTypes(
    query: ProductDocumentTypeQueryFilterDto,
  ): Promise<PaginatedList<ProductDocumentTypeResponse>> {
    return this.makeBetRequest<PaginatedList<ProductDocumentTypeResponse>, ProductDocumentTypeQueryFilterDto>({
      method: 'GET',
      endpoint: 'products/document-types',
      params: query,
    });
  }

  async findOneProductDocumentTypeById(id: number): Promise<ProductDocumentTypeResponse> {
    return this.makeBetRequest<ProductDocumentTypeResponse>({
      method: 'GET',
      endpoint: `products/document-types/${id}`,
    });
  }

  async findOneProductDocumentTypeBySerialNumber(serialNumber: string): Promise<ProductDocumentTypeResponse> {
    return this.makeBetRequest<ProductDocumentTypeResponse>({
      method: 'GET',
      endpoint: `products/document-types/serial/${serialNumber}`,
    });
  }

  async updateProductDocumentType(
    id: number,
    updateDto: UpdateProductDocumentTypeDto,
  ): Promise<ProductDocumentTypeResponse> {
    return this.makeBetRequest<ProductDocumentTypeResponse>({
      method: 'PATCH',
      endpoint: `products/document-types/${id}`,
      payload: updateDto,
    });
  }

  async softDeleteProductDocumentType(id: number): Promise<{ message: string; id: number }> {
    return this.makeBetRequest<{ message: string; id: number }>({
      method: 'DELETE',
      endpoint: `products/document-types/${id}`,
    });
  }

  async restoreProductDocumentType(id: number): Promise<{ message: string; id: number }> {
    return this.makeBetRequest<{ message: string; id: number }>({
      method: 'PATCH',
      endpoint: `products/document-types/${id}/restore`,
    });
  }
}
