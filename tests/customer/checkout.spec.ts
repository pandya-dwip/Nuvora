import { test, expect } from '@playwright/test';
import { testProducts } from '../test-data/products';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { resetAppState, loginAsCustomer } from '../utils/test-helpers';

test.describe('Customer Checkout & Order Placement @customer', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('should pre-fill customer checkout form and place order successfully', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderConfirmationPage = new OrderConfirmationPage(page);

    await loginAsCustomer(page);
    await productDetailsPage.goto(testProducts.headphones.id);
    await productDetailsPage.addToCart();

    await checkoutPage.goto();
    await expect(checkoutPage.container).toBeVisible();

    await checkoutPage.placeOrder();
    await expect(orderConfirmationPage.container).toBeVisible();
    await expect(orderConfirmationPage.successMessage).toBeVisible();
  });

  test('should display empty cart state when accessing checkout without items', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await loginAsCustomer(page);
    await checkoutPage.goto();
    await expect(checkoutPage.emptyState).toBeVisible();
  });
});
