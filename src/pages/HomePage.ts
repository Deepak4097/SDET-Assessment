import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { HOME_LOCATORS } from "../locators/homeLocators";

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async navigateToHome() {
        await this.goto("/");
    }

    async verifyHomePageLoaded() {
        await this.waitForVisible(HOME_LOCATORS.homeLogo);
    }

    async clickSignupLogin() {
        await this.click(HOME_LOCATORS.signupLoginLink);
    }

   

    async clickProducts() {
        await this.click(HOME_LOCATORS.productsLink);
    }

    async clickCart() {
        await this.click(HOME_LOCATORS.cartLink);
    }
    async clickDeleteAccount() {

    await this.click(HOME_LOCATORS.deleteAccountLink);

    await this.waitForPageLoad();


}
async verifyLoggedInUser() {
    await this.expectVisible(HOME_LOCATORS.loggedInUser);
}

async clickLogout() {
    await this.click(HOME_LOCATORS.logoutLink);
    await this.waitForPageLoad();
}

}
