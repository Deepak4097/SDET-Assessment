import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {

    readonly addressSection = this.page.locator('[data-qa="checkout-info"]');
    readonly deliveryAddress = this.page.locator( '#address_delivery');
    readonly billingAddress= this.page.locator('#address_invoice',);
    readonly commentBox = this.page.locator( 'textarea[name="message"]');
    readonly placeOrderButton = this.page.locator( 'a.check_out');
    readonly productName = this.page.locator( '.cart_description h4 a');
    readonly productPrice= this.page.locator( '.cart_price p');
    readonly productQuantity = this.page.locator( '.cart_quantity button');
    readonly productTotal = this.page.locator( '.cart_total_price');
    readonly nameOnCard = this.page.locator('[data-qa="name-on-card"]');
    readonly cardNumber = this.page.locator( '[data-qa="card-number"]');
    readonly cvc= this.page.locator( '[data-qa="cvc"]');
    readonly expiryMonth = this.page.locator( '[data-qa="expiry-month"]');
    readonly expiryYear = this.page.locator( '[data-qa="expiry-year"]');
    readonly payButton = this.page.locator( '[data-qa="pay-button"]');
    readonly orderPlacedMessage = this.page.locator( '[data-qa="order-placed"]');
    readonly continueButton = this.page.locator( '[data-qa="continue-button"]');

    constructor(page: Page) {
        super(page);
    }

    async verifyCheckoutPageLoaded() {

        await this.waitForVisible(this.addressSection);
    }

    async addOrderComment(comment: string) {

        await this.fill(this.commentBox, comment);
    }

    async clickPlaceOrder() {

        await this.click(this.placeOrderButton);
    }


    async verifyProductName(productName: string) {

        await expect(this.productName).toContainText(productName);
    }

    async verifyProductQuantity(quantity: string) {

        await expect(this.productQuantity).toHaveText(quantity);
    }

    async verifyProductPrice(price: string) {
        await expect(this.productPrice).toContainText(price);
    }


    async completePayment(payment: {

        nameOnCard: string;
        cardNumber: string;
        cvc: string;
        expiryMonth: string;
        expiryYear: string;
    }) {

        await this.fill(this.nameOnCard, payment.nameOnCard);
        await this.fill(this.cardNumber, payment.cardNumber);
        await this.fill(this.cvc, payment.cvc);
        await this.fill(this.expiryMonth, payment.expiryMonth);
        await this.fill(this.expiryYear, payment.expiryYear);
        await this.click(this.payButton);
    }

    async clickContinue() {

        await this.click(this.continueButton);
    }
}