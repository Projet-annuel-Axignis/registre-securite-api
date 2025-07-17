import { HttpService } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { ApiConfigService } from '@src/config/services/api-config.service';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { ProvidersName, MakeRequestArgs } from '../types/base-providers.types';
import { BaseProviderService } from './base-provider.service';

/**
 * BET API error response interface
 */
export interface BetApiErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  details?: Record<string, unknown>;
}

/**
 * Type guard to check if an object is a BET API error response
 */
function isBetApiErrorResponse(obj: unknown): obj is BetApiErrorResponse {
  return obj !== null && typeof obj === 'object' && 'statusCode' in obj && 'message' in obj && 'error' in obj;
}

/**
 * Abstract service class for BET API operations
 * Provides common functionality for making requests to the BET API
 * with automatic error handling and proper HTTP status code propagation
 */
export abstract class AbstractBetService extends BaseProviderService {
  constructor(
    protected readonly configService: ApiConfigService,
    protected readonly httpService: HttpService,
  ) {
    super(ProvidersName.BET, configService, httpService);
  }

  /**
   * Make a request to the BET API and handle error responses properly
   * This method automatically throws HTTP exceptions with correct status codes
   *
   * @template Response - The expected response type
   * @template RequestParams - The request parameters type (defaults to Record<string, string | number>)
   * @template RequestBody - The request body type (defaults to AxiosRequestConfig['data'])
   * @param args - The request arguments
   * @returns Promise<Response> - The response data
   * @throws HttpException - When the BET API returns an error
   */
  protected async makeBetRequest<
    Response,
    RequestParams = Record<string, string | number>,
    RequestBody = AxiosRequestConfig['data'],
  >(args: MakeRequestArgs<RequestBody, RequestParams>): Promise<Response> {
    try {
      return await super.makeRequest<Response, RequestParams, RequestBody>(args);
    } catch (error: unknown) {
      // If it's an Axios error with response data, handle BET API errors
      if (error instanceof AxiosError && error.response?.data) {
        const betError = error.response.data as BetApiErrorResponse;

        // If it's a BET API error response with statusCode, throw HTTP exception
        if (isBetApiErrorResponse(betError)) {
          throw new HttpException(betError, error.response.status);
        }

        // For other BET API errors, throw with the original status code
        throw new HttpException(betError, error.response.status);
      }

      // For other errors, re-throw them
      throw error;
    }
  }
}
