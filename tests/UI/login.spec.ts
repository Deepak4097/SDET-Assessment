import { test } from "@playwright/test";
import { HomePage } from "../../src/pages/HomePage";
import { LoginPage } from "../../src/pages/LoginPage";
import { USERS, INVALID_PASSWORD } from "../../src/testData/users";

test.describe("Authentication", () => {

    test("TC02 - Login with valid credentials", async ({ page }) => {

        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homePage.navigateToHome();
        await homePage.verifyHomePageLoaded();

        await homePage.clickSignupLogin();
        await loginPage.verifyLoginPageLoaded();

        await loginPage.login(
            USERS.VALID_USER.email,
            USERS.VALID_USER.password
        );

        await homePage.verifyLoggedInUser();

    });

    test("TC03 - Login with invalid credentials", async ({ page }) => {

        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homePage.navigateToHome();
        await homePage.verifyHomePageLoaded();

        await homePage.clickSignupLogin();
        await loginPage.verifyLoginPageLoaded();

        await loginPage.login(
            USERS.INVALID_USER.email,
            USERS.INVALID_USER.password
        );

        await loginPage.verifyInvalidLoginError();

    });

    test("TC04 - Login with valid email and invalid password", async ({ page }) => {

        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homePage.navigateToHome();
        await homePage.verifyHomePageLoaded();

        await homePage.clickSignupLogin();
        await loginPage.verifyLoginPageLoaded();

        await loginPage.login(
            USERS.VALID_USER.email,
            INVALID_PASSWORD
        );

        await loginPage.verifyInvalidLoginError();

    });

    test("TC05 - Logout User", async ({ page }) => {

        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homePage.navigateToHome();
        await homePage.verifyHomePageLoaded();

        await homePage.clickSignupLogin();
        await loginPage.verifyLoginPageLoaded();

        await loginPage.login(
            USERS.VALID_USER.email,
            USERS.VALID_USER.password
        );

        await homePage.verifyLoggedInUser();

        await homePage.clickLogout();

        await loginPage.verifyLoginPageLoaded();

    });

});