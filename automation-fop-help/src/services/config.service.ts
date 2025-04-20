import * as dotenv from 'dotenv-safe';
import { AuthConfigDto, ConfigDto, ApiConfigDto } from '../dto/config.dto';

export class ConfigService {
    public constructor() {
        dotenv.config();
    }

    public getConfig(): ConfigDto {
        const authConfig = this.getAuthConfig();
        const apiConfig = this.getApiConfig();

        return {
            auth: authConfig,
            api: apiConfig
        };
    }

    private getAuthConfig(): AuthConfigDto {
        return {
            fopHelpApi: {
                userName: process.env.FH_USER_NAME ? process.env.FH_USER_NAME : '',
                password: process.env.FH_PASSWORD ? process.env.FH_PASSWORD : '',
                token: ''
            }
        };
    }

    private getApiConfig(): ApiConfigDto {
        return {
            fopHelpApi: {
                baseUrl: 'https://new.fophelp.pro',
                loginUrl: 'https://new.fophelp.pro/api/react/Authenticate/login'
            }
        };
    }
}
