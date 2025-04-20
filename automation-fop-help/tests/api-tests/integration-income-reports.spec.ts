import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Browser, chromium } from 'playwright';
import { ApiWorld } from 'src/api-world';

describe.skip('Fop Help API: Integration Test - Incomes Affect Report', () => {
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

    it.skip('should increase total income in report after creating a new income', async () => {
        const [reportBefore, reportResponseBefore] = await api.fpApi.getCurrentTaxesReports();
        expect(reportResponseBefore.status()).toBe(200);

        const incomeBefore = reportBefore?.['2025-Q2']?.[0]?.Incomes ?? 0;

        const createdComment = `тест-интеграция-${Math.floor(Math.random() * 10000)}`;
        const incomeAmount = 50000;

        const [createBody, createResponse] = await api.fpApi.addIncomeWithCustomCommentAndAmount(createdComment, incomeAmount);
        expect(createResponse.status()).toBe(200);
        expect(createBody).toBeDefined();

        await new Promise(resolve => setTimeout(resolve, 3000));

        const [reportAfter, reportResponseAfter] = await api.fpApi.getCurrentTaxesReports();
        expect(reportResponseAfter.status()).toBe(200);

        const incomeAfter = reportAfter?.['2025-Q2']?.[0]?.Incomes ?? 0;

        expect(incomeAfter).toBe(incomeBefore + incomeAmount);
    }, 50000);
});
