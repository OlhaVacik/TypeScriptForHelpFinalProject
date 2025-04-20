export interface ConfigDto {
    auth: AuthConfigDto;
    api: ApiConfigDto;
}

export interface AuthConfigDto {
    fopHelpApi: FopHelpApiAuthConfigDto;
}

export interface FopHelpApiAuthConfigDto {
    userName: string;
    password: string;
    token?: string;
}

export interface ApiConfigDto {
    fopHelpApi: FopHelpApiConfigDto;
}

export interface FopHelpApiConfigDto {
    baseUrl: string;
    loginUrl: string;
}
