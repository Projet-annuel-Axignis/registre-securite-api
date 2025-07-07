import { HttpService } from '@nestjs/axios';
import { ApiConfigService } from '@src/config/services/api-config.service';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { ProvidersName, MakeRequestArgs } from '../types/base-providers.types';
import { BaseProviderService } from './base-provider.service';

// Define BET API error response interface
export interface BetApiErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  details?: Record<string, unknown>;
}

export abstract class AbstractBetService extends BaseProviderService {
  constructor(
    protected readonly configService: ApiConfigService,
    protected readonly httpService: HttpService,
  ) {
    super(ProvidersName.BET, configService, httpService);
  }

  /**
   * Make a request to the BET API and return the original error if it occurs
   * This method handles BET-specific error responses
   */
  protected async makeBetRequest<
    Response,
    RequestParams = Record<string, string | number>,
    RequestBody = AxiosRequestConfig['data'],
  >(args: MakeRequestArgs<RequestBody, RequestParams>): Promise<Response | BetApiErrorResponse> {
    try {
      return await super.makeRequest<Response, RequestParams, RequestBody>(args);
    } catch (error: unknown) {
      // If it's an Axios error with response data, return the original BET API error
      if (error instanceof AxiosError && error.response?.data) {
        return error.response.data as BetApiErrorResponse;
      }

      // For other errors, re-throw them
      throw error;
    }
  }
}
