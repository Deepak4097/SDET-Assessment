import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    readonly signupName= this.page.locator('input[data-qa="signup-name"]');
    readonly signupEmail=this.page.locator('input[data-qa="signup-email"]') ;
    readonly signupButton=this.page.locator('button[data-qa="signup-button"]') ;
    readonly loginEmail=this.page.locator('input[data-qa="login-email"]') ;
    readonly loginPassword=this.page.locator('input[data-qa="login-password"]') ;
    readonly loginButton=this.page.locator('button[data-qa="login-button"]') ;
    readonly newUserSignupText=this.page.locator('text=New User Signup!') ;
    readonly loginToYourAccountText=this.page.locator('text=Login to your account') ;
    readonly loginErrorMessage=this.page.locator('text=Your email or password is incorrect!') ;

    constructor(page: Page) {
        super(page);
    
    }
    
    async verifyLoginPageLoaded() {
        
    await expect(this.page).toHaveURL(/.*login/);
    await this.waitForVisible(this.loginEmail);
    await this.waitForVisible(this.loginToYourAccountText);
}

    async startSignup(name: string, email: string) {

    await this.fill(this.signupName, name);
    await this.fill(this.signupEmail, email);
    await this.click(this.signupButton);
}

    async login(email: string, password: string) {

    await this.fill(this.loginEmail, email);
    await this.fill(this.loginPassword, password);
    await this.click(this.loginButton);
    await this.waitForPageLoad();
}

}