# Playwright E2E QA Automation Test Framework

This document provides complete technical documentation for Nuvora's **Playwright TypeScript QA Automation Test Suite**, including framework architecture, Page Object Model (POM) design, complete test case registry, stable `data-testid` selector strategy, execution instructions, and CI/CD pipeline integration.

---

## 🏗️ Architecture & Design Pattern

The test framework is built with **Playwright v1.62**, **TypeScript**, and the **Page Object Model (POM)** pattern to ensure clean separation between test logic, page selectors, and user actions.

### Architectural Highlights
- **Page Object Model (POM)**: Encapsulates page elements, locators, and user interactions inside reusable TypeScript classes located in `tests/pages/`.
- **Custom Fixtures**: Provides strongly-typed, auto-instantiated page objects via `tests/fixtures/test-fixtures.ts`.
- **Isolated App State**: State reset helpers (`resetAppState()`, `switchUserSession()`) in `tests/utils/test-helpers.ts` guarantee test independence.
- **Port & Server Isolation**: Vite server configured on dedicated port `5180` to prevent port collisions with other local dev servers during test execution.
- **Stable Selectors**: 100% selector coverage using explicit `data-testid` attributes across all customer and admin pages.

---

## 📁 Directory Structure

```
tests/
├── admin/                        # Admin Portal Functional Test Suites
│   ├── authentication.spec.ts    # Admin login & access security checks
│   ├── categories.spec.ts        # Category taxonomy CRUD specs
│   ├── dashboard.spec.ts         # Executive metrics & KPI card specs
│   ├── inventory.spec.ts         # Inventory table & live stock adjuster specs
│   ├── orders.spec.ts            # Master order fulfillment specs
│   ├── products.spec.ts          # Product catalog CRUD lifecycle specs
│   └── users.spec.ts             # User directory & role toggle specs
├── customer/                     # Customer Storefront Functional Test Suites
│   ├── authentication.spec.ts    # Customer registration, login & logout specs
│   ├── cart.spec.ts              # Shopping cart & subtotal calculation specs
│   ├── checkout.spec.ts          # Shipping address & order placement specs
│   ├── collection.spec.ts        # Search, category filter & price sorting specs
│   ├── guest-authorization.spec.ts# Route guard & unauthorized redirect specs
│   ├── home.spec.ts              # Hero banner, category card & quick add specs
│   ├── orders.spec.ts            # Customer order history & invoice view specs
│   ├── product-details.spec.ts   # Product gallery, color & stock limit specs
│   ├── profile.spec.ts           # Profile update & saved address specs
│   └── wishlist.spec.ts          # Wishlist toggle & state persistence specs
├── e2e/                          # Cross-Role End-to-End Integration Workflows
│   ├── customer-purchase-flow.spec.ts # Customer purchase journey end-to-end
│   ├── inventory-flow.spec.ts    # Order placement stock reduction in admin
│   ├── order-status-flow.spec.ts # Admin order status sync to customer timeline
│   └── user-data-flow.spec.ts    # Customer registration sync to admin user directory
├── fixtures/
│   └── test-fixtures.ts          # Playwright test fixtures extending base test
├── pages/                        # Page Object Model (POM) Classes
│   ├── admin/                    # Admin POMs (Dashboard, Products, Inventory, etc.)
│   ├── components/               # Header, AdminSidebar & ProductCard components
│   └── [Customer POMs]           # HomePage, LoginPage, CartPage, CheckoutPage, etc.
├── smoke/                        # Fast Health Check Smoke Tests
│   ├── authentication.spec.ts    # Basic login smoke check
│   ├── home.spec.ts              # Home page rendering smoke check
│   └── navigation.spec.ts        # Header links navigation smoke check
├── test-data/                    # Test Credentials & Mock Data
│   ├── products.ts               # Test product catalog data
│   ├── test-config.ts            # Base configuration
│   └── users.ts                  # Admin & customer test account credentials
└── utils/
    └── test-helpers.ts           # Session reset & auth helper functions
```

