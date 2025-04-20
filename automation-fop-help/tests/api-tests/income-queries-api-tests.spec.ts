import { Browser, chromium } from 'playwright';
import { ApiWorld } from 'src/api-world';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('Fop Help Api income tests', () => {
    let api: ApiWorld;
    let browser: Browser;
    let createdIncomeId: string;

    beforeAll(async () => {
        browser = await chromium.launch();
        const context = await browser.newContext();
        api = new ApiWorld();
        await api.init(context);
        await api.uiLogin();
    }, 30000);

    afterAll(async () => {
        await browser.close();
    });

    it('Creating new income', async () => {
        const [new_income, response] = await api.fpApi.getAddNewIncome();

        expect(response.status()).toBe(200);
        expect(new_income).toBeDefined();

        const createdDate = '2025-04-19';
        const createdComment = 'тест-дата-почні податки';

        const [profile, profileResponse] = await api.fpApi.getProfile();
        expect(profileResponse.status()).toBe(200);

        const firstMonthKey = Object.keys(profile ?? {})[0];
        const records = profile?.[firstMonthKey] ?? [];

        const createdIncome = records.find(record =>
            record.Date.startsWith(createdDate) && record.Comment === createdComment
        );

        createdIncomeId = createdIncome?.ID ?? '';
    });

    it('Updating my income', async () => {
        const [update_income, response] = await api.fpApi.getUpdateMyIncome(createdIncomeId);

        expect(response.status()).toBe(200);
        expect(update_income).toBeDefined();
    });

    it('Delete my income', async () => {
        const [update_income, response] = await api.fpApi.getDeleteMyIncome(createdIncomeId);

        expect(response.status()).toBe(200);
        expect(update_income).toBeDefined();
    });
});
