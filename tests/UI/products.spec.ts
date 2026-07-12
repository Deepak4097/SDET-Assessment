import { test } from "@playwright/test";
import { HomePage } from "../../src/pages/HomePage";
import { ProductsPage } from "../../src/pages/ProductsPage";
import { CartPage } from "../../src/pages/CartPage";
import { PRODUCTS } from "../../src/testData/products";

test.describe("Products", () => {

    test("TC06 - Search Product", async ({ page }) => {

        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);

        await homePage.navigateToHome();
        
        await homePage.verifyHomePageLoaded();

        await homePage.clickProducts();
        
        await productsPage.verifyProductsPageLoaded();

        await productsPage.searchProduct(PRODUCTS.SEARCH_KEYWORD);

        await productsPage.verifySearchResults(PRODUCTS.SEARCH_KEYWORD);
    });

    test("TC07 - Add Product to Cart", async ({ page }) => {

        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await homePage.navigateToHome();
        
        await homePage.verifyHomePageLoaded();

        await homePage.clickProducts();
        
        await productsPage.verifyProductsPageLoaded();

        await productsPage.addProductToCart(PRODUCTS.BLUE_TOP.id);
        
        await productsPage.clickViewCart();

        await cartPage.verifyProductAddedToCart(PRODUCTS.BLUE_TOP.name);
        
        await cartPage.verifyProductQuantity(PRODUCTS.BLUE_TOP.name, "1");
    });

    test("TC08 - Add Multiple Products to Cart", async ({ page }) => {

        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await homePage.navigateToHome();
        
        await homePage.clickProducts();
        
        await productsPage.verifyProductsPageLoaded();

        await productsPage.addProductToCart(PRODUCTS.BLUE_TOP.id);
        
        await productsPage.clickContinueShopping();

        await productsPage.addProductToCart(PRODUCTS.MEN_TSHIRT.id);

        await productsPage.clickViewCart();

        await cartPage.verifyProductAddedToCart(PRODUCTS.BLUE_TOP.name);
        
        await cartPage.verifyProductAddedToCart(PRODUCTS.MEN_TSHIRT.name);

        await cartPage.verifyProductQuantity(PRODUCTS.BLUE_TOP.name, "1");
        
        await cartPage.verifyProductQuantity(PRODUCTS.MEN_TSHIRT.name, "1");
    });

    test("TC10 - Remove Product from Cart", async ({ page }) => {

        const homePage = new HomePage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await homePage.navigateToHome();
        
        await homePage.verifyHomePageLoaded();

        await homePage.clickProducts();
        
        await productsPage.verifyProductsPageLoaded();

        await productsPage.addProductToCart(PRODUCTS.BLUE_TOP.id);
        
        await productsPage.clickContinueShopping();

        await homePage.clickCart();

        await cartPage.verifyProductAddedToCart(PRODUCTS.BLUE_TOP.name);

        await cartPage.removeProduct();

        await cartPage.verifyProductRemoved(PRODUCTS.BLUE_TOP.name);
    });

});