import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { User } from "../model/User";

export class SignupPage extends BasePage {

    readonly signupName= this.page.locator('input[data-qa="signup-name"]');


    readonly accountInformationHeading = this.page.locator( 'text=Enter Account Information');
    readonly titleMr = this.page.locator('#id_gender1');
    readonly titleMrs=  this.page.locator('#id_gender2');
    readonly password= this.page.locator('#password');
    readonly dayDropdown= this.page.locator('#days');
    readonly monthDropdown= this.page.locator( '#months');
    readonly yearDropdown= this.page.locator( '#years');
    readonly newsletterCheckbox= this.page.locator( '#newsletter');
    readonly specialOffersCheckbox= this.page.locator( '#optin');
    readonly firstName= this.page.locator('#first_name');
    readonly lastName= this.page.locator( '#last_name');
    readonly company= this.page.locator('#company');
    readonly address1= this.page.locator('#address1');
    readonly address2= this.page.locator('#address2');
    readonly countryDropdown= this.page.locator( '#country');
    readonly state= this.page.locator( '#state');
    readonly city= this.page.locator( '#city');
    readonly zipcode= this.page.locator('#zipcode');
    readonly mobileNumber= this.page.locator( '#mobile_number');
    readonly createAccountButton= this.page.locator('button[data-qa="create-account"]');
    readonly accountCreatedText= this.page.locator('h2[data-qa="account-created"]');


    constructor(page: Page) {
        super(page);
    }

    async verifySignupPageLoaded() {

        await this.waitForVisible(this.accountInformationHeading);
        await expect(this.accountInformationHeading).toBeVisible();
    }

    async registerUser(user: User) {

        if (user.title === "Mr") {
            await this.check(this.titleMr);
        } else {
            await this.check(this.titleMrs);
        }

        await this.fill(this.password, user.password);
        await this.selectByValue(this.dayDropdown, user.birth_date);
        await this.selectByLabel(this.monthDropdown, user.birth_month);
        await this.selectByValue(this.yearDropdown, user.birth_year);
        await this.fill(this.firstName, user.firstname);
        await this.fill(this.lastName, user.lastname);
        await this.fill(this.company, user.company);
        await this.fill(this.address1, user.address1);
        await this.fill(this.address2, user.address2);
        await this.selectByLabel(this.countryDropdown, user.country);
        await this.fill(this.state, user.state);
        await this.fill(this.city, user.city);
        await this.fill(this.zipcode, user.zipcode);
        await this.fill(this.mobileNumber, user.mobile_number);
        await this.click(this.createAccountButton);
        await this.waitForPageLoad();
    }
    
}