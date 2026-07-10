import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { LOGIN_LOCATORS } from "../locators/loginLocators";

export class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

   async verifyLoginPageLoaded() {
    await expect(this.page).toHaveURL(/.*login/);

    await this.waitForVisible(LOGIN_LOCATORS.loginEmail);

    await expect(
        this.page.locator(LOGIN_LOCATORS.loginToYourAccountText)
    ).toBeVisible();
}

    async startSignup(name: string, email: string) {

        await this.fill(LOGIN_LOCATORS.signupName, name);
        await this.fill(LOGIN_LOCATORS.signupEmail, email);
        await this.click(LOGIN_LOCATORS.signupButton);

    }

    async login(email: string, password: string) {

        await this.fill(LOGIN_LOCATORS.loginEmail, email);
        await this.fill(LOGIN_LOCATORS.loginPassword, password);
        await this.click(LOGIN_LOCATORS.loginButton);

        await this.waitForPageLoad();

    }

    async verifyInvalidLoginMessage() {

        await expect(this.page.locator(LOGIN_LOCATORS.loginErrorMessage))
            .toBeVisible();
    }

    async verifyInvalidLoginError() {

    await this.expectVisible(LOGIN_LOCATORS.loginErrorMessage);

}

    

}