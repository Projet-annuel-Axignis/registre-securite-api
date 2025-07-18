import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from '@src/config/services/api-config.service';
import { PaginatedList } from '@src/paginator/paginator.type';
import { CreateEquipmentDomainDto } from '../dtos/equipment/create-equipment-domain.dto';
import { CreateEquipmentFamilyDto } from '../dtos/equipment/create-equipment-family.dto';
import { CreateEquipmentTypeDto } from '../dtos/equipment/create-equipment-type.dto';
import { EquipmentDomainQueryFilterDto } from '../dtos/equipment/equipment-domain-query-filter.dto';
import { EquipmentFamilyQueryFilterDto } from '../dtos/equipment/equipment-family-query-filter.dto';
import { EquipmentTypeQueryFilterDto } from '../dtos/equipment/equipment-type-query-filter.dto';
import { UpdateEquipmentDomainDto } from '../dtos/equipment/update-equipment-domain.dto';
import { UpdateEquipmentFamilyDto } from '../dtos/equipment/update-equipment-family.dto';
import { UpdateEquipmentTypeDto } from '../dtos/equipment/update-equipment-type.dto';
import {
  EquipmentDomainResponse,
  EquipmentFamilyResponse,
  EquipmentTypeResponse,
} from '../types/equipment/equipment-response.types';
import { AbstractBetService } from './abstract-bet.service';

@Injectable()
export class EquipmentService extends AbstractBetService {
  constructor(
    protected readonly configService: ApiConfigService,
    protected readonly httpService: HttpService,
  ) {
    super(configService, httpService);
  }

  // Equipment Types Methods
  async createEquipmentType(createDto: CreateEquipmentTypeDto): Promise<EquipmentTypeResponse> {
    return this.makeBetRequest<EquipmentTypeResponse>({
      method: 'POST',
      endpoint: 'equipment/types',
      payload: createDto,
    });
  }

  async findAllEquipmentTypes(query: EquipmentTypeQueryFilterDto): Promise<PaginatedList<EquipmentTypeResponse>> {
    return this.makeBetRequest<PaginatedList<EquipmentTypeResponse>, EquipmentTypeQueryFilterDto>({
      method: 'GET',
      endpoint: 'equipment/types',
      params: query,
    });
  }

  async findOneEquipmentTypeById(id: number): Promise<EquipmentTypeResponse> {
    return this.makeBetRequest<EquipmentTypeResponse>({
      method: 'GET',
      endpoint: `equipment/types/${id}`,
    });
  }

  async findOneEquipmentTypeBySerialNumber(serialNumber: string): Promise<EquipmentTypeResponse> {
    return this.makeBetRequest<EquipmentTypeResponse>({
      method: 'GET',
      endpoint: `equipment/types/serial/${serialNumber}`,
    });
  }

  async updateEquipmentType(id: number, updateDto: UpdateEquipmentTypeDto): Promise<EquipmentTypeResponse> {
    return this.makeBetRequest<EquipmentTypeResponse>({
      method: 'PATCH',
      endpoint: `equipment/types/${id}`,
      payload: updateDto,
    });
  }

  async softDeleteEquipmentType(id: number): Promise<{ message: string; id: number }> {
    return this.makeBetRequest<{ message: string; id: number }>({
      method: 'DELETE',
      endpoint: `equipment/types/${id}`,
    });
  }

  async restoreEquipmentType(id: number): Promise<{ message: string; id: number }> {
    return this.makeBetRequest<{ message: string; id: number }>({
      method: 'PATCH',
      endpoint: `equipment/types/${id}/restore`,
    });
  }

  // Equipment Domains Methods
  async createEquipmentDomain(createDto: CreateEquipmentDomainDto): Promise<EquipmentDomainResponse> {
    return this.makeBetRequest<EquipmentDomainResponse>({
      method: 'POST',
      endpoint: 'equipment/domains',
      payload: createDto,
    });
  }

  async findAllEquipmentDomains(query: EquipmentDomainQueryFilterDto): Promise<PaginatedList<EquipmentDomainResponse>> {
    return this.makeBetRequest<PaginatedList<EquipmentDomainResponse>, EquipmentDomainQueryFilterDto>({
      method: 'GET',
      endpoint: 'equipment/domains',
      params: query,
    });
  }

  async findOneEquipmentDomainById(id: number): Promise<EquipmentDomainResponse> {
    return this.makeBetRequest<EquipmentDomainResponse>({
      method: 'GET',
      endpoint: `equipment/domains/${id}`,
    });
  }

  async findOneEquipmentDomainBySerialNumber(serialNumber: string): Promise<EquipmentDomainResponse> {
    return this.makeBetRequest<EquipmentDomainResponse>({
      method: 'GET',
      endpoint: `equipment/domains/serial/${serialNumber}`,
    });
  }

  async updateEquipmentDomain(id: number, updateDto: UpdateEquipmentDomainDto): Promise<EquipmentDomainResponse> {
    return this.makeBetRequest<EquipmentDomainResponse>({
      method: 'PATCH',
      endpoint: `equipment/domains/${id}`,
      payload: updateDto,
    });
  }

  async softDeleteEquipmentDomain(id: number): Promise<{ message: string; id: number }> {
    return this.makeBetRequest<{ message: string; id: number }>({
      method: 'DELETE',
      endpoint: `equipment/domains/${id}`,
    });
  }

  async restoreEquipmentDomain(id: number): Promise<{ message: string; id: number }> {
    return this.makeBetRequest<{ message: string; id: number }>({
      method: 'PATCH',
      endpoint: `equipment/domains/${id}/restore`,
    });
  }

  // Equipment Families Methods
  async createEquipmentFamily(createDto: CreateEquipmentFamilyDto): Promise<EquipmentFamilyResponse> {
    return this.makeBetRequest<EquipmentFamilyResponse>({
      method: 'POST',
      endpoint: 'equipment/families',
      payload: createDto,
    });
  }

  async findAllEquipmentFamilies(
    query: EquipmentFamilyQueryFilterDto,
  ): Promise<PaginatedList<EquipmentFamilyResponse>> {
    return this.makeBetRequest<PaginatedList<EquipmentFamilyResponse>, EquipmentFamilyQueryFilterDto>({
      method: 'GET',
      endpoint: 'equipment/families',
      params: query,
    });
  }

  async findOneEquipmentFamilyById(id: number): Promise<EquipmentFamilyResponse> {
    return this.makeBetRequest<EquipmentFamilyResponse>({
      method: 'GET',
      endpoint: `equipment/families/${id}`,
    });
  }

  async findOneEquipmentFamilyBySerialNumber(serialNumber: string): Promise<EquipmentFamilyResponse> {
    return this.makeBetRequest<EquipmentFamilyResponse>({
      method: 'GET',
      endpoint: `equipment/families/serial/${serialNumber}`,
    });
  }

  async updateEquipmentFamily(id: number, updateDto: UpdateEquipmentFamilyDto): Promise<EquipmentFamilyResponse> {
    return this.makeBetRequest<EquipmentFamilyResponse>({
      method: 'PATCH',
      endpoint: `equipment/families/${id}`,
      payload: updateDto,
    });
  }

  async softDeleteEquipmentFamily(id: number): Promise<{ message: string; id: number }> {
    return this.makeBetRequest<{ message: string; id: number }>({
      method: 'DELETE',
      endpoint: `equipment/families/${id}`,
    });
  }

  async restoreEquipmentFamily(id: number): Promise<{ message: string; id: number }> {
    return this.makeBetRequest<{ message: string; id: number }>({
      method: 'PATCH',
      endpoint: `equipment/families/${id}/restore`,
    });
  }
}
