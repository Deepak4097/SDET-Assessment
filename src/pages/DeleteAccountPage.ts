import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { DELETE_ACCOUNT_LOCATORS } from "../locators/deleteAccountLocators";

export class DeleteAccountPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async verifyAccountDeleted() {

        await expect(
            this.page.locator(DELETE_ACCOUNT_LOCATORS.accountDeletedText)
        ).toHaveText("Account Deleted!");

    }

    async clickContinue() {

        await this.click(DELETE_ACCOUNT_LOCATORS.continueButton);

        await this.waitForPageLoad();

    }

}