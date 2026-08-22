import { Page, Locator } from '@playwright/test';

export class AdminInventoryPage {
  readonly page: Page;
  readonly container: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('admin-inventory-container');
    this.searchInput = page.getByTestId('admin-inventory-search-input');
  }

  async goto(): Promise<void> {
    await this.page.goto('/admin/inventory');
  }

  getStockInput(productId: number | string): Locator {
    return this.page.getByTestId(`admin-inventory-stock-input-${productId}`);
  }

  getIncreaseButton(productId: number | string): Locator {
    return this.page.getByTestId(`admin-inventory-increase-${productId}`);
  }

  getDecreaseButton(productId: number | string): Locator {
    return this.page.getByTestId(`admin-inventory-decrease-${productId}`);
  }

  async increaseStock(productId: number | string): Promise<void> {
    await this.getIncreaseButton(productId).click();
  }

  async decreaseStock(productId: number | string): Promise<void> {
    await this.getDecreaseButton(productId).click();
  }
}
