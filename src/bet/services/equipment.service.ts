import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from '@src/config/services/api-config.service';
import { AbstractBetService, BetApiErrorResponse } from './abstract-bet.service';
import { PaginatedList } from '@src/paginator/paginator.type';
import { EquipmentFamilyQueryFilterDto } from '../dtos/equipment/equipment-family-query-filter.dto';
import { CreateEquipmentTypeDto } from '../dtos/equipment/create-equipment-type.dto';
import { EquipmentTypeQueryFilterDto } from '../dtos/equipment/equipment-type-query-filter.dto';
import { UpdateEquipmentTypeDto } from '../dtos/equipment/update-equipment-type.dto';
import { CreateEquipmentDomainDto } from '../dtos/equipment/create-equipment-domain.dto';
import { EquipmentDomainQueryFilterDto } from '../dtos/equipment/equipment-domain-query-filter.dto';
import { UpdateEquipmentDomainDto } from '../dtos/equipment/update-equipment-domain.dto';
import { CreateEquipmentFamilyDto } from '../dtos/equipment/create-equipment-family.dto';
import { UpdateEquipmentFamilyDto } from '../dtos/equipment/update-equipment-family.dto';
import { CommonGet } from '../types/common-response.types';

@Injectable()
export class EquipmentService extends AbstractBetService {
  constructor(
    protected readonly configService: ApiConfigService,
    protected readonly httpService: HttpService,
  ) {
    super(configService, httpService);
  }

  // Equipment Types Methods
  async createEquipmentType(createDto: CreateEquipmentTypeDto): Promise<CommonGet | BetApiErrorResponse> {
    return this.makeBetRequest<CommonGet>({
      method: 'POST',
      endpoint: 'equipment/types',
      payload: createDto,
    });
  }

  async findAllEquipmentTypes(
    query: EquipmentTypeQueryFilterDto,
  ): Promise<PaginatedList<CommonGet> | BetApiErrorResponse> {
    return this.makeBetRequest<PaginatedList<CommonGet>, EquipmentTypeQueryFilterDto>({
      method: 'GET',
      endpoint: 'equipment/types',
      params: query,
    });
  }

  async findOneEquipmentTypeById(id: number): Promise<CommonGet | BetApiErrorResponse> {
    return this.makeBetRequest<CommonGet>({
      method: 'GET',
      endpoint: `equipment/types/${id}`,
    });
  }

  async findOneEquipmentTypeBySerialNumber(serialNumber: string): Promise<CommonGet | BetApiErrorResponse> {
    return this.makeBetRequest<CommonGet>({
      method: 'GET',
      endpoint: `equipment/types/serial/${serialNumber}`,
    });
  }

  async updateEquipmentType(id: number, updateDto: UpdateEquipmentTypeDto): Promise<CommonGet | BetApiErrorResponse> {
    return this.makeBetRequest<CommonGet>({
      method: 'PATCH',
      endpoint: `equipment/types/${id}`,
      payload: updateDto,
    });
  }

  async softDeleteEquipmentType(id: number): Promise<{ message: string; id: number } | BetApiErrorResponse> {
    return this.makeBetRequest<{ message: string; id: number }>({
      method: 'DELETE',
      endpoint: `equipment/types/${id}`,
    });
  }

  async restoreEquipmentType(id: number): Promise<{ message: string; id: number } | BetApiErrorResponse> {
    return this.makeBetRequest<{ message: string; id: number }>({
      method: 'PATCH',
      endpoint: `equipment/types/${id}/restore`,
    });
  }

  // Equipment Domains Methods
  async createEquipmentDomain(createDto: CreateEquipmentDomainDto): Promise<CommonGet> {
    return this.makeRequest<CommonGet>({
      method: 'POST',
      endpoint: 'equipment/domains',
      payload: createDto,
    });
  }

  async findAllEquipmentDomains(query: EquipmentDomainQueryFilterDto): Promise<PaginatedList<CommonGet>> {
    return this.makeRequest<PaginatedList<CommonGet>, EquipmentDomainQueryFilterDto>({
      method: 'GET',
      endpoint: 'equipment/domains',
      params: query,
    });
  }

  async findOneEquipmentDomainById(id: number): Promise<CommonGet> {
    return this.makeRequest<CommonGet>({
      method: 'GET',
      endpoint: `equipment/domains/${id}`,
    });
  }

  async findOneEquipmentDomainBySerialNumber(serialNumber: string): Promise<CommonGet> {
    return this.makeRequest<CommonGet>({
      method: 'GET',
      endpoint: `equipment/domains/serial/${serialNumber}`,
    });
  }

  async updateEquipmentDomain(id: number, updateDto: UpdateEquipmentDomainDto): Promise<CommonGet> {
    return this.makeRequest<CommonGet>({
      method: 'PATCH',
      endpoint: `equipment/domains/${id}`,
      payload: updateDto,
    });
  }

  async softDeleteEquipmentDomain(id: number): Promise<{ message: string; id: number }> {
    return this.makeRequest<{ message: string; id: number }>({
      method: 'DELETE',
      endpoint: `equipment/domains/${id}`,
    });
  }

  async restoreEquipmentDomain(id: number): Promise<{ message: string; id: number }> {
    return this.makeRequest<{ message: string; id: number }>({
      method: 'PATCH',
      endpoint: `equipment/domains/${id}/restore`,
    });
  }

  // Equipment Families Methods
  async createEquipmentFamily(createDto: CreateEquipmentFamilyDto): Promise<CommonGet> {
    return this.makeRequest<CommonGet>({
      method: 'POST',
      endpoint: 'equipment/families',
      payload: createDto,
    });
  }

  async findAllEquipmentFamilies(query: EquipmentFamilyQueryFilterDto): Promise<PaginatedList<CommonGet>> {
    return this.makeRequest<PaginatedList<CommonGet>, EquipmentFamilyQueryFilterDto>({
      method: 'GET',
      endpoint: 'equipment/families',
      params: query,
    });
  }

  async findOneEquipmentFamilyById(id: number): Promise<CommonGet> {
    return this.makeRequest<CommonGet>({
      method: 'GET',
      endpoint: `equipment/families/${id}`,
    });
  }

  async findOneEquipmentFamilyBySerialNumber(serialNumber: string): Promise<CommonGet> {
    return this.makeRequest<CommonGet>({
      method: 'GET',
      endpoint: `equipment/families/serial/${serialNumber}`,
    });
  }

  async updateEquipmentFamily(id: number, updateDto: UpdateEquipmentFamilyDto): Promise<CommonGet> {
    return this.makeRequest<CommonGet>({
      method: 'PATCH',
      endpoint: `equipment/families/${id}`,
      payload: updateDto,
    });
  }

  async softDeleteEquipmentFamily(id: number): Promise<{ message: string; id: number }> {
    return this.makeRequest<{ message: string; id: number }>({
      method: 'DELETE',
      endpoint: `equipment/families/${id}`,
    });
  }

  async restoreEquipmentFamily(id: number): Promise<{ message: string; id: number }> {
    return this.makeRequest<{ message: string; id: number }>({
      method: 'PATCH',
      endpoint: `equipment/families/${id}/restore`,
    });
  }
}
