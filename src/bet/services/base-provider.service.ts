import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { ApiConfigService } from '@src/config/services/api-config.service';
import { AxiosError, AxiosRequestConfig } from 'axios';
import _ from 'lodash';
import { firstValueFrom } from 'rxjs';
import { HandleErrorArgs, LogRequestArgs, MakeRequestArgs, ProvidersName } from '../types/base-providers.types';

export abstract class BaseProviderService {
  protected readonly logger: Logger;

  constructor(
    private readonly serviceName: ProvidersName,
    protected readonly configService: ApiConfigService,
    protected readonly httpService: HttpService,
  ) {
    this.logger = new Logger(`${serviceName.toUpperCase()} SERVICE`);
  }

  protected getServiceConfig() {
    return {
      baseUrl: this.configService.get(`apis.${this.serviceName}.base_url`),
      apiKey: this.configService.get(`apis.${this.serviceName}.api_key`),
    };
  }

  private logRequest<Payload, Params>({ method, url, payload, params }: LogRequestArgs<Payload, Params>) {
    const safeParams = params ?? {};
    const paramsInfo = _.isEmpty(safeParams) ? 'without params' : `with ${Object.keys(safeParams).length} params`;
    const payloadInfo = _.isEmpty(payload) ? 'without body' : 'with body';
    this.logger.debug(`${method.toUpperCase()} to ${url} ${paramsInfo} and ${payloadInfo}`);
  }

  private handleError<Payload, Params>({ error, method, url, payload, params }: HandleErrorArgs<Payload, Params>) {
    const isAxiosError = error instanceof AxiosError;
    const errorDetails = isAxiosError ? `${error.message}` : `${JSON.stringify(error)} (not an AxiosError)`;

    this.logger.error(`An error occurred while making a ${method} request to ${url}: ${errorDetails}`);

    if (params) {
      this.logger.debug(`Params >> ${JSON.stringify(params)}`);
    }
    if (payload) {
      this.logger.debug(`Payload >> ${JSON.stringify(payload)}`);
    }

    if (isAxiosError && error.response?.data) {
      this.logger.debug(`Response ${error.response.status} >> ${JSON.stringify(error.response.data)}`);
    }
  }

  protected async getHeaders(): Promise<AxiosRequestConfig['headers']> {
    const headers: AxiosRequestConfig['headers'] = {
      'Content-Type': 'application/json',
    };
    const { apiKey } = this.getServiceConfig();
    headers['X-API-KEY'] = apiKey;

    return Promise.resolve(headers);
  }

  protected async makeRequest<
    Response,
    RequestParams = Record<string, string | number>,
    RequestBody = AxiosRequestConfig['data'],
  >({
    method = 'GET',
    endpoint,
    params,
    payload,
    auth,
  }: MakeRequestArgs<RequestBody, RequestParams>): Promise<Response> {
    const { baseUrl } = this.getServiceConfig();
    const url = `${baseUrl}/${endpoint}`;
    this.logRequest({ method, url, payload, params });

    try {
      return (
        await firstValueFrom(
          this.httpService.request<Response>({
            url,
            method,
            data: payload,
            params,
            headers: await this.getHeaders(),
            auth,
          }),
        )
      ).data;
    } catch (error: unknown) {
      this.handleError({ error, url, method, payload, params });
      throw error;
    }
  }
}
