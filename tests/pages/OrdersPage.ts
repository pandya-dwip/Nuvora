import { Page, Locator } from '@playwright/test';

export class OrdersPage {
  readonly page: Page;
  readonly container: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('orders-container');
  }

  async goto(): Promise<void> {
    await this.page.goto('/orders');
  }

  getOrderCard(orderId: string): Locator {
    return this.page.getByTestId(`order-card-${orderId}`);
  }
}
