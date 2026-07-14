import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
   
    readonly homeLogo = this.page.locator('img[alt="Website for automation practice"]');
    readonly signupLoginLink= this.page.locator( 'a[href="/login"]');
    readonly logoutLink = this.page.locator( 'a[href="/logout"]');
    readonly productsLink = this.page.locator( 'a[href="/products"]');
    readonly cartLink = this.page.locator('a[href="/view_cart"] i.fa-shopping-cart');
    readonly loggedInUser = this.page.locator('a:has-text("Logged in as")');
    readonly continueButton=this.page.locator('a[data-qa="continue-button"]')

    constructor(page: Page) {
        super(page);
    }

    async navigateToHome() {

        await this.goto("/");
    }

    async verifyHomePageLoaded() {

        await this.waitForVisible(this.homeLogo);
    }

    async clickSignupLogin() {

        await this.click(this.signupLoginLink);
    }


    async clickProducts() {

        await this.click(this.productsLink);
        await this.page.waitForLoadState("domcontentloaded");

        for (let attempt = 0; attempt < 2; attempt++) {
            if (!this.page.url().includes("#google_vignette")) {
                return;
            }

            await this.page.goto("/products", {
                waitUntil: "domcontentloaded",
                timeout: 10000
            });
        }

        throw new Error("Unable to navigate to Products page due to Google vignette redirect.");
    }

    async clickCart() {

        await this.click(this.cartLink);
    }

 
    async verifyLoggedInUser(userName: any) {
        
        let loggedInUserName:string=  " Logged in as "+userName; 
        await expect(this.loggedInUser).toHaveText(loggedInUserName);
    }
    async clickLogout() {

        await this.click(this.logoutLink);
        await this.waitForPageLoad();
    }

    async clickContinue() {

        await this.click(this.continueButton);
        await this.waitForPageLoad();

    }

}
