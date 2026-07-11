import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CHECKOUT_LOCATORS } from "../locators/checkoutLocators";

export class CheckoutPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }


    async verifyCheckoutPageLoaded() {
        await this.waitForVisible(CHECKOUT_LOCATORS.addressSection);
    }

    async addOrderComment(comment: string) {
        await this.fill(CHECKOUT_LOCATORS.commentBox, comment);
    }

    async clickPlaceOrder() {
        await this.click(CHECKOUT_LOCATORS.placeOrderButton);
    }


    async verifyProductName(productName: string) {
        await expect(this.page.locator(CHECKOUT_LOCATORS.productName))
            .toContainText(productName);
    }

    async verifyProductQuantity(quantity: string) {
        await expect(this.page.locator(CHECKOUT_LOCATORS.productQuantity))
            .toHaveText(quantity);
    }

    async verifyProductPrice(price: string) {
        await expect(this.page.locator(CHECKOUT_LOCATORS.productPrice))
            .toContainText(price);
    }


    async completePayment(payment: {
        nameOnCard: string;
        cardNumber: string;
        cvc: string;
        expiryMonth: string;
        expiryYear: string;
    }) {

        await this.fill(CHECKOUT_LOCATORS.nameOnCard, payment.nameOnCard);
        await this.fill(CHECKOUT_LOCATORS.cardNumber, payment.cardNumber);
        await this.fill(CHECKOUT_LOCATORS.cvc, payment.cvc);
        await this.fill(CHECKOUT_LOCATORS.expiryMonth, payment.expiryMonth);
        await this.fill(CHECKOUT_LOCATORS.expiryYear, payment.expiryYear);

        await this.click(CHECKOUT_LOCATORS.payButton);
    }


    async verifyOrderPlacedSuccessfully() {
        await expect(this.page.locator(CHECKOUT_LOCATORS.orderPlacedMessage))
            .toHaveText("Order Placed!");
    }

    async clickContinue() {
        await this.click(CHECKOUT_LOCATORS.continueButton);
    }
}