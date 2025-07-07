import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from '@src/config/services/api-config.service';
import { ProvidersName } from '../types/base-providers.types';
import { BaseProviderService } from './base-provider.service';

@Injectable()
export class InventoryService extends BaseProviderService {
  constructor(
    protected readonly configService: ApiConfigService,
    protected readonly httpService: HttpService,
  ) {
    super(ProvidersName.BET, configService, httpService);
  }
}
