import { test, expect } from '@playwright/test';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { resetAppState, loginAsAdmin } from '../utils/test-helpers';

test.describe('Admin Dashboard Metrics @admin', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
    await loginAsAdmin(page);
  });

  test('should display dynamic KPI cards and recent orders table', async ({ page }) => {
    const adminDashboardPage = new AdminDashboardPage(page);

    await adminDashboardPage.goto();

    await expect(adminDashboardPage.container).toBeVisible();
    await expect(adminDashboardPage.revenueKpi).toBeVisible();
    await expect(adminDashboardPage.ordersCount).toBeVisible();
    await expect(adminDashboardPage.productsCount).toBeVisible();
    await expect(adminDashboardPage.usersKpi).toBeVisible();
    await expect(adminDashboardPage.recentOrdersTable).toBeVisible();
  });
});
