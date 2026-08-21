import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function AdminLayout() {
  const { currentUser, logout, orders, products } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div data-testid="admin-access-denied" className="min-h-screen flex flex-col items-center justify-center bg-background text-on-background p-6 text-center">
        <div className="bg-surface p-8 rounded border border-outline-variant shadow-sm max-w-md w-full">
          <div className="w-16 h-16 bg-error-container text-error rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-4xl">lock</span>
          </div>
          <h2 className="text-headline-md font-headline-md font-bold mb-2 text-on-background">
            Admin Access Required
          </h2>
          <p className="text-on-surface-variant mb-6 text-body-md">
            You must be logged in as an Admin to access the Admin Portal.
          </p>
          <button
            onClick={() => navigate('/login')}
            data-testid="admin-denied-login-button"
            className="w-full bg-primary text-on-primary py-3 rounded font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary-container transition-colors cursor-pointer"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const pendingOrdersCount = orders.filter((o) => ['Placed', 'Processing'].includes(o.status)).length;
  const lowStockCount = products.filter((p) => p.stock < 10).length;

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'grid_view', testId: 'admin-nav-dashboard' },
    { label: 'Products', path: '/admin/products', icon: 'inventory_2', badge: products.length, testId: 'admin-nav-products' },
    { label: 'Inventory', path: '/admin/inventory', icon: 'warehouse', alertBadge: lowStockCount > 0 ? lowStockCount : null, testId: 'admin-nav-inventory' },
    { label: 'Orders', path: '/admin/orders', icon: 'local_mall', badge: pendingOrdersCount > 0 ? pendingOrdersCount : null, testId: 'admin-nav-orders' },
    { label: 'Users', path: '/admin/users', icon: 'group', testId: 'admin-nav-users' },
    { label: 'Categories', path: '/admin/categories', icon: 'category', testId: 'admin-nav-categories' },
    { label: 'Store Settings', path: '/admin/settings', icon: 'tune', testId: 'admin-nav-settings' },
  ];

  const currentNav = navItems.find((item) => location.pathname.startsWith(item.path));
  const pageTitle = currentNav ? currentNav.label : 'Admin Portal';

  return (
    <div data-testid="admin-layout" className="min-h-screen flex bg-background text-on-background font-sans">
      {/* Sidebar Navigation */}
      <aside data-testid="admin-sidebar" className="w-64 bg-[#12362e] text-on-primary flex flex-col p-4 flex-shrink-0 border-r border-[#2a4d44] z-20">
        {/* Brand & Portal Badge */}
        <div className="flex items-center justify-between px-3 py-3 mb-6 border-b border-[#2a4d44] pb-5">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-widest text-white uppercase font-display">
              LUXE
            </span>
          </div>
          <span className="text-[10px] bg-[#2a4d44] text-[#a9cec2] font-semibold px-2 py-0.5 rounded border border-[#a9cec2]/30 uppercase tracking-widest">
            ADMIN
          </span>
        </div>

        {/* Navigation Items */}
        <nav aria-label="Admin Navigation" className="flex flex-col gap-1 flex-1">
          <div className="px-3 text-[11px] font-label-sm text-[#97bdb1] uppercase tracking-wider mb-2">
            Navigation
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                data-testid={item.testId}
                className={`px-3.5 py-2.5 rounded flex items-center justify-between text-label-sm font-label-sm transition-colors ${
                  isActive
                    ? 'bg-[#2a4d44] text-white font-bold'
                    : 'text-[#97bdb1] hover:bg-[#1f433b] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.alertBadge && (
                  <span className="bg-error text-on-error text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.alertBadge}
                  </span>
                )}
                {item.badge && !item.alertBadge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-[#1f433b] text-[#a9cec2]'}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer User Info & Actions */}
        <div className="mt-auto pt-4 border-t border-[#2a4d44] flex flex-col gap-2">
          <div className="px-3 py-2 bg-[#1f433b] rounded flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#2a4d44] text-white font-bold flex items-center justify-center text-sm font-display border border-[#a9cec2]/20">
              {currentUser.name.charAt(0)}
            </div>
            <div className="overflow-hidden text-xs">
              <span className="text-white font-semibold block truncate">{currentUser.name}</span>
              <span className="text-[#97bdb1] block truncate">{currentUser.email}</span>
            </div>
          </div>

          <Link
            to="/home"
            data-testid="admin-storefront-link"
            className="text-xs text-[#97bdb1] hover:text-white flex items-center justify-between px-3 py-2 rounded hover:bg-[#1f433b] transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">storefront</span>
              Customer Store
            </span>
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            data-testid="admin-signout-button"
            className="text-xs text-error-container hover:text-white text-left px-3 py-2 rounded hover:bg-[#1f433b] transition-colors cursor-pointer flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area with Header Bar */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Bar */}
        <header className="h-16 bg-surface border-b border-outline-variant px-margin-mobile md:px-margin-desktop flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-headline-md font-headline-md text-on-background font-bold">{pageTitle}</h1>
            <span className="text-body-md text-on-surface-variant text-sm">/ Overview</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/admin/products/new"
              data-testid="admin-new-product-button"
              className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded text-label-sm font-label-sm uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              New Product
            </Link>
          </div>
        </header>

        {/* 100% Full Width Scrollable Page Body */}
        <main className="flex-1 p-margin-mobile md:p-margin-desktop overflow-y-auto w-full bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
