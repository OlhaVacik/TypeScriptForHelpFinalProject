import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Browser, chromium } from 'playwright';
import { ApiWorld } from 'src/api-world';

describe('Fop Help API: Integration Test', () => {
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

    it('should add income, reflect in taxes, pay it and see it in paid taxes', async () => {
        const [unpaidTaxesBefore, responseBefore] = await api.fpApi.getCurrentUnpaidTaxes();
        expect(responseBefore.status()).toBe(200);

        const q2Before = unpaidTaxesBefore?.['2025-Q2']?.[0];
        expect(q2Before).toBeDefined();

        const incomeBefore = Number(q2Before?.Incomes);

        const [, addResponse] = await api.fpApi.getAddNewIncome();
        expect(addResponse.status()).toBe(200);

        await new Promise(resolve => setTimeout(resolve, 3000));

        const [unpaidTaxesAfter] = await api.fpApi.getCurrentUnpaidTaxes();
        const q2After = unpaidTaxesAfter?.['2025-Q2']?.[0];
        expect(q2After).toBeDefined();

        expect(q2After?.Payed).toBe(false);
        const incomeAfter = Number(q2After?.Incomes);
        expect(incomeAfter).toBeGreaterThan(incomeBefore);

        const [, payResponse] = await api.fpApi.getAddPayTaxes(q2After!);
        expect(payResponse.status()).toBe(200);

        const [paidTaxes] = await api.fpApi.getPayedTaxes();
        const paidQ2 = paidTaxes?.['2025-Q2']?.find(tax => tax.Comment === q2After?.Comment);

        expect(paidQ2).toBeDefined();
        expect(paidQ2?.Payed).toBe(true);
    }, 70000);
});
