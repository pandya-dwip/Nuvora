import { Page, Locator } from '@playwright/test';

export class Header {
  readonly page: Page;
  readonly logo: Locator;
  readonly cartLink: Locator;
  readonly cartCount: Locator;
  readonly wishlistLink: Locator;
  readonly accountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByTestId('header-logo');
    this.cartLink = page.getByTestId('header-cart-link');
    this.cartCount = page.getByTestId('header-cart-count');
    this.wishlistLink = page.getByTestId('header-wishlist-link');
    this.accountLink = page.getByTestId('header-account-link');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async openWishlist(): Promise<void> {
    await this.wishlistLink.click();
  }

  async openAccount(): Promise<void> {
    await this.accountLink.click();
  }
}
