import { Page, Locator } from '@playwright/test';

export class AdminDashboardPage {
  readonly page: Page;
  readonly container: Locator;
  readonly revenueKpi: Locator;
  readonly ordersKpi: Locator;
  readonly productsKpi: Locator;
  readonly usersKpi: Locator;
  readonly ordersCount: Locator;
  readonly productsCount: Locator;
  readonly recentOrdersTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('admin-dashboard-container');
    this.revenueKpi = page.getByTestId('admin-dashboard-revenue-kpi');
    this.ordersKpi = page.getByTestId('admin-dashboard-orders-kpi');
    this.productsKpi = page.getByTestId('admin-dashboard-products-kpi');
    this.usersKpi = page.getByTestId('admin-dashboard-users-kpi');
    this.ordersCount = page.getByTestId('admin-dashboard-orders-count');
    this.productsCount = page.getByTestId('admin-dashboard-products-count');
    this.recentOrdersTable = page.getByTestId('admin-dashboard-recent-orders-table');
  }

  async goto(): Promise<void> {
    await this.page.goto('/admin/dashboard');
  }
}
