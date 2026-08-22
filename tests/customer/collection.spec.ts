import { test, expect } from '@playwright/test';
import { testProducts } from '../test-data/products';
import { CollectionPage } from '../pages/CollectionPage';
import { ProductCardComponent } from '../pages/components/ProductCardComponent';
import { resetAppState } from '../utils/test-helpers';

test.describe('Customer Collection / Shop Page @customer', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('should display product list on shop page', async ({ page }) => {
    const collectionPage = new CollectionPage(page);
    const productCard = new ProductCardComponent(page);

    await collectionPage.goto();
    await expect(collectionPage.container).toBeVisible();
    await expect(productCard.getCard(testProducts.headphones.id)).toBeVisible();
  });

  test('should filter products by search query', async ({ page }) => {
    const collectionPage = new CollectionPage(page);
    const productCard = new ProductCardComponent(page);

    await collectionPage.goto();
    await collectionPage.search('Headphones');

    await expect(productCard.getCard(testProducts.headphones.id)).toBeVisible();
    await expect(productCard.getCard(testProducts.keyboard.id)).not.toBeVisible();
  });

  test('should show no results message when search match is empty', async ({ page }) => {
    const collectionPage = new CollectionPage(page);

    await collectionPage.goto();
    await collectionPage.search('NonExistentItemXYZ123');

    await expect(collectionPage.noResultsMessage).toBeVisible();
  });

  test('should filter products by category checkbox selection', async ({ page }) => {
    const collectionPage = new CollectionPage(page);
    const productCard = new ProductCardComponent(page);

    await collectionPage.goto();
    await collectionPage.selectCategoryCheckbox('electronics');

    await expect(productCard.getCard(testProducts.headphones.id)).toBeVisible();
    await expect(productCard.getCard(testProducts.watch.id)).not.toBeVisible();
  });

  test('should sort products by price low to high and high to low', async ({ page }) => {
    const collectionPage = new CollectionPage(page);

    await collectionPage.goto();

    // Low to High
    await collectionPage.selectSort('price-asc');
    const lowToHighPrices = await collectionPage.getProductPrices();
    expect(lowToHighPrices.length).toBeGreaterThan(1);
    for (let i = 0; i < lowToHighPrices.length - 1; i++) {
      expect(lowToHighPrices[i]).toBeLessThanOrEqual(lowToHighPrices[i + 1]);
    }

    // High to Low
    await collectionPage.selectSort('price-desc');
    const highToLowPrices = await collectionPage.getProductPrices();
    expect(highToLowPrices.length).toBeGreaterThan(1);
    for (let i = 0; i < highToLowPrices.length - 1; i++) {
      expect(highToLowPrices[i]).toBeGreaterThanOrEqual(highToLowPrices[i + 1]);
    }
  });
});
