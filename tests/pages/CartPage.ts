import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly container: Locator;
  readonly subtotal: Locator;
  readonly checkoutButton: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('cart-container');
    this.subtotal = page.getByTestId('cart-subtotal');
    this.checkoutButton = page.getByTestId('cart-checkout-button');
    this.emptyState = page.getByTestId('cart-empty-state');
  }

  async goto(): Promise<void> {
    await this.page.goto('/cart');
  }

  getCartItem(productId: number | string): Locator {
    return this.page.getByTestId(`cart-item-${productId}`);
  }

  getItemQuantity(productId: number | string): Locator {
    return this.page.getByTestId(`cart-item-${productId}-quantity`);
  }

  async increaseQuantity(productId: number | string): Promise<void> {
    await this.page.getByTestId(`cart-item-${productId}-increase`).click();
  }

  async decreaseQuantity(productId: number | string): Promise<void> {
    await this.page.getByTestId(`cart-item-${productId}-decrease`).click();
  }

  async removeItem(productId: number | string): Promise<void> {
    await this.page.getByTestId(`cart-item-${productId}-remove`).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
