import { Locator } from 'playwright';

export class FopHelpNavigatePanelElement {
    private get navigatePanelElement(): Locator {
        return this.baseLocator.locator('ul li');

    }

    public constructor(private readonly baseLocator: Locator) {}

    public async getNavigatePanelNames(): Promise<string[]> {
        const menuItems = await this.navigatePanelElement.all();
        const menuNames: string[] = [];

        for (const item of menuItems) {
            const text = await item.textContent();
            menuNames.push(text?.trim() ?? '');
        }

        return menuNames;
    }

    public async selectMenu(menuName: string): Promise<void> {
        const menuItems = await this.navigatePanelElement.all();

        for (const item of menuItems) {
            const text = await item.textContent();
            if (text?.trim() === menuName) {
                await item.click();
                return;
            }
        }
        throw new Error(`Menu item "${menuName}" not found`);
    }
}
