import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from '@src/config/services/api-config.service';
import { PaginatedList } from '@src/paginator/paginator.type';
import { AbstractBetService } from './abstract-bet.service';
import { CompatibilityGroupResponse } from '../types/compatibility-group-response.types';
import { CreateCompatibilityGroupDto } from '../dtos/product/create-compatibility-group.dto';
import { UpdateCompatibilityGroupDto } from '../dtos/product/update-compatibility-group.dto';
import { CompatibilityGroupQueryFilterDto } from '../dtos/product/compatibility-group-query-filter.dto';

@Injectable()
export class CompatibilityGroupService extends AbstractBetService {
  constructor(
    protected readonly configService: ApiConfigService,
    protected readonly httpService: HttpService,
  ) {
    super(configService, httpService);
  }

  // Compatibility Group Methods
  async createCompatibilityGroup(createDto: CreateCompatibilityGroupDto): Promise<CompatibilityGroupResponse> {
    return this.makeBetRequest<CompatibilityGroupResponse>({
      method: 'POST',
      endpoint: 'products/compatibility-groups',
      payload: createDto,
    });
  }

  async findAllCompatibilityGroups(
    query: CompatibilityGroupQueryFilterDto,
  ): Promise<PaginatedList<CompatibilityGroupResponse>> {
    return this.makeBetRequest<PaginatedList<CompatibilityGroupResponse>, CompatibilityGroupQueryFilterDto>({
      method: 'GET',
      endpoint: 'products/compatibility-groups',
      params: query,
    });
  }

  async findOneCompatibilityGroupById(id: number): Promise<CompatibilityGroupResponse> {
    return this.makeBetRequest<CompatibilityGroupResponse>({
      method: 'GET',
      endpoint: `products/compatibility-groups/${id}`,
    });
  }

  async updateCompatibilityGroup(
    id: number,
    updateDto: UpdateCompatibilityGroupDto,
  ): Promise<CompatibilityGroupResponse> {
    return this.makeBetRequest<CompatibilityGroupResponse>({
      method: 'PATCH',
      endpoint: `products/compatibility-groups/${id}`,
      payload: updateDto,
    });
  }

  async softDeleteCompatibilityGroup(id: number): Promise<{ message: string; id: number }> {
    return this.makeBetRequest<{ message: string; id: number }>({
      method: 'DELETE',
      endpoint: `products/compatibility-groups/${id}`,
    });
  }

  async restoreCompatibilityGroup(id: number): Promise<{ message: string; id: number }> {
    return this.makeBetRequest<{ message: string; id: number }>({
      method: 'PATCH',
      endpoint: `products/compatibility-groups/${id}/restore`,
    });
  }
}
