import { Page, Locator } from '@playwright/test';

export class ProductCardComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getCard(productId: number | string): Locator {
    return this.page.getByTestId(`product-card-${productId}`);
  }

  getWishlistButton(productId: number | string): Locator {
    return this.page.getByTestId(`product-wishlist-${productId}`);
  }

  getAddToCartButton(productId: number | string): Locator {
    return this.page.getByTestId(`product-add-to-cart-${productId}`);
  }

  getNameLink(productId: number | string): Locator {
    return this.page.getByTestId(`product-name-${productId}`);
  }

  getPrice(productId: number | string): Locator {
    return this.page.getByTestId(`product-price-${productId}`);
  }

  async clickAddToCart(productId: number | string): Promise<void> {
    await this.getAddToCartButton(productId).click();
  }

  async clickWishlist(productId: number | string): Promise<void> {
    await this.getWishlistButton(productId).click();
  }

  async clickName(productId: number | string): Promise<void> {
    await this.getNameLink(productId).click();
  }
}
