import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from '@src/config/services/api-config.service';
import { AbstractBetService } from './abstract-bet.service';

@Injectable()
export class InventoryService extends AbstractBetService {
  constructor(
    protected readonly configService: ApiConfigService,
    protected readonly httpService: HttpService,
  ) {
    super(configService, httpService);
  }
}
