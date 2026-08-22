import { test, expect } from '@playwright/test';
import { testProducts } from '../test-data/products';
import { AdminProductsPage } from '../pages/admin/AdminProductsPage';
import { ProductFormPage } from '../pages/admin/ProductFormPage';
import { resetAppState, loginAsAdmin } from '../utils/test-helpers';

test.describe('Admin Product Catalog CRUD Management @admin', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
    await loginAsAdmin(page);
  });

  test('should display product list and filter by search query', async ({ page }) => {
    const adminProductsPage = new AdminProductsPage(page);

    await adminProductsPage.goto();
    await expect(adminProductsPage.container).toBeVisible();

    await adminProductsPage.searchProduct(testProducts.headphones.name);
    await expect(page.getByText(testProducts.headphones.name)).toBeVisible();
    await expect(page.getByText(testProducts.keyboard.name)).not.toBeVisible();
  });

  test('should complete full Product CRUD lifecycle (Create, Edit, Delete)', async ({ page }) => {
    const adminProductsPage = new AdminProductsPage(page);
    const productFormPage = new ProductFormPage(page);

    const newProd = {
      name: `CRUD Test Item ${Date.now()}`,
      category: 'Electronics',
      price: 249.99,
      stock: 30,
    };

    // 1. CREATE
    await adminProductsPage.goto();
    await adminProductsPage.clickAddProduct();
    await expect(productFormPage.container).toBeVisible();

    await productFormPage.fillForm(newProd);
    await productFormPage.submit();

    await expect(adminProductsPage.container).toBeVisible();
    await expect(page.getByText(newProd.name)).toBeVisible();

    // 2. EDIT
    await adminProductsPage.searchProduct(newProd.name);
    const createdRow = page.locator('tr').filter({ hasText: newProd.name });
    await createdRow.getByTitle('Edit Product').click();

    await expect(productFormPage.container).toBeVisible();
    await productFormPage.fillForm({ price: 299.99, stock: 45 });
    await productFormPage.submit();

    await expect(adminProductsPage.container).toBeVisible();
    await expect(page.getByText('$299.99')).toBeVisible();

    // 3. DELETE
    await adminProductsPage.searchProduct(newProd.name);
    await createdRow.getByTitle('Delete Product').click();
    await expect(adminProductsPage.deleteModal).toBeVisible();
    await adminProductsPage.deleteConfirmBtn.click();

    await expect(page.getByText(newProd.name)).not.toBeVisible();
  });

  test('should toggle product catalog status between Active and Inactive', async ({ page }) => {
    const adminProductsPage = new AdminProductsPage(page);

    await adminProductsPage.goto();
    const toggleBtn = adminProductsPage.getProductStatusToggle(testProducts.headphones.id);
    await expect(toggleBtn).toBeVisible();

    await toggleBtn.click();
    await expect(toggleBtn).toHaveText('Inactive');
  });
});
