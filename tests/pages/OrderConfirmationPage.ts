import { Page, Locator } from '@playwright/test';

export class OrderConfirmationPage {
  readonly page: Page;
  readonly container: Locator;
  readonly successMessage: Locator;
  readonly orderIdText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('order-confirmation-container');
    this.successMessage = page.getByTestId('order-success-message');
    this.orderIdText = page.getByTestId('order-id');
  }

  async getOrderId(): Promise<string> {
    const rawText = await this.orderIdText.innerText();
    return rawText.replace('#', '').trim();
  }
}
