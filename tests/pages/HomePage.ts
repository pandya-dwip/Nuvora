import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heroSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroSection = page.getByTestId('home-hero-section');
  }

  async goto(): Promise<void> {
    await this.page.goto('/home');
  }

  getCategoryLink(categorySlug: string): Locator {
    return this.page.getByTestId(`home-category-${categorySlug}`);
  }

  async clickCategory(categorySlug: string): Promise<void> {
    await this.getCategoryLink(categorySlug).click();
  }
}
