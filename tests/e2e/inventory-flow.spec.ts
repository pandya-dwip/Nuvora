import { test, expect } from '@playwright/test';
import { testProducts } from '../test-data/products';
import { testUsers } from '../test-data/users';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { AdminInventoryPage } from '../pages/admin/AdminInventoryPage';
import { resetAppState, loginAsCustomer, loginAsAdmin } from '../utils/test-helpers';

test.describe('E2E - Cross-Role Inventory Stock Reduction @e2e', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('Customer purchases 2 units -> Stock decreases by 2 in Admin Inventory', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderConfirmationPage = new OrderConfirmationPage(page);
    const adminInventoryPage = new AdminInventoryPage(page);

    // 1. Check initial stock in Admin Inventory
    await loginAsAdmin(page);
    await adminInventoryPage.goto();
    const initialStockStr = await adminInventoryPage.getStockInput(testProducts.headphones.id).inputValue();
    const initialStock = Number(initialStockStr);

    // 2. Customer logs in (without wiping inventory state) and buys 2 units
    await loginAsCustomer(page, testUsers.customer.email, testUsers.customer.password, false);
    await productDetailsPage.goto(testProducts.headphones.id);
    await productDetailsPage.increaseQuantity(); // quantity 2
    await productDetailsPage.addToCart();

    await checkoutPage.goto();
    await checkoutPage.placeOrder();
    await expect(orderConfirmationPage.container).toBeVisible();

    // 3. Admin opens Inventory (without wiping state) and verifies stock reduced by 2
    await loginAsAdmin(page, testUsers.admin.email, testUsers.admin.password, false);
    await adminInventoryPage.goto();
    const updatedStockStr = await adminInventoryPage.getStockInput(testProducts.headphones.id).inputValue();
    expect(Number(updatedStockStr)).toBe(initialStock - 2);
  });
});
