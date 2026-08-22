import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly container: Locator;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipInput: Locator;
  readonly cardNumberInput: Locator;
  readonly placeOrderButton: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('checkout-container');
    this.fullNameInput = page.getByTestId('checkout-full-name-input');
    this.emailInput = page.getByTestId('checkout-email-input');
    this.addressInput = page.getByTestId('checkout-address-input');
    this.cityInput = page.getByTestId('checkout-city-input');
    this.stateInput = page.getByTestId('checkout-state-input');
    this.zipInput = page.getByTestId('checkout-zip-input');
    this.cardNumberInput = page.getByTestId('checkout-card-number-input');
    this.placeOrderButton = page.getByTestId('checkout-place-order-button');
    this.emptyState = page.getByTestId('checkout-empty-state');
  }

  async goto(): Promise<void> {
    await this.page.goto('/checkout');
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }
}
