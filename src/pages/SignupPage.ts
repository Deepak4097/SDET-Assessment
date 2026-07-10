import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { SIGNUP_LOCATORS } from "../locators/signupLocators";
import { User } from "../model/User";

export class SignupPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async verifySignupPageLoaded() {
        await this.waitForVisible(SIGNUP_LOCATORS.accountInformationHeading);

        await expect(
            this.page.locator(SIGNUP_LOCATORS.accountInformationHeading)
        ).toBeVisible();
    }

    async registerUser(user: User) {

        // Title
        if (user.title === "Mr") {
            await this.check(SIGNUP_LOCATORS.titleMr);
        } else {
            await this.check(SIGNUP_LOCATORS.titleMrs);
        }

        // Account Information
        await this.fill(SIGNUP_LOCATORS.password, user.password);

        await this.selectByValue(
            SIGNUP_LOCATORS.dayDropdown,
            user.birth_date
        );

        await this.selectByLabel(
            SIGNUP_LOCATORS.monthDropdown,
            user.birth_month
        );

        await this.selectByValue(
            SIGNUP_LOCATORS.yearDropdown,
            user.birth_year
        );

        // Address Information
        await this.fill(SIGNUP_LOCATORS.firstName, user.firstname);
        await this.fill(SIGNUP_LOCATORS.lastName, user.lastname);
        await this.fill(SIGNUP_LOCATORS.company, user.company);
        await this.fill(SIGNUP_LOCATORS.address1, user.address1);
        await this.fill(SIGNUP_LOCATORS.address2, user.address2);

        await this.selectByLabel(
            SIGNUP_LOCATORS.countryDropdown,
            user.country
        );

        await this.fill(SIGNUP_LOCATORS.state, user.state);
        await this.fill(SIGNUP_LOCATORS.city, user.city);
        await this.fill(SIGNUP_LOCATORS.zipcode, user.zipcode);
        await this.fill(
            SIGNUP_LOCATORS.mobileNumber,
            user.mobile_number
        );

        await this.click(SIGNUP_LOCATORS.createAccountButton);

        await this.waitForPageLoad();
    }
}