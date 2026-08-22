import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { CollectionPage } from '../pages/CollectionPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { WishlistPage } from '../pages/WishlistPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { OrdersPage } from '../pages/OrdersPage';
import { OrderDetailsPage } from '../pages/OrderDetailsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { Header } from '../pages/components/Header';
import { ProductCardComponent } from '../pages/components/ProductCardComponent';
import { AdminSidebar } from '../pages/components/AdminSidebar';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminProductsPage } from '../pages/admin/AdminProductsPage';
import { ProductFormPage } from '../pages/admin/ProductFormPage';
import { AdminInventoryPage } from '../pages/admin/AdminInventoryPage';
import { AdminUsersPage } from '../pages/admin/AdminUsersPage';
import { AdminCategoriesPage } from '../pages/admin/AdminCategoriesPage';
import { AdminOrdersPage } from '../pages/admin/AdminOrdersPage';
import { AdminOrderDetailsPage } from '../pages/admin/AdminOrderDetailsPage';
import { loginAsCustomer, loginAsAdmin } from '../utils/test-helpers';

type TestFixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  homePage: HomePage;
  collectionPage: CollectionPage;
  productDetailsPage: ProductDetailsPage;
  wishlistPage: WishlistPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  orderConfirmationPage: OrderConfirmationPage;
  ordersPage: OrdersPage;
  orderDetailsPage: OrderDetailsPage;
  profilePage: ProfilePage;
  header: Header;
  productCard: ProductCardComponent;
  adminSidebar: AdminSidebar;
  adminDashboardPage: AdminDashboardPage;
  adminProductsPage: AdminProductsPage;
  productFormPage: ProductFormPage;
  adminInventoryPage: AdminInventoryPage;
  adminUsersPage: AdminUsersPage;
  adminCategoriesPage: AdminCategoriesPage;
  adminOrdersPage: AdminOrdersPage;
  adminOrderDetailsPage: AdminOrderDetailsPage;
  authenticatedCustomerPage: void;
  authenticatedAdminPage: void;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  registerPage: async ({ page }, use) => use(new RegisterPage(page)),
  homePage: async ({ page }, use) => use(new HomePage(page)),
  collectionPage: async ({ page }, use) => use(new CollectionPage(page)),
  productDetailsPage: async ({ page }, use) => use(new ProductDetailsPage(page)),
  wishlistPage: async ({ page }, use) => use(new WishlistPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  orderConfirmationPage: async ({ page }, use) => use(new OrderConfirmationPage(page)),
  ordersPage: async ({ page }, use) => use(new OrdersPage(page)),
  orderDetailsPage: async ({ page }, use) => use(new OrderDetailsPage(page)),
  profilePage: async ({ page }, use) => use(new ProfilePage(page)),
  header: async ({ page }, use) => use(new Header(page)),
  productCard: async ({ page }, use) => use(new ProductCardComponent(page)),
  adminSidebar: async ({ page }, use) => use(new AdminSidebar(page)),
  adminDashboardPage: async ({ page }, use) => use(new AdminDashboardPage(page)),
  adminProductsPage: async ({ page }, use) => use(new AdminProductsPage(page)),
  productFormPage: async ({ page }, use) => use(new ProductFormPage(page)),
  adminInventoryPage: async ({ page }, use) => use(new AdminInventoryPage(page)),
  adminUsersPage: async ({ page }, use) => use(new AdminUsersPage(page)),
  adminCategoriesPage: async ({ page }, use) => use(new AdminCategoriesPage(page)),
  adminOrdersPage: async ({ page }, use) => use(new AdminOrdersPage(page)),
  adminOrderDetailsPage: async ({ page }, use) => use(new AdminOrderDetailsPage(page)),

  authenticatedCustomerPage: async ({ page }, use) => {
    await loginAsCustomer(page);
    await use();
  },

  authenticatedAdminPage: async ({ page }, use) => {
    await loginAsAdmin(page);
    await use();
  },
});

export { expect } from '@playwright/test';
