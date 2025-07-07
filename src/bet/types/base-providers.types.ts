import { AxiosBasicCredentials, Method } from 'axios';

export enum ProvidersName {
  BET = 'bet',
}

export interface LogRequestArgs<Payload, Params> {
  method: Method;
  url: string;
  payload?: Payload;
  params?: Params;
}

export interface HandleErrorArgs<Payload, Params> extends LogRequestArgs<Payload, Params> {
  error: unknown;
}

export interface MakeRequestArgs<Payload, Params> extends Pick<LogRequestArgs<Payload, Params>, 'payload' | 'params'> {
  endpoint: string;
  method?: Method;
  auth?: AxiosBasicCredentials;
}
