import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ACCOUNT_CREATED_LOCATORS } from "../locators/accountCreatedLocators";

export class AccountCreatedPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async verifyAccountCreated() {

        await expect(
            this.page.locator(ACCOUNT_CREATED_LOCATORS.accountCreatedText)
        ).toHaveText("Account Created!");

    }

    async clickContinue() {

        await this.click(ACCOUNT_CREATED_LOCATORS.continueButton);

        await this.waitForPageLoad();

    }

}