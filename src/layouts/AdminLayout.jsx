import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function AdminLayout() {
  const { currentUser, logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full border border-gray-200">
          <span className="material-symbols-outlined text-5xl text-red-600 mb-3">lock</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Access Required</h2>
          <p className="text-gray-600 mb-6 text-sm">
            You must be logged in as an Admin to access the Admin Portal.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-slate-900 text-white py-2.5 rounded font-medium hover:bg-slate-800 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { label: 'Products', path: '/admin/products', icon: 'inventory_2' },
    { label: 'Inventory', path: '/admin/inventory', icon: 'warehouse' },
    { label: 'Orders', path: '/admin/orders', icon: 'shopping_bag' },
    { label: 'Users', path: '/admin/users', icon: 'group' },
    { label: 'Categories', path: '/admin/categories', icon: 'category' },
    { label: 'Settings', path: '/admin/settings', icon: 'settings' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-900">
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-4 flex-shrink-0">
        <div className="text-xl font-bold text-emerald-400 mb-6 px-2 flex items-center justify-between">
          <span>LUXE Admin</span>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-normal uppercase">
            v1.0
          </span>
        </div>
        <nav className="flex flex-col gap-1 text-sm flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2.5 rounded flex items-center gap-2.5 transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-emerald-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-4 border-t border-slate-800 flex flex-col gap-2">
          <div className="px-3 py-2 text-xs text-slate-400">
            Signed in as <strong className="text-white font-medium block truncate">{currentUser.name}</strong>
          </div>
          <Link
            to="/home"
            className="text-xs text-slate-300 hover:text-white flex items-center gap-1 px-3 py-2 rounded hover:bg-slate-800"
          >
            &larr; Return to Store
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="text-xs text-red-400 hover:text-red-300 text-left px-3 py-2 rounded hover:bg-slate-800 cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
