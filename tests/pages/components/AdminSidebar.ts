import { Page, Locator } from '@playwright/test';

export class AdminSidebar {
  readonly page: Page;
  readonly sidebarContainer: Locator;
  readonly dashboardLink: Locator;
  readonly productsLink: Locator;
  readonly inventoryLink: Locator;
  readonly usersLink: Locator;
  readonly categoriesLink: Locator;
  readonly ordersLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebarContainer = page.getByTestId('admin-sidebar');
    this.dashboardLink = page.getByTestId('admin-sidebar-link-dashboard');
    this.productsLink = page.getByTestId('admin-sidebar-link-products');
    this.inventoryLink = page.getByTestId('admin-sidebar-link-inventory');
    this.usersLink = page.getByTestId('admin-sidebar-link-users');
    this.categoriesLink = page.getByTestId('admin-sidebar-link-categories');
    this.ordersLink = page.getByTestId('admin-sidebar-link-orders');
  }

  async navigateTo(section: 'dashboard' | 'products' | 'inventory' | 'users' | 'categories' | 'orders'): Promise<void> {
    switch (section) {
      case 'dashboard':
        await this.dashboardLink.click();
        break;
      case 'products':
        await this.productsLink.click();
        break;
      case 'inventory':
        await this.inventoryLink.click();
        break;
      case 'users':
        await this.usersLink.click();
        break;
      case 'categories':
        await this.categoriesLink.click();
        break;
      case 'orders':
        await this.ordersLink.click();
        break;
    }
  }
}
