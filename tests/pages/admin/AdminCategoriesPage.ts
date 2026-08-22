import { Page, Locator } from '@playwright/test';

export class AdminCategoriesPage {
  readonly page: Page;
  readonly container: Locator;
  readonly addCategoryBtn: Locator;
  readonly modal: Locator;
  readonly nameInput: Locator;
  readonly submitBtn: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;
  readonly categoriesTable: Locator;
  readonly inlineNameInput: Locator;
  readonly inlineSubmitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('admin-categories-container');
    this.addCategoryBtn = page.getByTestId('admin-categories-add-button');
    this.modal = page.getByTestId('admin-create-category-modal');
    this.nameInput = page.getByTestId('admin-category-name-input');
    this.submitBtn = page.getByTestId('admin-category-submit-button');
    this.successMessage = page.getByTestId('admin-category-success-message');
    this.errorMessage = page.getByTestId('admin-category-error-message');
    this.categoriesTable = page.getByTestId('admin-categories-table');
    this.inlineNameInput = page.getByTestId('admin-inline-category-name-input');
    this.inlineSubmitBtn = page.getByTestId('admin-inline-category-submit-button');
  }

  async goto(): Promise<void> {
    await this.page.goto('/admin/categories');
  }

  async createCategory(name: string): Promise<void> {
    await this.addCategoryBtn.click();
    await this.nameInput.fill(name);
    await this.submitBtn.click();
  }

  getEditBtn(catId: number | string): Locator {
    return this.page.getByTestId(`admin-category-edit-button-${catId}`);
  }

  getEditInput(catId: number | string): Locator {
    return this.page.getByTestId(`admin-category-edit-input-${catId}`);
  }

  getSaveBtn(catId: number | string): Locator {
    return this.page.getByTestId(`admin-category-save-button-${catId}`);
  }

  getDeleteBtn(catId: number | string): Locator {
    return this.page.getByTestId(`admin-category-delete-button-${catId}`);
  }

  async editCategory(catId: number | string, newName: string): Promise<void> {
    await this.getEditBtn(catId).click();
    await this.getEditInput(catId).fill(newName);
    await this.getSaveBtn(catId).click();
  }

  async deleteCategory(catId: number | string): Promise<void> {
    await this.getDeleteBtn(catId).click();
  }
}
