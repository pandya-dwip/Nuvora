import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { resetAppState } from '../utils/test-helpers';

test.describe('Guest Route Authorization & Security @customer @security', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('should redirect unauthenticated guest accessing protected customer routes to login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    const protectedCustomerRoutes = ['/profile', '/orders', '/checkout'];

    for (const route of protectedCustomerRoutes) {
      await page.goto(route);
      await expect(loginPage.container).toBeVisible();
    }
  });

  test('should redirect unauthenticated guest accessing protected admin routes to login', async ({ page }) => {
    const adminLoginPage = new AdminLoginPage(page);

    const protectedAdminRoutes = [
      '/admin',
      '/admin/dashboard',
      '/admin/products',
      '/admin/orders',
      '/admin/users',
      '/admin/inventory',
    ];

    for (const route of protectedAdminRoutes) {
      await page.goto(route);
      await expect(adminLoginPage.emailInput).toBeVisible();
    }
  });
});
