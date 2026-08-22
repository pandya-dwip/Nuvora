import { Page, Locator } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;
  readonly container: Locator;
  readonly nameInput: Locator;
  readonly savedSuccessAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('profile-container');
    this.nameInput = page.getByTestId('profile-name-input');
    this.savedSuccessAlert = page.getByTestId('profile-saved-success');
  }

  async goto(): Promise<void> {
    await this.page.goto('/profile');
  }

  async updateName(newName: string): Promise<void> {
    await this.nameInput.fill(newName);
    await this.nameInput.press('Enter');
  }
}
