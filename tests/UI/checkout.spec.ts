import { test } from "@playwright/test";

import { HomePage } from "../../src/pages/HomePage";
import { LoginPage } from "../../src/pages/LoginPage";
import { ProductsPage } from "../../src/pages/ProductsPage";
import { CartPage } from "../../src/pages/CartPage";
import { CheckoutPage } from "../../src/pages/CheckoutPage";

import { USERS } from "../../src/testData/users";
import { PRODUCTS } from "../../src/testData/products";
import { PAYMENT } from "../../src/testData/payment";

test.describe("Checkout", () => {

    test("TA11 - Complete full checkout flow as logged in user", async ({ page }) => {

        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await homePage.navigateToHome();
        await homePage.verifyHomePageLoaded();

        await homePage.clickSignupLogin();
        await loginPage.verifyLoginPageLoaded();

        await loginPage.login(
            USERS.VALID_USER.email,
            USERS.VALID_USER.password
        );

        await homePage.verifyLoggedInUser();

        await homePage.clickProducts();
        await productsPage.verifyProductsPageLoaded();

        await productsPage.addProductToCart(PRODUCTS.MEN_TSHIRT.id);

        await productsPage.clickViewCart();

        await cartPage.clickProceedToCheckout();

        await checkoutPage.verifyCheckoutPageLoaded();

        await checkoutPage.addOrderComment(PAYMENT.comment);

        await checkoutPage.clickPlaceOrder();

        await checkoutPage.completePayment(PAYMENT);

        await checkoutPage.verifyOrderPlacedSuccessfully();

    });

    test("TA12 - Proceed to checkout as guest user", async ({ page }) => {

        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await homePage.navigateToHome();
        await homePage.verifyHomePageLoaded();

        await homePage.clickProducts();
        await productsPage.verifyProductsPageLoaded();

        await productsPage.addProductToCart(PRODUCTS.MEN_TSHIRT.id);

        await productsPage.clickViewCart();

        await cartPage.clickProceedToCheckout();

        await cartPage.verifyCheckoutLoginPrompt();

    });

    test("TA13 - Verify order details before placing the order", async ({ page }) => {

        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await homePage.navigateToHome();
        await homePage.verifyHomePageLoaded();

        await homePage.clickSignupLogin();
        await loginPage.verifyLoginPageLoaded();

        await loginPage.login(
            USERS.VALID_USER.email,
            USERS.VALID_USER.password
        );

        await homePage.verifyLoggedInUser();

        await homePage.clickProducts();
        await productsPage.verifyProductsPageLoaded();

        await productsPage.addProductToCart(PRODUCTS.MEN_TSHIRT.id);

        await productsPage.clickViewCart();

        await cartPage.clickProceedToCheckout();

        await checkoutPage.verifyCheckoutPageLoaded();

        await checkoutPage.verifyProductName(PRODUCTS.MEN_TSHIRT.name);

        await checkoutPage.verifyProductPrice(PRODUCTS.MEN_TSHIRT.price);

        await checkoutPage.verifyProductQuantity("1");

    });

});