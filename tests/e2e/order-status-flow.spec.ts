import { test, expect } from '@playwright/test';
import { testProducts } from '../test-data/products';
import { testUsers } from '../test-data/users';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { OrderDetailsPage } from '../pages/OrderDetailsPage';
import { AdminOrderDetailsPage } from '../pages/admin/AdminOrderDetailsPage';
import { resetAppState, loginAsCustomer, loginAsAdmin, logoutUser } from '../utils/test-helpers';

test.describe('E2E - Cross-Role Order Status Synchronization @e2e', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('Customer places order -> Admin updates status to Shipped -> Customer sees updated status', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderConfirmationPage = new OrderConfirmationPage(page);
    const adminOrderDetailsPage = new AdminOrderDetailsPage(page);
    const orderDetailsPage = new OrderDetailsPage(page);

    // 1. Customer places order
    await loginAsCustomer(page);
    await productDetailsPage.goto(testProducts.keyboard.id);
    await productDetailsPage.addToCart();
    await checkoutPage.goto();
    await checkoutPage.placeOrder();

    await expect(orderConfirmationPage.container).toBeVisible();
    const orderId = await orderConfirmationPage.getOrderId();

    // 2. Customer logs out
    await logoutUser(page);

    // 3. Admin logs in without wiping order state -> Navigates to order -> Changes status to Shipped
    await loginAsAdmin(page, testUsers.admin.email, testUsers.admin.password, false);
    await adminOrderDetailsPage.goto(orderId);
    await expect(adminOrderDetailsPage.container).toBeVisible();
    await adminOrderDetailsPage.selectStatus('Shipped');
    await logoutUser(page);

    // 4. Customer logs in without wiping state -> Views order details -> Verifies status stepper is Shipped
    await loginAsCustomer(page, testUsers.customer.email, testUsers.customer.password, false);
    await orderDetailsPage.goto(orderId);
    await expect(orderDetailsPage.getStepBadge('Shipped')).toBeVisible();
  });
});
