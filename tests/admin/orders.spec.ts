import { test, expect } from '@playwright/test';
import { testProducts } from '../test-data/products';
import { testUsers } from '../test-data/users';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { AdminOrdersPage } from '../pages/admin/AdminOrdersPage';
import { AdminOrderDetailsPage } from '../pages/admin/AdminOrderDetailsPage';
import { resetAppState, loginAsCustomer, loginAsAdmin } from '../utils/test-helpers';

test.describe('Admin Orders Directory & Status Management @admin', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('should display admin orders table and view dynamically created order details', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderConfirmationPage = new OrderConfirmationPage(page);
    const adminOrdersPage = new AdminOrdersPage(page);
    const adminOrderDetailsPage = new AdminOrderDetailsPage(page);

    // 1. Customer places order
    await loginAsCustomer(page);
    await productDetailsPage.goto(testProducts.headphones.id);
    await productDetailsPage.addToCart();
    await checkoutPage.goto();
    await checkoutPage.placeOrder();

    await expect(orderConfirmationPage.container).toBeVisible();
    const orderId = await orderConfirmationPage.getOrderId();

    // 2. Admin views order
    await loginAsAdmin(page, testUsers.admin.email, testUsers.admin.password, false);
    await adminOrdersPage.goto();
    await expect(adminOrdersPage.container).toBeVisible();

    await adminOrdersPage.viewOrder(orderId);
    await expect(adminOrderDetailsPage.container).toBeVisible();
    await expect(page.getByText(orderId)).toBeVisible();
  });

  test('should update order fulfillment status from Placed to Shipped', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderConfirmationPage = new OrderConfirmationPage(page);
    const adminOrderDetailsPage = new AdminOrderDetailsPage(page);

    // 1. Customer places order
    await loginAsCustomer(page);
    await productDetailsPage.goto(testProducts.keyboard.id);
    await productDetailsPage.addToCart();
    await checkoutPage.goto();
    await checkoutPage.placeOrder();

    await expect(orderConfirmationPage.container).toBeVisible();
    const orderId = await orderConfirmationPage.getOrderId();

    // 2. Admin opens order & updates status
    await loginAsAdmin(page, testUsers.admin.email, testUsers.admin.password, false);
    await adminOrderDetailsPage.goto(orderId);
    await expect(adminOrderDetailsPage.container).toBeVisible();

    await adminOrderDetailsPage.selectStatus('Shipped');
    await page.reload();
    await expect(adminOrderDetailsPage.statusSelect).toHaveValue('Shipped');
  });
});
