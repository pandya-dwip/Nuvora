# Nuvora E-Commerce Application

## Project

Nuvora is a lightweight, high-performance frontend e-commerce application created as a practical learning project for QA automation and CI/CD pipelines.

The application features two distinct roles:
- **Customer Portal**: Browsing, filtering, cart management, checkout flow, order tracking, and user profile management.
- **Admin Portal**: Product catalog management, inventory control, user management, order processing, and store settings.

The application uses a lightweight local JSON data layer (`src/data/`) for data access without requiring a real backend or database.

## Tech Stack

- **React** (v19)
- **Vite** (v8)
- **JavaScript**
- **Tailwind CSS** (v4)
- **React Router** (v7)
- **Playwright** — *planned*
- **GitHub Actions** — *planned*
- **Vercel** — *planned*

## Available Routes

### Customer Portal
- `/` — Home (Hero banner, dynamic categories, featured products, collections)
- `/shop` — Collection (Search, filter sidebar, category chips, sort options)
- `/product/:productId` — Product Details (Image gallery, color selection, quantity controls, accordions)
- `/cart` — Shopping Cart (Itemized cart, quantity adjusters, promo code, order summary)
- `/checkout` — Checkout (Shipping address, payment selection, order review)
- `/order-confirmation` — Order Confirmation (Success banner, delivery summary, invoice breakdown)
- `/orders` — Order History (Status tabs, order list)
- `/orders/:orderId` — Order Details (Status timeline stepper, itemized invoice)
- `/profile` — User Profile Dashboard (Personal info, saved addresses, security settings)
- `/wishlist` — Saved Wishlist Items
- `/login` — User Sign In
- `/register` — Account Registration

### Admin Portal
- `/admin` & `/admin/dashboard` — Admin Dashboard
- `/admin/products` — Product Management
- `/admin/products/new` — Create Product
- `/admin/products/:productId/edit` — Edit Product
- `/admin/inventory` — Inventory Control
- `/admin/orders` — Orders Management
- `/admin/users` — User Management
- `/admin/categories` — Category Management
- `/admin/settings` — Admin Settings

## Installation

Install project dependencies:

```bash
npm install
```

## Development

Start the local Vite development server:

```bash
npm run dev
```

## Build

Compile the production bundle:

```bash
npm run build
```

## Lint

Run ESLint code quality checks:

```bash
npm run lint
```
