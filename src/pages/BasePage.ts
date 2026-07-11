import { Locator, Page, expect } from "@playwright/test";

export class BasePage {

    constructor(protected page: Page) { }

    async goto(path: string) {
        await this.page.goto(path);
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState("domcontentloaded");
    }

    async click(locator: string | Locator) {
        if (typeof locator === "string") {
            await this.page.locator(locator).click();
        } else {
            await locator.click();
        }
    }

    async fill(locator: string | Locator, value: string) {
        if (typeof locator === "string") {
            await this.page.locator(locator).fill(value);
        } else {
            await locator.fill(value);
        }
    }

    async getText(locator: string | Locator): Promise<string> {
        if (typeof locator === "string") {
            return (await this.page.locator(locator).textContent()) ?? "";
        }

        return (await locator.textContent()) ?? "";
    }

    async isVisible(locator: string | Locator): Promise<boolean> {
        if (typeof locator === "string") {
            return await this.page.locator(locator).isVisible();
        }

        return await locator.isVisible();
    }

    async waitForVisible(locator: string | Locator) {
        if (typeof locator === "string") {
            await expect(this.page.locator(locator)).toBeVisible();
        } else {
            await expect(locator).toBeVisible();
        }
    }

    async waitForURL(url: string) {
        await expect(this.page).toHaveURL(url);
    }

    async selectByValue(locator: string | Locator, value: string) {
        if (typeof locator === "string") {
            await this.page.locator(locator).selectOption(value);
        } else {
            await locator.selectOption(value);
        }
    }

    async selectByLabel(locator: string | Locator, label: string) {
        if (typeof locator === "string") {
            await this.page.locator(locator).selectOption({ label });
        } else {
            await locator.selectOption({ label });
        }
    }

    async check(locator: string | Locator) {
        if (typeof locator === "string") {
            await this.page.locator(locator).check();
        } else {
            await locator.check();
        }
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async expectVisible(locator: string) {
    await expect(this.page.locator(locator)).toBeVisible();
}

}