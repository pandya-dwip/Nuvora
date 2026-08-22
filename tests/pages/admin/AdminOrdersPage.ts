import { Page, Locator } from '@playwright/test';

export class AdminOrdersPage {
  readonly page: Page;
  readonly container: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('admin-orders-container');
    this.searchInput = page.getByTestId('admin-orders-search-input');
  }

  async goto(): Promise<void> {
    await this.page.goto('/admin/orders');
  }

  getOrderViewButton(orderId: string): Locator {
    return this.page.getByTestId(`admin-order-view-button-${orderId}`);
  }

  async viewOrder(orderId: string): Promise<void> {
    await this.getOrderViewButton(orderId).click();
  }
}
