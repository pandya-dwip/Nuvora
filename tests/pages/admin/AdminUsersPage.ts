import { Page, Locator } from '@playwright/test';

export class AdminUsersPage {
  readonly page: Page;
  readonly container: Locator;
  readonly searchInput: Locator;
  readonly usersTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('admin-users-container');
    this.searchInput = page.getByTestId('admin-users-search-input');
    this.usersTable = page.getByTestId('admin-users-table');
  }

  async goto(): Promise<void> {
    await this.page.goto('/admin/users');
  }

  async searchUser(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  getUserStatusToggle(userId: number | string): Locator {
    return this.page.getByTestId(`admin-user-status-toggle-${userId}`);
  }

  getUserDeleteBtn(userId: number | string): Locator {
    return this.page.getByTestId(`admin-user-delete-button-${userId}`);
  }

  async deleteUser(userId: number | string): Promise<void> {
    await this.getUserDeleteBtn(userId).click();
  }
}
