import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { PRODUCTS_LOCATORS } from "../locators/productsLocators";

export class ProductsPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async verifyProductsPageLoaded() {

       await expect(this.page).toHaveURL(/products/);

        await expect(
            this.page.locator(PRODUCTS_LOCATORS.productsTitle)
        ).toHaveText("All Products");

    }

    async searchProduct(productName: string) {

        await this.fill(PRODUCTS_LOCATORS.searchInput, productName);
        await this.click(PRODUCTS_LOCATORS.searchButton);

        await expect(
            this.page.locator(PRODUCTS_LOCATORS.searchedProductsTitle)
        ).toBeVisible();

    }

    async verifySearchResults(productName: string) {

        const products = this.page.locator(PRODUCTS_LOCATORS.productNames);

        const count = await products.count();

        expect(count).toBeGreaterThan(0);

        let matchingProductFound = false;

        for (let i = 0; i < count; i++) {

            const text = await products.nth(i).textContent();

            if (text?.toLowerCase().includes(productName.toLowerCase())) {

                matchingProductFound = true;
                break;

            }

        }

        expect(matchingProductFound).toBeTruthy();

    }



async clickViewCart() {

    await this.click(PRODUCTS_LOCATORS.viewCartLink);

}

async addProductToCart(productId: string) {

    const card = this.page.locator(
        `.product-image-wrapper:has(a[data-product-id="${productId}"])`
    );

    await card.hover();

    await card.locator(
        `.product-overlay a[data-product-id="${productId}"]`
    ).click();
}

async clickContinueShopping() {

    await this.click(PRODUCTS_LOCATORS.continueShoppingButton);

}
}