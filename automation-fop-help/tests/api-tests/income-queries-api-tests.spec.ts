import { Browser, chromium } from 'playwright';
import { ApiWorld } from 'src/api-world';
import { IncomeByMonthDto } from 'src/dto/income.dto';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('Fop Help Api income tests', () => {
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

    it('Create multiple autotest incomes', async () => {
        const incomesToCreate = 3;
        for (let i = 0; i < incomesToCreate; i++) {
            const now = Date.now();
            const comment = `autotest-${now}-${i}`;

            const [createdIncome, response] = await api.fpApi.getAddNewIncome(comment);
            console.log(await response.text());
            console.log(response.status());
            console.log(await response.json());
            console.log(await response.text());
            expect(response.status()).toBe(200);
            expect(createdIncome).toBeDefined();
        }
    });

    it('Updating random existing income via POST', async () => {
        const [profile, profileResponse] = await api.fpApi.getProfile();

        expect(profileResponse.status()).toBe(200);

        const firstMonthKey = Object.keys(profile ?? {})[0];
        const records = profile?.[firstMonthKey] ?? [];

        expect(records.length).toBeGreaterThan(0);

        const testIncomes = records.filter(record => record.Comment.startsWith('autotest-'));

        expect(testIncomes.length).toBeGreaterThan(0);

        const randomIncome = testIncomes[Math.floor(Math.random() * testIncomes.length)];

        expect(randomIncome).toBeDefined();

        const updatedIncome = {
            ...randomIncome,
            Comment: randomIncome.Comment + 'updated',
            Income: (Number(randomIncome.Income) + 1000).toString()
        };

        const [update_income, response] = await api.fpApi.getUpdateMyIncome(updatedIncome);

        expect(response.status()).toBe(200);
        expect(update_income).toBeDefined();
    });

    it('Delete random existing income via POST', async () => {
        const [profile, profileResponse] = await api.fpApi.getProfile();
        expect(profileResponse.status()).toBe(200);

        const firstMonthKey = Object.keys(profile ?? {})[0];
        const records = profile?.[firstMonthKey] ?? [];

        expect(records.length).toBeGreaterThan(0);

        const testIncomes = records.filter(record => record.Comment.startsWith('autotest-'));
        expect(testIncomes.length).toBeGreaterThan(0);

        const randomIncome = records[Math.floor(Math.random() * testIncomes.length)];
        expect(randomIncome).toBeDefined();

        const [delete_income, deleteResponse] = await api.fpApi.getDeleteMyIncome(randomIncome);
        expect(deleteResponse.status()).toBe(200);
        expect(delete_income).toBeDefined();

        const [updatedProfile] = await api.fpApi.getProfile();
        if (!updatedProfile) {
            throw new Error('Profile was not loaded');
        }
        const foundIncome = updatedProfile[firstMonthKey].find(record => record.ID === randomIncome.ID);

        expect(foundIncome).toBeUndefined();
    });
});
