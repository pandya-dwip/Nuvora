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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Live operational overview & metrics.</p>
        </div>
        <Link
          to="/admin/products/new"
          className="bg-slate-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          + Add New Product
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">Total Revenue</p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">${totalRevenue.toFixed(2)}</h3>
          </div>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">payments</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">Total Orders</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalOrders}</h3>
            <span className="text-xs text-amber-600 font-medium">{pendingOrders} pending</span>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">shopping_bag</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">Catalog Products</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalProducts}</h3>
            <span className="text-xs text-red-600 font-medium">
              {lowStockCount} low stock / {outOfStockCount} out
            </span>
          </div>
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">inventory_2</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">Total Users</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalUsers}</h3>
          </div>
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">group</span>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Customer Orders</h2>
          <Link to="/admin/orders" className="text-xs text-emerald-600 hover:underline font-semibold">
            View All Orders &rarr;
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="p-3 font-semibold text-gray-900">#{order.id}</td>
                    <td className="p-3 text-gray-700">{order.customerName}</td>
                    <td className="p-3 text-gray-500">{order.date}</td>
                    <td className="p-3 font-bold text-gray-900">${Number(order.total).toFixed(2)}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'Cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
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
          <p className="text-sm text-gray-500 py-4">No recent orders.</p>
        )}
      </div>
    </div>
  );
}
