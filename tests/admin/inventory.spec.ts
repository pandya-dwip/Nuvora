import { test, expect } from '@playwright/test';
import { testProducts } from '../test-data/products';
import { AdminInventoryPage } from '../pages/admin/AdminInventoryPage';
import { resetAppState, loginAsAdmin } from '../utils/test-helpers';

test.describe('Admin Inventory Control @admin', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
    await loginAsAdmin(page);
  });

  test('should display stock inventory table and adjust stock levels', async ({ page }) => {
    const adminInventoryPage = new AdminInventoryPage(page);

    await adminInventoryPage.goto();
    await expect(adminInventoryPage.container).toBeVisible();

    const stockInput = adminInventoryPage.getStockInput(testProducts.headphones.id);
    await expect(stockInput).toBeVisible();
    const initialVal = await stockInput.inputValue();

    await adminInventoryPage.increaseStock(testProducts.headphones.id);
    await expect(stockInput).toHaveValue(String(Number(initialVal) + 1));
  });
});
