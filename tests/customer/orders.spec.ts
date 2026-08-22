import { test, expect } from '@playwright/test';
import { testProducts } from '../test-data/products';
import { testUsers } from '../test-data/users';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { OrdersPage } from '../pages/OrdersPage';
import { OrderDetailsPage } from '../pages/OrderDetailsPage';
import { resetAppState, loginAsCustomer } from '../utils/test-helpers';

test.describe('Customer Orders History & Details @customer', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
    await loginAsCustomer(page);
  });

  test('should place an order dynamically and display it in customer order history list', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderConfirmationPage = new OrderConfirmationPage(page);
    const ordersPage = new OrdersPage(page);

    // Place dynamic order
    await productDetailsPage.goto(testProducts.headphones.id);
    await productDetailsPage.addToCart();
    await checkoutPage.goto();
    await checkoutPage.placeOrder();

    await expect(orderConfirmationPage.container).toBeVisible();
    const dynamicOrderId = await orderConfirmationPage.getOrderId();

    // Verify in Orders History
    await ordersPage.goto();
    await expect(ordersPage.container).toBeVisible();
    await expect(ordersPage.getOrderCard(dynamicOrderId)).toBeVisible();
  });

  test('should block customer from viewing another customer order details', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderConfirmationPage = new OrderConfirmationPage(page);
    const orderDetailsPage = new OrderDetailsPage(page);

    // 1. Jane Doe places an order
    await productDetailsPage.goto(testProducts.keyboard.id);
    await productDetailsPage.addToCart();
    await checkoutPage.goto();
    await checkoutPage.placeOrder();

    await expect(orderConfirmationPage.container).toBeVisible();
    const orderId = await orderConfirmationPage.getOrderId();

    // 2. Switch session to dwipCustomer (without wiping store database)
    await loginAsCustomer(page, testUsers.dwipCustomer.email, testUsers.dwipCustomer.password, false);

    // 3. Attempt to view the order placed by Jane
    await orderDetailsPage.goto(orderId);
    await expect(orderDetailsPage.accessDeniedState).toBeVisible();
  });
});
