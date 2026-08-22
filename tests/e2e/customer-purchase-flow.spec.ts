import { test, expect } from '@playwright/test';
import { testProducts } from '../test-data/products';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { OrdersPage } from '../pages/OrdersPage';
import { Header } from '../pages/components/Header';
import { resetAppState, loginAsCustomer } from '../utils/test-helpers';

test.describe('E2E - Customer Complete Purchase Workflow @e2e', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('Customer login -> Browse product -> Add to cart -> Checkout -> Place order -> View confirmation', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderConfirmationPage = new OrderConfirmationPage(page);
    const ordersPage = new OrdersPage(page);
    const header = new Header(page);

    // 1. Login as Customer
    await loginAsCustomer(page);

    // 2. Open Product Details
    await productDetailsPage.goto(testProducts.headphones.id);
    await expect(productDetailsPage.container).toBeVisible();

    // 3. Add to Cart
    await productDetailsPage.addToCart();
    await expect(header.cartCount).toHaveText('1');

    // 4. Open Cart
    await cartPage.goto();
    await expect(cartPage.getCartItem(testProducts.headphones.id)).toBeVisible();
    await cartPage.proceedToCheckout();

    // 5. Checkout & Place Order
    await expect(checkoutPage.container).toBeVisible();
    await checkoutPage.placeOrder();

    // 6. Verify Confirmation
    await expect(orderConfirmationPage.container).toBeVisible();
    const orderIdText = await orderConfirmationPage.getOrderId();
    expect(orderIdText).toMatch(/ORD-\d+/);

    // 7. Verify in Customer Orders History
    await ordersPage.goto();
    await expect(page.getByText(orderIdText)).toBeVisible();
  });
});
