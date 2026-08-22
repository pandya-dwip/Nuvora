import { test, expect } from '@playwright/test';
import { testProducts } from '../test-data/products';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CollectionPage } from '../pages/CollectionPage';
import { ProductCardComponent } from '../pages/components/ProductCardComponent';
import { Header } from '../pages/components/Header';
import { resetAppState } from '../utils/test-helpers';

test.describe('Customer Product Details Page @customer', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('should load correct product details by product ID in URL', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);

    await productDetailsPage.goto(testProducts.headphones.id);
    await expect(productDetailsPage.container).toBeVisible();
    await expect(productDetailsPage.productName).toContainText(testProducts.headphones.name);
    await expect(productDetailsPage.productPrice).toContainText('$129.00');
  });

  test('should increase and decrease product quantity within stock boundaries', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);

    await productDetailsPage.goto(testProducts.headphones.id);
    await productDetailsPage.increaseQuantity();
    await expect(productDetailsPage.quantityInput).toHaveText('2');

    await productDetailsPage.decreaseQuantity();
    await expect(productDetailsPage.quantityInput).toHaveText('1');
  });

  test('should add product to cart from details page', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const header = new Header(page);

    await productDetailsPage.goto(testProducts.headphones.id);
    await productDetailsPage.addToCart();

    await expect(header.cartCount).toHaveText('1');
  });

  test('should display Not Found state for invalid product ID', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);

    await productDetailsPage.goto('9999999');
    await expect(productDetailsPage.notFoundState).toBeVisible();
  });

  test('REGRESSION: should open exact clicked product details from collection page matching its product identity', async ({ page }) => {
    const collectionPage = new CollectionPage(page);
    const productCard = new ProductCardComponent(page);
    const productDetailsPage = new ProductDetailsPage(page);

    // Open Shop Collection
    await collectionPage.goto();
    await expect(collectionPage.container).toBeVisible();

    // Click Keyboard (#2) name
    await productCard.clickName(testProducts.keyboard.id);

    // Verify URL and page header match Keyboard details exactly (not Headphones)
    await expect(page.url()).toContain(`/product/${testProducts.keyboard.id}`);
    await expect(productDetailsPage.productName).toHaveText(testProducts.keyboard.name);
  });
});
