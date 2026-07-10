import { test } from "@playwright/test";

import { DataGenerator } from "../../src/utils/dynamicDataGenerator";

import { HomePage } from "../../src/pages/HomePage";
import { LoginPage } from "../../src/pages/LoginPage";
import { SignupPage } from "../../src/pages/SignupPage";
import { AccountCreatedPage } from "../../src/pages/AccountCreatedPage";
import { DeleteAccountPage } from "../../src/pages/DeleteAccountPage";

test("TC01 - Register User", async ({ page }) => {

    const user = DataGenerator.generateUser();

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const deleteAccountPage = new DeleteAccountPage(page);
    await homePage.navigateToHome();

    await homePage.verifyHomePageLoaded();

    await homePage.clickSignupLogin();

    await loginPage.verifyLoginPageLoaded();

    await loginPage.startSignup(
        user.name,
        user.email
    );

    await signupPage.verifySignupPageLoaded();

    await signupPage.registerUser(user);

    await accountCreatedPage.verifyAccountCreated();

    await accountCreatedPage.clickContinue();

    await homePage.verifyLoggedInUser(user.name);
    
    await homePage.clickDeleteAccount();

    await deleteAccountPage.verifyAccountDeleted();

    await deleteAccountPage.clickContinue();

});

