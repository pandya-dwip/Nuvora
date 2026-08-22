import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { Header } from '../pages/components/Header';
import { ProductCardComponent } from '../pages/components/ProductCardComponent';
import { testProducts } from '../test-data/products';
import { resetAppState } from '../utils/test-helpers';

test.describe('Smoke - Home Page @smoke', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('should load home page, header, and render featured products grid', async ({ page }) => {
    const homePage = new HomePage(page);
    const header = new Header(page);
    const productCard = new ProductCardComponent(page);

    await homePage.goto();

    // Verify key sections & navigation header
    await expect(homePage.heroSection).toBeVisible();
    await expect(header.logo).toBeVisible();

    // Verify featured products exist
    await expect(productCard.getCard(testProducts.headphones.id)).toBeVisible();
  });
});
