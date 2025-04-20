import { Browser, chromium } from 'playwright';
import { ApiWorld } from 'src/api-world';
import { IncomeByMonthDto } from 'src/dto/income.dto';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('Fop Help Api basic check test', () => {
    let api: ApiWorld;
    let browser: Browser;

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

    it('Receives profile users', async () => {
        const [json, response] = await api.fpApi.getProfile();

        expect(response.status()).toBe(200);

        expect(json).not.toBeNull();
        if (!json) {
            throw new Error('Received empty JSON');
        }

        const months = json as IncomeByMonthDto;
        expect(typeof months).toBe('object');

        const monthKeys = Object.keys(months);

        expect(monthKeys.length).toBeGreaterThan(0);

        for (const monthKey of monthKeys) {
            const incomes = months[monthKey];

            expect(Array.isArray(incomes)).toBe(true);
            expect(incomes.length).toBeGreaterThan(0);

            for (const income of incomes) {
                expect(typeof income.ID).toBe('string');
                expect(typeof income.Date).toBe('string');
                expect(typeof income.Income).toBe('number');
                expect(typeof income.Currency).toBe('string');
                expect(typeof income.Comment).toBe('string');
                expect(typeof income.Cash).toBe('boolean');
            }
        }
    });
});
