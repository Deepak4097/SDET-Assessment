import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {

    readonly productName = this.page.locator(".cart_description h4 a");
    readonly quantity = this.page.locator(".cart_quantity button");
    readonly deleteButton = this.page.locator(".cart_quantity_delete");
    readonly emptyCartMessage = this.page.locator("#empty_cart p");
    readonly proceedToCheckoutButton = this.page.locator(".check_out");
    readonly checkoutModal = this.page.locator("#checkoutModal");
    readonly registerLoginLink = this.page.locator('#checkoutModal a[href="/login"]');
    readonly continueOnCartButton = this.page.locator(".close-checkout-modal");
    readonly guestCheckoutText = this.page.locator('#checkoutModal .modal-body p:first-child');


    constructor(page: Page) {
        super(page);
    }

    async verifyProductInCart(productName: string) {

        await expect(this.productName).toContainText(productName);

    }

    async verifyProductAddedToCart(productName: string) {

        const row = this.page.locator("tr").filter({ hasText: productName });
        await expect(row.locator(this.productName)).toHaveText(productName);

    }

    async verifyProductQuantity(productName: string, quantity: string) {

        const row = this.page.locator("tr").filter({ hasText: productName });
        await expect(row.locator(this.quantity)).toHaveText(quantity);

    }

    async removeProduct() {
        await (this.deleteButton).click();
    }

    async verifyProductRemoved(productName: string) {

        await expect(this.productName.filter({ hasText: productName })).toHaveCount(0);
    }

    async clickProceedToCheckout() {

        await this.click(this.proceedToCheckoutButton);
    }

    async verifyCheckoutLoginPrompt() {

        await expect(this.checkoutModal).toBeVisible();
        await expect(this.guestCheckoutText).toContainText("Register / Login");

    }

    async clickRegisterLogin() {

        await this.click(this.registerLoginLink);
    }

    async continueShoppingFromModal() {

        await this.click(this.continueOnCartButton);
    }

}