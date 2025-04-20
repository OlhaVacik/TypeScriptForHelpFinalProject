import { test, expect } from '@playwright/test';
import { ApiWorld } from 'src/api-world';


test('User can open main page', async ({browser}) => {
    const context = await browser.newContext();
    const api = new ApiWorld();
    await api.init(context);
    await api.uiLogin();

    const page = await context.newPage();
    await page.goto('https://new.fophelp.pro/');

    await expect(page.getByRole('link', { name: 'FOP.help(new)' })).toBeVisible();;
});
