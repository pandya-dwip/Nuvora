import { test, expect } from '@playwright/test';
import { AdminCategoriesPage } from '../pages/admin/AdminCategoriesPage';
import { resetAppState, loginAsAdmin } from '../utils/test-helpers';

test.describe('Admin Department Categories Management CRUD @admin', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
    await loginAsAdmin(page);
  });

  test('should display categories table and open create category modal', async ({ page }) => {
    const adminCategoriesPage = new AdminCategoriesPage(page);

    await adminCategoriesPage.goto();
    await expect(adminCategoriesPage.container).toBeVisible();

    await adminCategoriesPage.addCategoryBtn.click();
    await expect(adminCategoriesPage.modal).toBeVisible();
  });

  test('should create and delete an unassigned department category', async ({ page }) => {
    const adminCategoriesPage = new AdminCategoriesPage(page);

    await adminCategoriesPage.goto();
    const categoryName = `Unassigned Cat ${Date.now()}`;

    // 1. CREATE
    await adminCategoriesPage.createCategory(categoryName);
    await expect(adminCategoriesPage.categoriesTable.getByText(categoryName)).toBeVisible();

    // 2. DELETE
    const catRow = adminCategoriesPage.categoriesTable.locator('tr').filter({ hasText: categoryName });
    await catRow.getByTitle('Delete Category').click();

    await expect(adminCategoriesPage.categoriesTable.getByText(categoryName)).not.toBeVisible();
  });
});
