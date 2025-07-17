import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from '@src/config/services/api-config.service';
import { PaginatedList } from '@src/paginator/paginator.type';
import { CreateInventoryItemDto } from '../dtos/inventory/create-inventory-item.dto';
import { InventoryItemQueryFilterDto } from '../dtos/inventory/inventory-item-query-filter.dto';
import { UpdateInventoryItemDto } from '../dtos/inventory/update-inventory-item.dto';
import { InventoryItemResponse } from '../types/inventory/inventory-response.types';
import { AbstractBetService } from './abstract-bet.service';

@Injectable()
export class InventoryService extends AbstractBetService {
  constructor(
    protected readonly configService: ApiConfigService,
    protected readonly httpService: HttpService,
  ) {
    super(configService, httpService);
  }

  // Inventory Items Methods
  async createInventoryItem(createDto: CreateInventoryItemDto): Promise<InventoryItemResponse> {
    return this.makeBetRequest<InventoryItemResponse>({
      method: 'POST',
      endpoint: 'inventory',
      payload: createDto,
    });
  }

  async findAllInventoryItems(query: InventoryItemQueryFilterDto): Promise<PaginatedList<InventoryItemResponse>> {
    return this.makeBetRequest<PaginatedList<InventoryItemResponse>, InventoryItemQueryFilterDto>({
      method: 'GET',
      endpoint: 'inventory',
      params: query,
    });
  }

  async findOneInventoryItemById(id: number): Promise<InventoryItemResponse> {
    return this.makeBetRequest<InventoryItemResponse>({
      method: 'GET',
      endpoint: `inventory/${id}`,
    });
  }

  async updateInventoryItem(id: number, updateDto: UpdateInventoryItemDto): Promise<InventoryItemResponse> {
    return this.makeBetRequest<InventoryItemResponse>({
      method: 'PATCH',
      endpoint: `inventory/${id}`,
      payload: updateDto,
    });
  }

  async softDeleteInventoryItem(id: number): Promise<{ message: string; id: number }> {
    return this.makeBetRequest<{ message: string; id: number }>({
      method: 'DELETE',
      endpoint: `inventory/${id}`,
    });
  }

  async restoreInventoryItem(id: number): Promise<{ message: string; id: number }> {
    return this.makeBetRequest<{ message: string; id: number }>({
      method: 'PATCH',
      endpoint: `inventory/${id}/restore`,
    });
  }
}
