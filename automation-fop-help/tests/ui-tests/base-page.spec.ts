import { test, expect, BrowserContext, Page } from '@playwright/test';
import { ApiWorld } from 'src/api-world';
import { FopHelpBasePage } from 'src/pages/base.page';

test.describe('UI tests', () => {
    let context: BrowserContext;
    let apiWorld: ApiWorld;
    let page: Page;
    let basePage: FopHelpBasePage;

    test.beforeEach(async ({ browser }) => {
        context = await browser.newContext();
        apiWorld = new ApiWorld();
        await apiWorld.init(context);
        await apiWorld.uiLogin();
        page = await context.newPage();
        basePage = new FopHelpBasePage(page);
    });

    test.afterEach(async () => {
        await context.close();
    });

    test('User can open main page', async () => {
        await page.goto('https://new.fophelp.pro/');

        await expect(page.getByRole('link', { name: 'FOP.help(new)' })).toBeVisible();;
    });

    test('Header should display correct menu items', async () => {
        await page.goto('https://new.fophelp.pro/');

        const headerNames = await basePage.header.getHeaderNames();

        expect(headerNames).toContain('FOP.help(new)');
        expect(headerNames).toContain('Домашня');
        expect(headerNames.some(name => name.includes('Вітаю, '))).toBe(true);
        expect(headerNames).toContain('Вийти');
    });

    test('Navigation panel should display correct menu items', async () => {
        await page.goto('https://new.fophelp.pro/');

        const navigatePanelNames = await basePage.navigatePanel.getNavigatePanelNames();

        expect(navigatePanelNames).toContain('Прибутки');
        expect(navigatePanelNames).toContain('Витрати');
        expect(navigatePanelNames).toContain('Податки');
        expect(navigatePanelNames).toContain('Звіти');
        expect(navigatePanelNames).toContain('Основи для розрахунку');
    });

    test('User can navigate using the navigate panel', async () => {
        await page.goto('https://new.fophelp.pro/');

        await basePage.navigatePanel.selectMenu('Витрати');
        await expect(page).toHaveURL(/.*expenses/);
    });

    test('User can navigate using header links', async () => {
        await page.goto('https://new.fophelp.pro/');

        await basePage.header.selectHeader(/Вітаю, /);
        await expect(page).toHaveURL(/.*profile/);
    });

    test('Selecting non-existent menu item should throw error', async () => {
        await page.goto('https://new.fophelp.pro/');

        await expect(basePage.navigatePanel.selectMenu('Non Existent Menu')).rejects.toThrow('Menu item "Non Existent Menu" not found');
    });

    test('Selecting non-existent header item should throw error', async () => {
        await page.goto('https://new.fophelp.pro/');

        await expect(basePage.header.selectHeader('Non Existent Menu')).rejects.toThrow('Header "Non Existent Menu" not found');
    });
});
