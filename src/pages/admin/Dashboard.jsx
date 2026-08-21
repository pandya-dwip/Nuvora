import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function AdminDashboard() {
  const { products, orders, users } = useStore();

  const totalProducts = products.length;
  const totalUsers = users.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => ['Placed', 'Processing'].includes(o.status)).length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock < 10).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + Number(o.total || 0), 0);

  const recentOrders = orders.slice(0, 5);
  const lowStockProducts = products.filter((p) => p.stock < 10).slice(0, 5);

  return (
    <div className="w-full space-y-stack-md">
      {/* Welcome Hero Banner */}
      <div className="bg-[#12362e] text-on-primary p-stack-md rounded border border-[#2a4d44] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-label-sm tracking-widest text-[#97bdb1] block mb-1">
            Store Performance Overview
          </span>
          <h2 className="text-headline-md font-headline-md font-bold">
            LUXE Executive Dashboard
          </h2>
          <p className="text-[#97bdb1] text-body-md text-sm mt-1">
            Real-time catalog analytics, order fulfillment status, and customer metrics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products/new"
            className="bg-[#2a4d44] hover:bg-[#1f433b] text-white px-4 py-2.5 rounded font-label-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
          >
            + Add Product
          </Link>
          <Link
            to="/admin/inventory"
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded font-label-sm text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
          >
            Audit Stock
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter w-full">
        {/* Card 1: Revenue */}
        <div className="bg-surface p-stack-md rounded border border-outline-variant shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Total Revenue
            </span>
            <div className="w-10 h-10 bg-primary/10 text-primary rounded flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">payments</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-display-lg-mobile font-bold text-on-background font-display">
              ${totalRevenue.toFixed(2)}
            </h3>
            <span className="text-xs text-primary font-medium flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-xs">trending_up</span> +12.5% vs last month
            </span>
          </div>
        </div>

        {/* Card 2: Orders */}
        <div className="bg-surface p-stack-md rounded border border-outline-variant shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Total Orders
            </span>
            <div className="w-10 h-10 bg-primary/10 text-primary rounded flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">local_mall</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-display-lg-mobile font-bold text-on-background font-display">
              {totalOrders}
            </h3>
            <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-xs">pending</span> {pendingOrders} pending fulfillment
            </span>
          </div>
        </div>

        {/* Card 3: Catalog Products */}
        <div className="bg-surface p-stack-md rounded border border-outline-variant shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Catalog Items
            </span>
            <div className="w-10 h-10 bg-primary/10 text-primary rounded flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">inventory_2</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-display-lg-mobile font-bold text-on-background font-display">
              {totalProducts}
            </h3>
            <span className="text-xs text-error font-medium flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-xs">warning</span> {lowStockCount} low / {outOfStockCount} out
            </span>
          </div>
        </div>

        {/* Card 4: Registered Users */}
        <div className="bg-surface p-stack-md rounded border border-outline-variant shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Active Accounts
            </span>
            <div className="w-10 h-10 bg-primary/10 text-primary rounded flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">group</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-display-lg-mobile font-bold text-on-background font-display">
              {totalUsers}
            </h3>
            <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1 mt-1">
              Registered customers & admins
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Orders Table & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter w-full">
        {/* Recent Orders (2 Columns) */}
        <div className="lg:col-span-2 bg-surface rounded border border-outline-variant shadow-xs p-stack-md">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-outline-variant">
            <div>
              <h3 className="text-headline-md font-headline-md font-bold text-on-background">Recent Customer Orders</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Latest purchase transactions across the store</p>
            </div>
            <Link to="/admin/orders" className="text-xs text-primary font-bold hover:underline">
              View All Orders &rarr;
            </Link>
          </div>

          {recentOrders.length > 0 ? (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface-container-low text-on-surface-variant font-label-sm text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Order ID</th>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Total</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/60">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-surface-container-lowest transition-colors">
                      <td className="p-3.5 font-bold text-on-background">
                        <Link to={`/admin/orders/${order.id}`} className="hover:text-primary">
                          #{order.id}
                        </Link>
                      </td>
                      <td className="p-3.5 font-medium text-on-surface">{order.customerName}</td>
                      <td className="p-3.5 text-on-surface-variant text-xs">{order.date}</td>
                      <td className="p-3.5 font-bold text-on-background">${Number(order.total).toFixed(2)}</td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${
                            order.status === 'Delivered'
                              ? 'bg-primary/10 text-primary'
                              : order.status === 'Cancelled'
                              ? 'bg-error-container text-on-error-container'
                              : 'bg-surface-container-high text-on-surface'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-on-surface-variant py-6 text-center">No orders recorded yet.</p>
          )}
        </div>

        {/* Low Stock Alerts (1 Column) */}
        <div className="bg-surface rounded border border-outline-variant shadow-xs p-stack-md">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-outline-variant">
            <div>
              <h3 className="text-headline-md font-headline-md font-bold text-on-background">Inventory Alerts</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Products requiring stock replenishment</p>
            </div>
            <Link to="/admin/inventory" className="text-xs text-primary font-bold hover:underline">
              Inventory &rarr;
            </Link>
          </div>

          {lowStockProducts.length > 0 ? (
            <div className="flex flex-col gap-3">
              {lowStockProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center justify-between p-3 rounded border border-outline-variant bg-surface-container-lowest"
                >
                  <div className="flex items-center gap-3">
                    <img
                      alt={prod.name}
                      className="w-10 h-10 rounded object-cover border border-outline-variant bg-surface"
                      src={prod.image}
                    />
                    <div>
                      <p className="text-xs font-bold text-on-background truncate max-w-[130px]">
                        {prod.name}
                      </p>
                      <span className="text-[11px] text-on-surface-variant">{prod.category}</span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-bold ${
                      prod.stock === 0
                        ? 'bg-error-container text-on-error-container'
                        : 'bg-secondary-container text-on-secondary-container'
                    }`}
                  >
                    {prod.stock === 0 ? 'Out of Stock' : `${prod.stock} left`}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-on-surface-variant text-xs">
              <span className="material-symbols-outlined text-3xl text-primary mb-1 block">check_circle</span>
              All inventory levels are healthy!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
