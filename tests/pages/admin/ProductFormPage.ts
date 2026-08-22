import { Page, Locator } from '@playwright/test';

export interface ProductFormData {
  name?: string;
  category?: string;
  price?: number | string;
  originalPrice?: number | string;
  stock?: number | string;
  description?: string;
  status?: string;
}

export class ProductFormPage {
  readonly page: Page;
  readonly container: Locator;
  readonly form: Locator;
  readonly titleInput: Locator;
  readonly categorySelect: Locator;
  readonly statusSelect: Locator;
  readonly priceInput: Locator;
  readonly originalPriceInput: Locator;
  readonly stockInput: Locator;
  readonly descriptionInput: Locator;
  readonly saveBtn: Locator;
  readonly cancelBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('admin-product-form-container');
    this.form = page.getByTestId('admin-product-form');
    this.titleInput = page.getByTestId('admin-product-title-input');
    this.categorySelect = page.getByTestId('admin-product-category-select');
    this.statusSelect = page.getByTestId('admin-product-status-select');
    this.priceInput = page.getByTestId('admin-product-price-input');
    this.originalPriceInput = page.getByTestId('admin-product-original-price-input');
    this.stockInput = page.getByTestId('admin-product-stock-input');
    this.descriptionInput = page.getByTestId('admin-product-description-input');
    this.saveBtn = page.getByTestId('admin-product-save-button');
    this.cancelBtn = page.getByTestId('admin-product-cancel-button');
  }

  async gotoNew(): Promise<void> {
    await this.page.goto('/admin/products/new');
  }

  async gotoEdit(productId: number | string): Promise<void> {
    await this.page.goto(`/admin/products/${productId}/edit`);
  }

  async fillForm(data: ProductFormData): Promise<void> {
    if (data.name !== undefined) {
      await this.titleInput.fill(data.name);
    }
    if (data.category !== undefined) {
      await this.categorySelect.selectOption(data.category);
    }
    if (data.status !== undefined) {
      await this.statusSelect.selectOption(data.status);
    }
    if (data.price !== undefined) {
      await this.priceInput.fill(String(data.price));
    }
    if (data.originalPrice !== undefined) {
      await this.originalPriceInput.fill(String(data.originalPrice));
    }
    if (data.stock !== undefined) {
      await this.stockInput.fill(String(data.stock));
    }
    if (data.description !== undefined) {
      await this.descriptionInput.fill(data.description);
    }
  }

  async submit(): Promise<void> {
    await this.saveBtn.click();
  }
}
