import { Page, Locator } from '@playwright/test';

export class AdminProductsPage {
  readonly page: Page;
  readonly container: Locator;
  readonly searchInput: Locator;
  readonly addProductBtn: Locator;
  readonly productsTable: Locator;
  readonly deleteModal: Locator;
  readonly deleteConfirmBtn: Locator;
  readonly deleteCancelBtn: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('admin-products-container');
    this.searchInput = page.getByTestId('admin-products-search-input');
    this.addProductBtn = page.getByTestId('admin-products-add-button');
    this.productsTable = page.getByTestId('admin-products-table');
    this.deleteModal = page.getByTestId('admin-delete-product-modal');
    this.deleteConfirmBtn = page.getByTestId('admin-delete-product-confirm');
    this.deleteCancelBtn = page.getByTestId('admin-delete-product-cancel');
    this.noResultsMessage = page.getByTestId('admin-products-no-results');
  }

  async goto(): Promise<void> {
    await this.page.goto('/admin/products');
  }

  async searchProduct(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  getProductEditBtn(productId: number | string): Locator {
    return this.page.getByTestId(`admin-product-edit-button-${productId}`);
  }

  getProductDeleteBtn(productId: number | string): Locator {
    return this.page.getByTestId(`admin-product-delete-button-${productId}`);
  }

  getProductStatusToggle(productId: number | string): Locator {
    return this.page.getByTestId(`admin-product-status-toggle-${productId}`);
  }

  async clickAddProduct(): Promise<void> {
    await this.addProductBtn.click();
  }

  async clickEditProduct(productId: number | string): Promise<void> {
    await this.getProductEditBtn(productId).click();
  }

  async deleteProduct(productId: number | string): Promise<void> {
    await this.getProductDeleteBtn(productId).click();
    await this.deleteConfirmBtn.click();
  }
}
