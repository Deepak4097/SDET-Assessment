import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {

    readonly productsTitle = this.page.locator('h2.title:text("All Products")');
    readonly searchInput = this.page.locator('#search_product');
    readonly searchButton = this.page.locator('#submit_search');
    readonly searchedProductsTitle = this.page.locator('h2.title.text-center');
    readonly productCards = this.page.locator('.features_items .product-image-wrapper');
    readonly productNames = this.page.locator('.features_items .productinfo p');
    readonly viewCartLink = this.page.locator("div.modal-content a[href='/view_cart']");
    readonly continueShoppingButton = this.page.locator(".modal-footer .btn-success");

    constructor(page: Page) {
        super(page);
    }

    async verifyProductsPageLoaded() {

        await expect(this.page).toHaveURL(/products/);
        await expect(this.productsTitle).toHaveText("All Products");

    }

    async searchProduct(productName: string) {

        await this.fill(this.searchInput, productName);
        await this.click(this.searchButton);
        await expect(this.searchedProductsTitle).toBeVisible();

    }

    async verifySearchResults(productName: string) {

        const products = this.productNames;

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

        await this.click(this.viewCartLink);

    }

    async addProductToCart(productId: string) {

        const card = this.page.locator(`.product-image-wrapper:has(a[data-product-id="${productId}"])`);
        await card.hover();
        await card.locator(`.product-overlay a[data-product-id="${productId}"]`).click();
    }

    async clickContinueShopping() {

        await this.click(this.continueShoppingButton);

    }
}