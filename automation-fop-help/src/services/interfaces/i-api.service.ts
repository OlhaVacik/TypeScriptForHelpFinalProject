import { APIResponse } from 'playwright';

export interface IApiService {
    get(uri: string, params?: Record<string, string | number | boolean>, headers?: Record<string, string>): Promise<APIResponse>;
    post(uri: string, body: unknown, headers?: Record<string, string>): Promise<APIResponse>;
    delete(uri: string, headers?: Record<string, string>): Promise<APIResponse>;
}
