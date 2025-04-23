import { Locator } from 'playwright';

export class FopHelpHeaderElement {
    private get headerElement(): Locator {
        return this.baseLocator.locator('a');

    }

    public constructor(private readonly baseLocator: Locator) {}

    public async getHeaderNames(): Promise<string[]> {
        const items = await this.headerElement.all();
        const names: string[] = [];

        for (const item of items) {
            const text = await item.textContent();
            names.push(text?.trim() ?? '');
        }

        return names;
    }

    public async selectHeader(headerName: string | RegExp): Promise<void> {
        const headerItems = await this.headerElement.all();

        for (const item of headerItems) {
            const text = await item.textContent();
            const trimmedText = text?.trim() ?? '';

            if (typeof headerName === 'string') {
                if (trimmedText === headerName) {
                    await item.click();
                    return;
                }
            } else {
                if (headerName.test(trimmedText)) {
                    await item.click();
                    return;
                }
            }
        }
        throw new Error(`Header "${headerName}" not found`);
    }
}
