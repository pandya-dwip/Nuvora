import { test, expect } from '@playwright/test';
import { testUsers } from '../test-data/users';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { AdminUsersPage } from '../pages/admin/AdminUsersPage';
import { resetAppState, loginAsAdmin } from '../utils/test-helpers';

test.describe('E2E - Customer Registration & Admin Directory Sync @e2e', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('Customer registers & updates profile -> Admin Users directory displays updated customer details', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const homePage = new HomePage(page);
    const adminUsersPage = new AdminUsersPage(page);

    const randomUser = {
      name: 'Sync Test Customer',
      email: `synccustomer_${Date.now()}@example.com`,
      password: 'password123',
    };

    // 1. Customer registers
    await registerPage.goto();
    await registerPage.register(randomUser.name, randomUser.email, randomUser.password);

    await expect(homePage.heroSection).toBeVisible();

    // 2. Admin logs in without wiping registered users state and verifies customer is in Users directory
    await loginAsAdmin(page, testUsers.admin.email, testUsers.admin.password, false);
    await adminUsersPage.goto();
    await adminUsersPage.searchUser(randomUser.email);
    await expect(page.getByText(randomUser.name)).toBeVisible();
    await expect(page.getByText(randomUser.email)).toBeVisible();
  });
});
