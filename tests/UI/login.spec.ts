import { test,expect } from "@playwright/test";
import { HomePage } from "../../src/pages/HomePage";
import { LoginPage } from "../../src/pages/LoginPage";
import { USERS } from "../../src/testData/users";

test.describe("Authentication", () => {

    test("TC02 - Login with valid credentials", async ({ page }) => {

        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homePage.navigateToHome();
        
        await homePage.verifyHomePageLoaded();

        await homePage.clickSignupLogin();

        await loginPage.verifyLoginPageLoaded();

        await loginPage.login(USERS.VALID_USER.email,USERS.VALID_USER.password);

        await homePage.verifyLoggedInUser(USERS.VALID_USER.name);

    });

    test("TC03 - Login with invalid credentials", async ({ page }) => {

        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homePage.navigateToHome();
        
        await homePage.verifyHomePageLoaded();

        await homePage.clickSignupLogin();

        await loginPage.verifyLoginPageLoaded();

        await loginPage.login(USERS.INVALID_USER.email,USERS.INVALID_USER.password);

        await expect(loginPage.loginErrorMessage).toBeVisible();

    });

    test("TC04 - Login with valid email and invalid password", async ({ page }) => {

        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homePage.navigateToHome();
        
        await homePage.verifyHomePageLoaded();

        await homePage.clickSignupLogin();

        await loginPage.verifyLoginPageLoaded();

        await loginPage.login(USERS.VALID_USER.email,USERS.INVALID_USER.password);

        await expect(loginPage.loginErrorMessage).toBeVisible();

    });

    test("TC05 - Logout User", async ({ page }) => {

        const homePage = new HomePage(page);

        const loginPage = new LoginPage(page);

        await homePage.navigateToHome();

        await homePage.verifyHomePageLoaded();

        await homePage.clickSignupLogin();

        await loginPage.verifyLoginPageLoaded();

        await loginPage.login(USERS.VALID_USER.email,USERS.VALID_USER.password);

        await homePage.verifyLoggedInUser(USERS.VALID_USER.name);

        await homePage.clickLogout();

        await loginPage.verifyLoginPageLoaded();

    });

});