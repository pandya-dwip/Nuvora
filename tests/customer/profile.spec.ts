import { test, expect } from '@playwright/test';
import { ProfilePage } from '../pages/ProfilePage';
import { resetAppState, loginAsCustomer } from '../utils/test-helpers';

test.describe('Customer Profile Management @customer', () => {
  test.beforeEach(async ({ page }) => {
    await resetAppState(page);
    await loginAsCustomer(page);
  });

  test('should display current user profile details and update profile info', async ({ page }) => {
    const profilePage = new ProfilePage(page);

    await profilePage.goto();

    await expect(profilePage.container).toBeVisible();
    await expect(profilePage.nameInput).toHaveValue('Jane Doe');

    // Update name
    await profilePage.updateName('Jane Updated Doe');

    // Verify notification and persistence after refresh
    await expect(profilePage.savedSuccessAlert).toBeVisible();
    await page.reload();
    await expect(profilePage.nameInput).toHaveValue('Jane Updated Doe');
  });
});