---

## 📋 Complete Test Case Registry (53 Tests)

### ⚡ Smoke Test Suite (`tests/smoke/`)
| Spec File | Test Description | Tags |
| :--- | :--- | :--- |
| `authentication.spec.ts` | Load login page, perform login, and verify post-login state | `@smoke` |
| `home.spec.ts` | Load home page, header, and render featured products grid | `@smoke` |
| `navigation.spec.ts` | Navigate between public header links | `@smoke` |

### 🛍️ Customer Test Suite (`tests/customer/`)
| Spec File | Test Description | Tags |
| :--- | :--- | :--- |
| `authentication.spec.ts` | Register a new customer account successfully | `@customer` |
| `authentication.spec.ts` | Show error when registering with an existing email | `@customer` |
| `authentication.spec.ts` | Show error when passwords do not match during registration | `@customer` |
| `authentication.spec.ts` | Log in successfully with valid customer credentials | `@customer` |
| `authentication.spec.ts` | Reject login with invalid password | `@customer` |
| `authentication.spec.ts` | Log out customer and clear active session UI | `@customer` |
| `cart.spec.ts` | Add items to cart and calculate correct subtotal | `@customer` |
| `cart.spec.ts` | Update item quantity and recalculate cart totals | `@customer` |
| `cart.spec.ts` | Remove item from cart | `@customer` |
| `cart.spec.ts` | Isolate cart items per logged-in user account | `@customer` |
| `checkout.spec.ts` | Pre-fill customer checkout form and place order successfully | `@customer` |
| `checkout.spec.ts` | Display empty cart state when accessing checkout without items | `@customer` |
| `collection.spec.ts` | Display product list on shop page | `@customer` |
| `collection.spec.ts` | Filter products by search query | `@customer` |
| `collection.spec.ts` | Show no results message when search match is empty | `@customer` |
| `collection.spec.ts` | Filter products by category checkbox selection | `@customer` |
| `collection.spec.ts` | Sort products by price low to high and high to low | `@customer` |
| `guest-authorization.spec.ts` | Redirect unauthenticated guest accessing protected customer routes to login | `@customer`, `@security` |
| `guest-authorization.spec.ts` | Redirect unauthenticated guest accessing protected admin routes to login | `@customer`, `@security` |
| `home.spec.ts` | Display categories and navigate on category card click | `@customer` |
| `home.spec.ts` | Click featured product and open Product Details page | `@customer` |
| `home.spec.ts` | Allow quick add to cart from home featured section | `@customer` |
| `orders.spec.ts` | Place an order dynamically and display it in customer order history list | `@customer` |
| `orders.spec.ts` | Block customer from viewing another customer order details | `@customer` |
| `product-details.spec.ts` | Load correct product details by product ID in URL | `@customer` |
| `product-details.spec.ts` | Increase and decrease product quantity within stock boundaries | `@customer` |
| `product-details.spec.ts` | Add product to cart from details page | `@customer` |
| `product-details.spec.ts` | Display Not Found state for invalid product ID | `@customer` |
| `product-details.spec.ts` | REGRESSION: Open exact clicked product details from collection page matching identity | `@customer` |
| `profile.spec.ts` | Display current user profile details and update profile info | `@customer` |
| `wishlist.spec.ts` | Toggle product wishlist state and display in Wishlist page | `@customer` |
| `wishlist.spec.ts` | Persist wishlist state across page refreshes | `@customer` |
| `wishlist.spec.ts` | Isolate wishlist between different logged-in users | `@customer` |

