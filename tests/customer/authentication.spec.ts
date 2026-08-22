import { test, expect } from '@playwright/test';
import { testUsers } from '../test-data/users';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { resetAppState, logoutUser } from '../utils/test-helpers';

test.describe('Customer Authentication @customer', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('should register a new customer account successfully', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const homePage = new HomePage(page);

    const newEmail = `customer_${Date.now()}@example.com`;
    await registerPage.goto();
    await registerPage.register('New Test User', newEmail, 'password123');

    await expect(homePage.heroSection).toBeVisible();
  });

  test('should show error when registering with an existing email', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register('Jane Duplicate', testUsers.customer.email, 'password123');

    await expect(registerPage.errorMessage).toBeVisible();
  });

  test('should show error when passwords do not match during registration', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register('Mismatch User', 'mismatch@example.com', 'pass123', 'pass999');

    await expect(registerPage.errorMessage).toBeVisible();
  });

  test('should log in successfully with valid customer credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.goto();
    await loginPage.login(testUsers.customer.email, testUsers.customer.password);

    await expect(homePage.heroSection).toBeVisible();
  });

  test('should reject login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(testUsers.customer.email, 'WrongPassword123');

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('should log out customer and clear active session UI', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.goto();
    await loginPage.login(testUsers.customer.email, testUsers.customer.password);
    await expect(homePage.heroSection).toBeVisible();

    await logoutUser(page);
    await expect(loginPage.container).toBeVisible();
  });
});
