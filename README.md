# Nuvora E-Commerce & QA Automation Sandbox

[![Playwright Tests](https://github.com/pandya-dwip/Nuvora/actions/workflows/playwright.yml/badge.svg)](https://github.com/pandya-dwip/Nuvora/actions/workflows/playwright.yml)
[![Vite](https://img.shields.io/badge/Vite-v8.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-v19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Playwright](https://img.shields.io/badge/Playwright-v1.62-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)

**Nuvora** is a high-performance frontend e-commerce platform and QA automation sandbox designed for modern web applications, featuring end-to-end user shopping flows, executive admin management, and a full-suite **Playwright TypeScript QA Automation Framework**.

---

## 🌟 Key Application Features

### 🛍️ Customer Portal
- **Home & Discovery**: Editorial hero banner, dynamic category grid, curated featured products, and quick add-to-cart.
- **Collection / Shop**: Real-time title search, category filtering checkboxes, stock availability filters, and price sorting (low-to-high / high-to-low).
- **Product Details**: Multi-angle image gallery, color variant selector, stock-bounded quantity modifier, collapsible accordion specs, wishlist toggle, and quick checkout options.
- **Cart & Checkout**: User-isolated itemized shopping cart, promo code entry, live tax/shipping calculations, and multi-step checkout form.
- **Order Management & Invoicing**: Interactive delivery timeline progress bar (`Placed` &rarr; `Processing` &rarr; `Shipped` &rarr; `Delivered`), order cancellation, itemized breakdown, and shipping address details.
- **User Profile & Wishlist**: Profile updates, address book management, security password settings, and isolated wishlist persistence.

### 🛡️ Admin Management Portal
- **Executive Dashboard**: Store performance KPIs (Total Revenue, Total Orders, Catalog Items, Active Accounts), recent orders log, and low-stock inventory alerts.
- **Product Catalog CRUD**: Search and category filtering, complete product creation/editing, catalog visibility status toggle (`Active` / `Inactive`), and product removal.
- **Inventory Control**: Real-time stock adjuster (`-1`, `+1`, `+10`), stock health progress bars, and low-stock/out-of-stock filtering.
- **Order Fulfillment**: Master orders directory, status tab filters (`Placed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`), live status updating, and itemized customer invoices.
- **User Account Directory**: System role management (`admin` / `customer`), account suspension (`Active` / `Disabled`), user deletion, and customer lifetime value metrics.
- **Taxonomy & Store Settings**: Department category creation/editing/deletion with safety assignment checks, global currency symbols, sales tax rates, and free shipping thresholds.

---

## 🛠️ Technology Stack & Architecture

- **Frontend Core**: React 19, Vite 8, React Router 7, JavaScript (ES6+).
- **Styling & UI System**: Tailwind CSS v4, Geist Typography, Material Symbols Outlined, adhering strictly to the **Nuvora Design System** ([`DESIGN.md`](file:///d:/Nuvora/DESIGN.md)):
  - Deep Forest Green (`#12362e` / `#2a4d44`) CTAs and active states.
  - Warm Off-White (`#faf9f7`) background and crisp white cards (`#ffffff`).
  - Architectural 4px rounded corners (`rounded`).
  - 100% full-screen layout container structure.
- **State Management & Persistence**: Custom React Context (`StoreContext.jsx`) backed by `localStorage` persistence and pre-seeded seed data (`src/data/`).
- **QA Automation Framework**: Playwright (v1.62) with TypeScript, Page Object Model (POM) architecture, custom fixtures, helper utilities, and HTML test reporting.
- **CI/CD Integration**: GitHub Actions workflow ([`.github/workflows/playwright.yml`](file:///.github/workflows/playwright.yml)) automated on `main` branch pushes and pull requests.

---

## 🔑 Pre-Seeded Test Credentials

| Role | Email Address | Password | Account Name |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `admin123` | Admin User |
| **Customer** | `jane@example.com` | `customer123` | Jane Doe |
| **Customer** | `dwip@gmail.com` | `password123` | Dwip |

---

## 🗺️ Application Routes

### Customer Routes
- `/` or `/home` — Customer Home Page
- `/shop` — Product Collection & Filter Page
- `/product/:productId` — Product Details View
- `/cart` — Shopping Cart
- `/checkout` — Checkout Page *(Protected)*
- `/order-confirmation` — Order Success & Summary *(Protected)*
- `/orders` — Customer Order History *(Protected)*
- `/orders/:orderId` — Customer Order Details *(Protected)*
- `/profile` — User Profile & Address Book *(Protected)*
- `/wishlist` — Saved Wishlist Items
- `/login` — Sign In Page *(Guest Only)*
- `/register` — Account Registration *(Guest Only)*

### Admin Routes
- `/admin` & `/admin/dashboard` — Admin Executive Dashboard *(Admin Only)*
- `/admin/products` — Product Catalog Directory *(Admin Only)*
- `/admin/products/new` — Create New Product *(Admin Only)*
- `/admin/products/:productId/edit` — Edit Catalog Product *(Admin Only)*
- `/admin/inventory` — Inventory Control & Stock Adjuster *(Admin Only)*
- `/admin/orders` — Order Fulfillment Directory *(Admin Only)*
- `/admin/orders/:orderId` — Admin Order Invoicing *(Admin Only)*
- `/admin/users` — User Account Directory *(Admin Only)*
- `/admin/users/:userId` — User Details & Lifetime Value *(Admin Only)*
- `/admin/categories` — Department Category Taxonomy *(Admin Only)*
- `/admin/settings` — Global Store Settings *(Admin Only)*

---

## 🚀 Getting Started

### 1. Installation

Install all node dependencies:

```bash
npm install
```

### 2. Local Development Server

Start the local Vite development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### 3. Production Build & Preview

Compile and test the production bundle:

```bash
npm run build
npm run preview
```

### 4. Code Quality & Linting

Run ESLint verification:

```bash
npm run lint
```

---

## 🧪 Playwright QA Test Automation

Nuvora includes a comprehensive **53-test E2E automation suite** written in TypeScript using Playwright.

| Command | Description |
| :--- | :--- |
| `npm run test:e2e` | Run all 53 Playwright tests headlessly |
| `npm run test:e2e:ui` | Open interactive Playwright UI Test Runner |
| `npm run test:e2e:headed` | Run Playwright tests with visible browser window |
| `npm run test:e2e:report` | Open the HTML test execution report |

For complete documentation on test suites, Page Object Models, test data fixtures, and CI/CD pipelines, see [**TESTING.md**](file:///d:/Nuvora/TESTING.md).

---

## 📁 Repository Structure

```
Nuvora/
├── .github/
│   └── workflows/
│       └── playwright.yml        # Automated CI/CD Test Pipeline
├── src/
│   ├── components/               # Header, ProductCard, Footer
│   ├── context/                  # StoreContext state provider & auth logic
│   ├── data/                     # Seed JSON data (products, users, orders, categories)
│   ├── layouts/                  # CustomerLayout & AdminLayout
│   ├── pages/
│   │   ├── admin/                # Dashboard, Products, Inventory, Orders, Users, Categories, Settings
│   │   └── customer/             # Home, Collection, ProductDetails, Cart, Checkout, Profile, Orders, Wishlist
│   ├── routes/                   # AppRoutes & Route Guards (Protected/Guest)
│   └── styles/                   # index.css (Tailwind & design tokens)
├── tests/
│   ├── admin/                    # Admin functional specs
│   ├── customer/                 # Customer functional specs
│   ├── e2e/                      # Cross-role end-to-end integration workflows
│   ├── fixtures/                 # Custom Playwright test fixtures
│   ├── pages/                    # Page Object Models (Customer & Admin)
│   ├── smoke/                    # Smoke test specs
│   ├── test-data/                # Static test data & configuration
│   └── utils/                    # Session reset & auth test helpers
├── DESIGN.md                     # UX/UI Design Guidelines & Palette Tokens
├── TESTING.md                    # QA Automation Framework Documentation
├── playwright.config.ts          # Playwright Test Runner Configuration
└── package.json                  # Dependencies & npm scripts
```
