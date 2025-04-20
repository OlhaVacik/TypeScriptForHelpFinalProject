import { APIRequestContext, APIResponse } from 'playwright';
import { IApiService } from './interfaces/i-api.service';

export class PlaywrightApiService implements IApiService {
    public constructor(
        private requestContext: APIRequestContext,
        private baseUrl: string
    ) {}

    public async get(uri: string, params?: Record<string, string | number | boolean>): Promise<APIResponse> {
        return this.requestContext.get(uri, {
            params,
            headers: {
                Accept: 'application/json',
                'Accept-Charset': 'utf-8'
            }
        });
    }

    public async post(uri: string, body: unknown, headers?: Record<string, string>): Promise<APIResponse> {
        return this.requestContext.post(uri, {
            data: body,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...headers
            }
        });
    }

    public async delete(uri: string, headers?: Record<string, string>): Promise<APIResponse> {
        return this.requestContext.delete(uri, {
            headers: {
                Accept: 'application/json',
                ...headers
            }
        });
    }
}
