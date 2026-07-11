export const CHECKOUT_LOCATORS = {

    // Checkout page
    addressSection: '[data-qa="checkout-info"]',
    deliveryAddress: '#address_delivery',
    billingAddress: '#address_invoice',

    commentBox: 'textarea[name="message"]',

    placeOrderButton: 'a.check_out',

    // Review Order
    productName: '.cart_description h4 a',
    productPrice: '.cart_price p',
    productQuantity: '.cart_quantity button',
    productTotal: '.cart_total_price',

    // Payment Page
    nameOnCard: '[data-qa="name-on-card"]',
    cardNumber: '[data-qa="card-number"]',
    cvc: '[data-qa="cvc"]',
    expiryMonth: '[data-qa="expiry-month"]',
    expiryYear: '[data-qa="expiry-year"]',
    payButton: '[data-qa="pay-button"]',

    // Success
    orderPlacedMessage: '[data-qa="order-placed"]',
    continueButton: '[data-qa="continue-button"]'
};