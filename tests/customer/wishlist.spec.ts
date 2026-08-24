import { test, expect } from '@playwright/test';
import { testProducts } from '../test-data/products';
import { CollectionPage } from '../pages/CollectionPage';
import { WishlistPage } from '../pages/WishlistPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ProductCardComponent } from '../pages/components/ProductCardComponent';
import { resetAppState, loginAsCustomer, logoutUser } from '../utils/test-helpers';

test.describe('Customer Wishlist Page @customer', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsCustomer(page);
  });

  test('should toggle product wishlist state and display in Wishlist page', async ({ page }) => {
    const collectionPage = new CollectionPage(page);
    const productCard = new ProductCardComponent(page);
    const wishlistPage = new WishlistPage(page);

    await collectionPage.goto();
    await productCard.clickWishlist(testProducts.keyboard.id);

    await wishlistPage.goto();
    await expect(wishlistPage.container).toBeVisible();
    await expect(productCard.getCard(testProducts.keyboard.id)).toBeVisible();
  });

  test('should persist wishlist state across page refreshes', async ({ page }) => {
    const collectionPage = new CollectionPage(page);
    const productCard = new ProductCardComponent(page);
    const wishlistPage = new WishlistPage(page);

    await collectionPage.goto();
    await productCard.clickWishlist(testProducts.keyboard.id);

    await page.reload();
    await wishlistPage.goto();
    await expect(productCard.getCard(testProducts.keyboard.id)).toBeVisible();
  });

  test('should isolate wishlist between different logged-in users', async ({ page }) => {
    const collectionPage = new CollectionPage(page);
    const productCard = new ProductCardComponent(page);
    const registerPage = new RegisterPage(page);
    const wishlistPage = new WishlistPage(page);

    // User A (Customer) adds product #2 to wishlist
    await loginAsCustomer(page);
    await collectionPage.goto();
    await productCard.clickWishlist(testProducts.keyboard.id);
    await logoutUser(page);

    // User B registers and logs in -> Wishlist should not contain User A's item
    await registerPage.goto();
    await registerPage.register('User B', `userb_${Date.now()}@example.com`, 'password123');

    await wishlistPage.goto();
    await expect(productCard.getCard(testProducts.keyboard.id)).not.toBeVisible();
  });
});
