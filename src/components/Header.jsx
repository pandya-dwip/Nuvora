import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, wishlist, currentUser, logout } = useStore();
  const navigate = useNavigate();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/shop');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-20 bg-surface/95 backdrop-blur-sm border-b border-outline-variant transition-all duration-300">
      {/* Brand & Desktop Navigation */}
      <div className="flex items-center gap-stack-md flex-1">
        <Link
          to="/home"
          className="text-headline-md font-headline-md font-bold tracking-tight text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
        >
          LUXE
        </Link>
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-stack-md">
          <Link
            to="/shop"
            className="text-label-sm font-label-sm text-primary border-b-2 border-primary pb-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          >
            Shop
          </Link>
          <Link
            to="/shop"
            className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          >
            Collections
          </Link>
          <Link
            to="/shop"
            className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          >
            Editorial
          </Link>
        </nav>
      </div>

      {/* Desktop Search Bar */}
      <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-stack-md">
        <div className="relative w-full">
          <span
            aria-hidden="true"
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline"
          >
            search
          </span>
          <input
            type="search"
            aria-label="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none text-body-md font-body-md placeholder-outline transition-colors"
          />
        </div>
      </form>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-stack-sm flex-1">
        <button
          aria-label="Search"
          onClick={() => navigate('/shop')}
          className="p-2 text-on-surface-variant hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded-full md:hidden cursor-pointer"
        >
          <span className="material-symbols-outlined">search</span>
        </button>

        {currentUser ? (
          <Link
            to="/profile"
            aria-label="Account"
            className="p-2 text-on-surface-variant hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded-full hidden sm:flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="text-xs font-medium max-w-[80px] truncate">{currentUser.name}</span>
          </Link>
        ) : (
          <Link
            to="/login"
            aria-label="Sign In"
            className="p-2 text-on-surface-variant hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded-full hidden sm:block cursor-pointer"
          >
            <span className="material-symbols-outlined">person</span>
          </Link>
        )}

        <Link
          to="/wishlist"
          aria-label="Wishlist"
          className="p-2 text-on-surface-variant hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded-full hidden sm:block relative cursor-pointer"
        >
          <span className="material-symbols-outlined">favorite</span>
          {wishlist.length > 0 && (
            <span className="absolute top-1 right-1 bg-primary text-on-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center pointer-events-none">
              {wishlist.length}
            </span>
          )}
        </Link>

        <Link
          to="/cart"
          aria-label="Cart"
          className="p-2 text-on-surface-variant hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded-full relative cursor-pointer"
        >
          <span className="material-symbols-outlined">shopping_cart</span>
          {totalCartCount > 0 && (
            <span className="absolute top-1 right-1 bg-primary text-on-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center pointer-events-none">
              {totalCartCount}
            </span>
          )}
        </Link>

        {currentUser && currentUser.role === 'admin' && (
          <Link
            to="/admin"
            className="hidden lg:inline-flex text-xs bg-slate-900 text-white px-2.5 py-1 rounded font-medium hover:bg-slate-800 transition-colors ml-2"
          >
            Admin Portal
          </Link>
        )}

        {currentUser && (
          <button
            onClick={handleLogout}
            title="Logout"
            aria-label="Logout"
            className="hidden sm:inline-flex p-2 text-on-surface-variant hover:text-error transition-colors duration-200 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        )}

        <button
          aria-label="Menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-on-surface-variant hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded-full md:hidden cursor-pointer"
        >
          <span className="material-symbols-outlined">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-surface border-b border-outline-variant p-margin-mobile flex flex-col gap-4 md:hidden shadow-lg z-50">
          <Link
            to="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-label-sm font-label-sm text-on-surface py-2 border-b border-outline-variant"
          >
            Shop All Products
          </Link>
          <Link
            to="/cart"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-label-sm font-label-sm text-on-surface py-2 border-b border-outline-variant flex justify-between"
          >
            <span>Shopping Cart</span>
            <span className="font-bold">({totalCartCount})</span>
          </Link>
          <Link
            to="/wishlist"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-label-sm font-label-sm text-on-surface py-2 border-b border-outline-variant flex justify-between"
          >
            <span>Wishlist</span>
            <span className="font-bold">({wishlist.length})</span>
          </Link>
          {currentUser ? (
            <>
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-label-sm font-label-sm text-on-surface py-2 border-b border-outline-variant"
              >
                My Profile ({currentUser.name})
              </Link>
              <Link
                to="/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-label-sm font-label-sm text-on-surface py-2 border-b border-outline-variant"
              >
                My Orders
              </Link>
              {currentUser.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-label-sm font-label-sm text-primary font-bold py-2 border-b border-outline-variant"
                >
                  Admin Portal
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="text-label-sm font-label-sm text-error text-left py-2"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-label-sm font-label-sm text-primary font-bold py-2"
            >
              Sign In / Register
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
