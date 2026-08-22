import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { WishlistPage } from '../pages/WishlistPage';
import { LoginPage } from '../pages/LoginPage';
import { resetAppState } from '../utils/test-helpers';

test.describe('Smoke - Navigation @smoke', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('should navigate between public header links', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const wishlistPage = new WishlistPage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await cartPage.goto();
    await expect(cartPage.container).toBeVisible();

    await wishlistPage.goto();
    await expect(wishlistPage.container).toBeVisible();

    await loginPage.goto();
    await expect(loginPage.container).toBeVisible();
  });
});