### 🛡️ Admin Test Suite (`tests/admin/`)
| Spec File | Test Description | Tags |
| :--- | :--- | :--- |
| `authentication.spec.ts` | Log in successfully as Admin and display Admin Dashboard | `@admin` |
| `authentication.spec.ts` | Redirect non-admin customer accounts attempting to access Admin routes | `@admin` |
| `categories.spec.ts` | Display categories table and open create category modal | `@admin` |
| `categories.spec.ts` | Create and delete an unassigned department category | `@admin` |
| `dashboard.spec.ts` | Display dynamic KPI cards and recent orders table | `@admin` |
| `inventory.spec.ts` | Display stock inventory table and adjust stock levels | `@admin` |
| `orders.spec.ts` | Display admin orders table and view dynamically created order details | `@admin` |
| `orders.spec.ts` | Update order fulfillment status from Placed to Shipped | `@admin` |
| `products.spec.ts` | Display product list and filter by search query | `@admin` |
| `products.spec.ts` | Complete full Product CRUD lifecycle (Create, Edit, Delete) | `@admin` |
| `products.spec.ts` | Toggle product catalog status between Active and Inactive | `@admin` |
| `users.spec.ts` | List registered users and toggle account status | `@admin` |
| `users.spec.ts` | Delete user from admin user directory | `@admin` |

### 🔄 End-to-End Workflow Suite (`tests/e2e/`)
| Spec File | Test Description | Tags |
| :--- | :--- | :--- |
| `customer-purchase-flow.spec.ts` | Customer login &rarr; Browse product &rarr; Add to cart &rarr; Checkout &rarr; Place order &rarr; View confirmation | `@e2e` |
| `inventory-flow.spec.ts` | Customer purchases 2 units &rarr; Stock decreases by 2 in Admin Inventory | `@e2e` |
| `order-status-flow.spec.ts` | Customer places order &rarr; Admin updates status to Shipped &rarr; Customer sees updated status | `@e2e` |
| `user-data-flow.spec.ts` | Customer registers & updates profile &rarr; Admin Users directory displays updated customer details | `@e2e` |

---

## 🎯 Selector Strategy (`data-testid`)

All page locators follow the standard `<domain>-<element>-<purpose>` naming convention.

### Primary Selector Examples
```html
<!-- Customer Login -->
<input data-testid="login-email-input" type="email" />
<input data-testid="login-password-input" type="password" />
<button data-testid="login-submit-button">Sign In</button>

<!-- Dynamic Product Cards -->
<div data-testid="product-card-1">
  <button data-testid="product-add-to-cart-1">Add to Cart</button>
  <button data-testid="product-wishlist-1">Wishlist</button>
</div>

<!-- Admin Portal Controls -->
<button data-testid="admin-nav-products">Products</button>
<button data-testid="admin-inventory-increase-1">+1</button>
<select data-testid="admin-order-status-select-1001"></select>
```

---

## 🚀 Execution & Command Reference

### Run All 53 Tests
```bash
npm run test:e2e
```

### Run Tests in Interactive UI Mode
```bash
npm run test:e2e:ui
```

### Run Tests in Headed Mode (Visible Browser Window)
```bash
npm run test:e2e:headed
```

### View HTML Test Execution Report
```bash
npm run test:e2e:report
```

### Run Specific Test Suite by Tag
```bash
# Run Smoke Tests only
npx playwright test --grep @smoke

# Run Customer Tests only
npx playwright test --grep @customer

# Run Admin Tests only
npx playwright test --grep @admin

# Run E2E Integration Workflows only
npx playwright test --grep @e2e
```

### Run Specific Spec File
```bash
npx playwright test tests/e2e/customer-purchase-flow.spec.ts
```

---

## ⚙️ Configuration & Environment Isolation

The runner is configured in [`playwright.config.ts`](file:///d:/Nuvora/playwright.config.ts):

```typescript
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5180',
    actionTimeout: 10000,
    navigationTimeout: 15000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev -- --port 5180 --strictPort',
    url: 'http://localhost:5180',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
```

---

## 🤖 CI/CD Pipeline Integration

The project includes an automated GitHub Actions workflow in [`.github/workflows/playwright.yml`](file:///.github/workflows/playwright.yml) that executes the complete test suite on every push or pull request to `main`.

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npm run test:e2e
    - uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }}
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```
