import { Page, Locator } from '@playwright/test';

export class OrderDetailsPage {
  readonly page: Page;
  readonly container: Locator;
  readonly orderIdText: Locator;
  readonly accessDeniedState: Locator;
  readonly notFoundState: Locator;
  readonly cancelOrderBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('order-details-container');
    this.orderIdText = page.getByTestId('order-details-id');
    this.accessDeniedState = page.getByTestId('order-details-access-denied');
    this.notFoundState = page.getByTestId('order-details-not-found');
    this.cancelOrderBtn = page.getByTestId('order-details-cancel-button');
  }

  async goto(orderId: string): Promise<void> {
    await this.page.goto(`/orders/${orderId}`);
  }

  getStepBadge(stepLabel: string): Locator {
    return this.page.getByTestId(`order-details-step-${stepLabel.toLowerCase()}`);
  }
}
