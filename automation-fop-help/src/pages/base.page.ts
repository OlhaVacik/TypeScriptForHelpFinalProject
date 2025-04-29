import { Page } from '@playwright/test';
import { FopHelpHeaderElement } from 'src/elements/header.element';
import { FopHelpNavigatePanelElement } from 'src/elements/navigate-panel.elements';


export class FopHelpBasePage {
    public constructor(protected readonly page: Page) {}

    public get navigatePanel(): FopHelpNavigatePanelElement {
        return new FopHelpNavigatePanelElement(this.page.locator('nav[role="navigation"]'));
    }

    public get header(): FopHelpHeaderElement {
        return new FopHelpHeaderElement(this.page.locator('nav div.container'));
    }
}
