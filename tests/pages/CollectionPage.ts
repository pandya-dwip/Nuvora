import { Page, Locator } from '@playwright/test';

export class CollectionPage {
  readonly page: Page;
  readonly container: Locator;
  readonly searchInput: Locator;
  readonly sortSelect: Locator;
  readonly filterSidebar: Locator;
  readonly noResultsMessage: Locator;
  readonly priceElements: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('collection-container');
    this.searchInput = page.getByTestId('collection-search-input');
    this.sortSelect = page.getByTestId('collection-sort-select');
    this.filterSidebar = page.getByTestId('collection-filter-sidebar');
    this.noResultsMessage = page.getByTestId('collection-no-results');
    this.priceElements = page.locator('[data-testid^="product-price-"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/shop');
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  getCategoryCheckbox(categorySlug: string): Locator {
    return this.page.getByTestId(`collection-category-checkbox-${categorySlug}`);
  }

  async selectCategoryCheckbox(categorySlug: string): Promise<void> {
    await this.getCategoryCheckbox(categorySlug).check();
  }

  async selectSort(optionValue: string): Promise<void> {
    await this.sortSelect.selectOption(optionValue);
  }

  async getProductPrices(): Promise<number[]> {
    const textContents = await this.priceElements.allTextContents();
    return textContents.map((text) => parseFloat(text.replace(/[^0-9.]/g, ''))).filter((val) => !isNaN(val));
  }
}
