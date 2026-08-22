import { Page, Locator } from '@playwright/test';

export class AdminOrderDetailsPage {
  readonly page: Page;
  readonly container: Locator;
  readonly statusSelect: Locator;
  readonly statusBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('admin-order-details-container');
    this.statusSelect = page.getByTestId('admin-order-details-status-select');
    this.statusBadge = page.getByTestId('admin-order-details-status-badge');
  }

  async goto(orderId: string): Promise<void> {
    await this.page.goto(`/admin/orders/${orderId}`);
  }

  async selectStatus(status: string): Promise<void> {
    await this.statusSelect.selectOption(status);
  }
}
