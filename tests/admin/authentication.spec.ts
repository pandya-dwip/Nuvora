import { test, expect } from '@playwright/test';
import { testUsers } from '../test-data/users';
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { resetAppState, loginAsAdmin } from '../utils/test-helpers';

test.describe('Admin Authentication & Authorization @admin', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('should log in successfully as Admin and display Admin Dashboard', async ({ page }) => {
    const adminLoginPage = new AdminLoginPage(page);
    const adminDashboardPage = new AdminDashboardPage(page);

    await adminLoginPage.goto();
    await adminLoginPage.login(testUsers.admin.email, testUsers.admin.password);

    await expect(adminDashboardPage.container).toBeVisible();
  });

  test('should redirect non-admin customer accounts attempting to access Admin routes', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const adminDashboardPage = new AdminDashboardPage(page);

    await loginPage.goto();
    await loginPage.login(testUsers.customer.email, testUsers.customer.password);

    await adminDashboardPage.goto();
    await expect(homePage.heroSection).toBeVisible();
  });
});
