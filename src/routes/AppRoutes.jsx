import { Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

// Layouts
import CustomerLayout from '../layouts/CustomerLayout';
import AdminLayout from '../layouts/AdminLayout';

// Customer Pages
import Home from '../pages/customer/Home';
import Collection from '../pages/customer/Collection';
import ProductDetails from '../pages/customer/ProductDetails';
import Cart from '../pages/customer/Cart';
import Checkout from '../pages/customer/Checkout';
import OrderConfirmation from '../pages/customer/OrderConfirmation';
import CustomerOrders from '../pages/customer/Orders';
import CustomerOrderDetails from '../pages/customer/OrderDetails';
import Profile from '../pages/customer/Profile';
import Wishlist from '../pages/customer/Wishlist';
import Login from '../pages/customer/Login';
import Register from '../pages/customer/Register';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import AdminProducts from '../pages/admin/Products';
import AdminProductForm from '../pages/admin/ProductForm';
import AdminInventory from '../pages/admin/Inventory';
import AdminOrders from '../pages/admin/Orders';
import AdminOrderDetails from '../pages/admin/OrderDetails';
import AdminUsers from '../pages/admin/Users';
import AdminUserDetails from '../pages/admin/UserDetails';
import AdminCategories from '../pages/admin/Categories';
import AdminSettings from '../pages/admin/Settings';

// Fallback Page
import NotFound from '../pages/NotFound';

/**
 * Route Guard for Unauthenticated Users:
 * Redirects to /login if user is not logged in.
 */
function ProtectedCustomerRoute({ children }) {
  const { currentUser } = useStore();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

/**
 * Route Guard for Guest Pages (Login / Register):
 * Redirects logged-in users to /home (Customer) or /admin/dashboard (Admin).
 */
function GuestRoute({ children }) {
  const { currentUser } = useStore();
  if (currentUser) {
    if (currentUser.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/home" replace />;
  }
  return children;
}

/**
 * Route Guard for Admin Pages:
 * Redirects to /login if not logged in, or /home if logged in as customer.
 */
function ProtectedAdminRoute({ children }) {
  const { currentUser } = useStore();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  if (currentUser.role !== 'admin') {
    return <Navigate to="/home" replace />;
  }
  return children;
}

export default function AppRoutes() {
  const { currentUser } = useStore();

  return (
    <Routes>
      {/* Root Path: Redirects Admin to /admin/dashboard, otherwise to /home */}
      <Route
        path="/"
        element={
          currentUser?.role === 'admin' ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Navigate to="/home" replace />
          )
        }
      />

      {/* Guest Authentication Routes (Login & Register) */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      {/* Public Customer Routes (Browsing & Cart) */}
      <Route element={<CustomerLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Collection />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Protected Customer Routes (Requires Login) */}
        <Route
          path="/checkout"
          element={
            <ProtectedCustomerRoute>
              <Checkout />
            </ProtectedCustomerRoute>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <ProtectedCustomerRoute>
              <OrderConfirmation />
            </ProtectedCustomerRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedCustomerRoute>
              <CustomerOrders />
            </ProtectedCustomerRoute>
          }
        />
        <Route
          path="/orders/:orderId"
          element={
            <ProtectedCustomerRoute>
              <CustomerOrderDetails />
            </ProtectedCustomerRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedCustomerRoute>
              <Profile />
            </ProtectedCustomerRoute>
          }
        />
      </Route>

      {/* Protected Admin Routes (Requires Admin Role) */}
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/new" element={<AdminProductForm />} />
        <Route path="products/:productId/edit" element={<AdminProductForm />} />
        <Route path="inventory" element={<AdminInventory />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:orderId" element={<AdminOrderDetails />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="users/:userId" element={<AdminUserDetails />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="categories/new" element={<AdminCategories openModal={true} />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
