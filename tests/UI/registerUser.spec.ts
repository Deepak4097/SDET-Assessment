import { test,expect } from "@playwright/test";
import { DataGenerator } from "../../src/utils/dynamicDataGenerator";
import { HomePage } from "../../src/pages/HomePage";
import { LoginPage } from "../../src/pages/LoginPage";
import { SignupPage } from "../../src/pages/SignupPage";

test("TC01 - Register User", async ({ page }) => {

    const user = DataGenerator.generateUser();
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    
    await homePage.navigateToHome();

    await homePage.verifyHomePageLoaded();

    await homePage.clickSignupLogin();

    await loginPage.verifyLoginPageLoaded();

    await loginPage.startSignup(user.name,user.email);

    await signupPage.verifySignupPageLoaded();

    await signupPage.registerUser(user);

    await expect(signupPage.accountCreatedText).toHaveText("Account Created!");
    
    await homePage.clickContinue();

    await homePage.verifyLoggedInUser(user.name);
    
});

