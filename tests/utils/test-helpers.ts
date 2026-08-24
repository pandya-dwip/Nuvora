import { Page, expect } from '@playwright/test';
import { testUsers } from '../test-data/users';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { AdminSidebar } from '../pages/components/AdminSidebar';

/**
 * Reset application localStorage & session state to clean predictable seed state
 */
export async function resetAppState(page: Page): Promise<void> {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.goto();
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.reload();
  await loginPage.goto();
  await expect(loginPage.container).toBeVisible();
}

/**
 * Switch current user session without clearing store database (products/orders/users)
 */
export async function switchUserSession(page: Page): Promise<void> {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.goto();
  await page.evaluate(() => {
    localStorage.removeItem('nuvora_current_user');
  });
  await page.reload();
  await loginPage.goto();
  await expect(loginPage.container).toBeVisible();
}

/**
 * Helper to log in as a Customer
 */
export async function loginAsCustomer(
  page: Page,
  email = testUsers.customer.email,
  password = testUsers.customer.password,
  clearAllState = true
): Promise<void> {
  if (clearAllState) {
    await resetAppState(page);
  } else {
    await switchUserSession(page);
  }
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.login(email, password);
  await expect(homePage.heroSection).toBeVisible();
}

/**
 * Helper to log in as an Admin
 */
export async function loginAsAdmin(
  page: Page,
  email = testUsers.admin.email,
  password = testUsers.admin.password,
  clearAllState = true
): Promise<void> {
  if (clearAllState) {
    await resetAppState(page);
  } else {
    await switchUserSession(page);
  }
  const adminLoginPage = new AdminLoginPage(page);
  const adminSidebar = new AdminSidebar(page);

  await adminLoginPage.login(email, password);
  await expect(adminSidebar.sidebarContainer).toBeVisible();
}

/**
 * Helper to clear current session / logout
 */
export async function logoutUser(page: Page): Promise<void> {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.goto();
  await page.evaluate(() => {
    localStorage.removeItem('nuvora_current_user');
  });
  await page.reload();
  await loginPage.goto();
  await expect(loginPage.container).toBeVisible();
}
