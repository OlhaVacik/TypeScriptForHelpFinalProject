import { BrowserContext } from 'playwright';
import { FopHelpApi } from './apis/fop-help.api';
import { ConfigService } from './services/config.service';
import { IApiService } from './services/interfaces/i-api.service';
import { PlaywrightApiService } from './services/playwright-api.service';

export class ApiWorld {
    public testContext: Record<string, unknown> = {};
    public browserContext!: BrowserContext;
    private _fpApi?: FopHelpApi;
    private _fhApiService!: IApiService;
    private _configService: ConfigService;

    public constructor() {
        this._configService = new ConfigService();
    }

    public get fpApi(): FopHelpApi {
        if (!this._fpApi) {
            this._fpApi = new FopHelpApi(this._fhApiService);
        }
        return this._fpApi;
    }

    public get configService(): ConfigService {
        return this._configService;
    }

    public async init(browserContext: BrowserContext): Promise<void> {
        this.browserContext = browserContext;
        this._fhApiService = new PlaywrightApiService(browserContext.request, this.configService.getConfig().api.fopHelpApi.baseUrl);
    }

    public async uiLogin(): Promise<void> {
        const page = await this.browserContext.newPage();
        await page.goto('https://new.fophelp.pro/auth/login', { waitUntil: 'domcontentloaded' });
        await page.fill('input#email', this.configService.getConfig().auth.fopHelpApi.userName);
        await page.fill('input#password', this.configService.getConfig().auth.fopHelpApi.password);
        await page.click('button[type="submit"]');
        await page.waitForURL('**/incomes');
        await page.close();
    }
}
