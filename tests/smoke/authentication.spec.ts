import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { testUsers } from '../test-data/users';
import { resetAppState } from '../utils/test-helpers';

test.describe('Smoke - Authentication @smoke', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('should load login page, perform login, and verify post-login state', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.goto();
    await expect(loginPage.container).toBeVisible();

    await loginPage.login(testUsers.customer.email, testUsers.customer.password);
    await expect(homePage.heroSection).toBeVisible();
  });
});
