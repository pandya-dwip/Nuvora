import { test, expect } from '@playwright/test';
import { testProducts } from '../test-data/products';
import { HomePage } from '../pages/HomePage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { ProductCardComponent } from '../pages/components/ProductCardComponent';
import { Header } from '../pages/components/Header';
import { resetAppState } from '../utils/test-helpers';

test.describe('Customer Home Page @customer', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('should display categories and navigate on category card click', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await expect(homePage.heroSection).toBeVisible();

    await homePage.clickCategory('electronics');
    await expect(page.url()).toContain('/shop?category=Electronics');
  });

  test('should click featured product and open Product Details page', async ({ page }) => {
    const homePage = new HomePage(page);
    const productCard = new ProductCardComponent(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await homePage.goto();
    await productCard.clickName(testProducts.headphones.id);

    await expect(page.url()).toContain(`/product/${testProducts.headphones.id}`);
    await expect(productDetailsPage.container).toBeVisible();
  });

  test('should allow quick add to cart from home featured section', async ({ page }) => {
    const homePage = new HomePage(page);
    const productCard = new ProductCardComponent(page);
    const header = new Header(page);

    await homePage.goto();
    await productCard.clickAddToCart(testProducts.headphones.id);

    await expect(header.cartCount).toHaveText('1');
  });
});
