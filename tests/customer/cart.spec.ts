import { test, expect } from '@playwright/test';
import { testProducts } from '../test-data/products';
import { testUsers } from '../test-data/users';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';
import { resetAppState, loginAsCustomer, logoutUser, switchUserSession } from '../utils/test-helpers';

test.describe('Customer Cart Management @customer', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
    await loginAsCustomer(page);
  });

  test('should add items to cart and calculate correct subtotal', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);

    await productDetailsPage.goto(testProducts.headphones.id);
    await productDetailsPage.addToCart();

    await cartPage.goto();
    await expect(cartPage.container).toBeVisible();
    await expect(cartPage.getCartItem(testProducts.headphones.id)).toBeVisible();
    await expect(cartPage.subtotal).toContainText('$129.00');
  });

  test('should update item quantity and recalculate cart totals', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);

    await productDetailsPage.goto(testProducts.headphones.id);
    await productDetailsPage.addToCart();

    await cartPage.goto();
    await cartPage.increaseQuantity(testProducts.headphones.id);
    await expect(cartPage.getItemQuantity(testProducts.headphones.id)).toHaveText('2');
    await expect(cartPage.subtotal).toContainText('$258.00');
  });

  test('should remove item from cart', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);

    await productDetailsPage.goto(testProducts.headphones.id);
    await productDetailsPage.addToCart();

    await cartPage.goto();
    await cartPage.removeItem(testProducts.headphones.id);
    await expect(cartPage.emptyState).toBeVisible();
  });

  test('should isolate cart items per logged-in user account', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);

    // 1. Customer A (Jane) adds product #1 to cart
    await productDetailsPage.goto(testProducts.headphones.id);
    await productDetailsPage.addToCart();

    await cartPage.goto();
    await expect(cartPage.getCartItem(testProducts.headphones.id)).toBeVisible();

    // 2. Switch user session to Customer B (Dwip) without wiping app database
    await loginAsCustomer(page, testUsers.dwipCustomer.email, testUsers.dwipCustomer.password, false);

    // 3. Customer B opens Cart -> Customer A's product should NOT be in Customer B's cart
    await cartPage.goto();
    await expect(cartPage.getCartItem(testProducts.headphones.id)).not.toBeVisible();
  });
});
