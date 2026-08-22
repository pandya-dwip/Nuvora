import { test, expect } from '@playwright/test';
import { testUsers } from '../test-data/users';
import { AdminUsersPage } from '../pages/admin/AdminUsersPage';
import { RegisterPage } from '../pages/RegisterPage';
import { resetAppState, loginAsAdmin } from '../utils/test-helpers';

test.describe('Admin User Account Management CRUD @admin', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
  });

  test('should list registered users and toggle account status', async ({ page }) => {
    await loginAsAdmin(page);
    const adminUsersPage = new AdminUsersPage(page);

    await adminUsersPage.goto();
    await expect(adminUsersPage.container).toBeVisible();

    await adminUsersPage.searchUser(testUsers.customer.email);
    await expect(page.getByText(testUsers.customer.name)).toBeVisible();

    const toggleBtn = adminUsersPage.getUserStatusToggle(testUsers.customer.id);
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();
    await expect(toggleBtn).toContainText('Disabled');
  });

  test('should delete user from admin user directory', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const adminUsersPage = new AdminUsersPage(page);

    const tempUser = {
      name: 'Temp Delete User',
      email: `tempdelete_${Date.now()}@example.com`,
      password: 'password123',
    };

    // 1. Register temp user
    await registerPage.goto();
    await registerPage.register(tempUser.name, tempUser.email, tempUser.password);

    // 2. Admin logs in and deletes user
    await loginAsAdmin(page, testUsers.admin.email, testUsers.admin.password, false);
    await adminUsersPage.goto();
    await adminUsersPage.searchUser(tempUser.email);
    await expect(page.getByText(tempUser.name)).toBeVisible();

    const userRow = page.locator('tr').filter({ hasText: tempUser.email });
    await userRow.getByTitle('Delete User').click();

    await expect(page.getByText(tempUser.email)).not.toBeVisible();
  });
});
