import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CART_LOCATORS } from "../locators/cartLocators";

export class CartPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async verifyProductInCart(productName: string) {

        await expect(
            this.page.locator(CART_LOCATORS.productName)
        ).toContainText(productName);

    }

async verifyProductAddedToCart(productName: string) {

    const row = this.page.locator("tr").filter({
        hasText: productName
    });

    await expect(
        row.locator(CART_LOCATORS.productName)
    ).toHaveText(productName);

}

async verifyProductQuantity(productName: string, quantity: string) {

    const row = this.page.locator("tr").filter({
        hasText: productName
    });

    await expect(
        row.locator(CART_LOCATORS.quantity)
    ).toHaveText(quantity);

}

async removeProduct() {
    await this.page.locator(CART_LOCATORS.deleteButton).click();
}

async verifyProductRemoved(productName: string) {

    await expect(
        this.page.locator(CART_LOCATORS.productName).filter({
            hasText: productName
        })
    ).toHaveCount(0);

}

async clickProceedToCheckout() {
    await this.click(CART_LOCATORS.proceedToCheckoutButton);
}

async verifyCheckoutLoginPrompt() {

    await expect(this.page.locator(CART_LOCATORS.checkoutModal))
        .toBeVisible();

    await expect(this.page.locator(CART_LOCATORS.guestCheckoutText))
        .toContainText("Register / Login");

}

async clickRegisterLogin() {
    await this.click(CART_LOCATORS.registerLoginLink);
}

async continueShoppingFromModal() {
    await this.click(CART_LOCATORS.continueOnCartButton);
}

}