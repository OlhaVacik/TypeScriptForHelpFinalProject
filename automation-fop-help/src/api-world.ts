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

    public async cleanupIncomes(): Promise<void> {
        const [profile, profileResp] = await this.fpApi.getProfile();
        if (profileResp.status() !== 200 || !profile) {
            console.warn('Failed to load profile or profile is empty');
            return;
        }

        const monthKeys = Object.keys(profile);
        let totalDeleted = 0;

        for (const monthKey of monthKeys) {
            const incomes = profile[monthKey];
            const autotestIncomes = incomes.filter(income => income.Comment?.startsWith('autotest-'));

            for (const income of autotestIncomes) {
                const [, deleteResp] = await this.fpApi.getDeleteMyIncome(income);
                if (deleteResp.status() === 200) {
                    totalDeleted++;
                } else {
                    console.warn(`Failed to delete income ID: ${income.ID}`);
                }
            }
        }

        console.log(`Cleanup finished. Total deleted: ${totalDeleted}`);
    }
}
