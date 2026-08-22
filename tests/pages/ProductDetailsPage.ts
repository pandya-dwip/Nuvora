import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly container: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly stockStatus: Locator;
  readonly quantityInput: Locator;
  readonly quantityIncreaseBtn: Locator;
  readonly quantityDecreaseBtn: Locator;
  readonly addToCartBtn: Locator;
  readonly wishlistBtn: Locator;
  readonly notFoundState: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('product-details-container');
    this.productName = page.getByTestId('product-details-name');
    this.productPrice = page.getByTestId('product-details-price');
    this.stockStatus = page.getByTestId('product-details-stock');
    this.quantityInput = page.getByTestId('product-details-quantity-input');
    this.quantityIncreaseBtn = page.getByTestId('product-details-quantity-increase');
    this.quantityDecreaseBtn = page.getByTestId('product-details-quantity-decrease');
    this.addToCartBtn = page.getByTestId('product-details-add-to-cart-button');
    this.wishlistBtn = page.getByTestId('product-details-wishlist-button');
    this.notFoundState = page.getByTestId('product-details-not-found');
  }

  async goto(productId: number | string): Promise<void> {
    await this.page.goto(`/product/${productId}`);
  }

  async increaseQuantity(): Promise<void> {
    await this.quantityIncreaseBtn.click();
  }

  async decreaseQuantity(): Promise<void> {
    await this.quantityDecreaseBtn.click();
  }

  async addToCart(): Promise<void> {
    await this.addToCartBtn.click();
  }

  async toggleWishlist(): Promise<void> {
    await this.wishlistBtn.click();
  }
}
