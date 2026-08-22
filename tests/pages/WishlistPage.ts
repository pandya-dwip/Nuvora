import { Page, Locator } from '@playwright/test';

export class WishlistPage {
  readonly page: Page;
  readonly container: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('wishlist-container');
    this.emptyState = page.getByTestId('wishlist-empty-state');
  }

  async goto(): Promise<void> {
    await this.page.goto('/wishlist');
  }

  getWishlistItem(productId: number | string): Locator {
    return this.page.getByTestId(`wishlist-item-${productId}`);
  }

  async removeProduct(productId: number | string): Promise<void> {
    await this.page.getByTestId(`wishlist-remove-${productId}`).click();
  }

  async addProductToCart(productId: number | string): Promise<void> {
    await this.page.getByTestId(`wishlist-add-to-cart-${productId}`).click();
  }
}
