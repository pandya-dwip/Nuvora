import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useStore();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'All') return matchesSearch;
    return matchesSearch && o.status === activeTab;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Shipped':
        return 'bg-surface-container-high text-on-surface border-outline-variant';
      case 'Processing':
        return 'bg-secondary-container text-on-secondary-container border-secondary-container';
      case 'Cancelled':
        return 'bg-error-container text-on-error-container border-error/20';
      default:
        return 'bg-surface-container-low text-on-surface border-outline-variant';
    }
  };

  return (
    <div className="w-full space-y-stack-md">
      {/* Header */}
      <div>
        <h2 className="text-display-lg-mobile md:text-headline-md font-headline-md font-bold text-on-background">Order Fulfillment Management</h2>
        <p className="text-body-md text-on-surface-variant text-sm mt-1">Track customer transactions, update order progress, and review invoices.</p>
      </div>

      {/* Control Bar: Status Tabs & Search */}
      <div className="bg-surface p-stack-md rounded border border-outline-variant shadow-xs flex flex-col sm:flex-row gap-stack-sm items-center justify-between">
        <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((tab) => {
            const count = tab === 'All' ? orders.length : orders.filter((o) => o.status === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-2 rounded font-label-sm text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search ID or Customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary placeholder-outline"
          />
        </div>
      </div>

      {/* Orders Data Table */}
      <div className="bg-surface rounded border border-outline-variant shadow-xs overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-low border-b border-outline-variant text-on-surface-variant font-label-sm text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer Info</th>
                <th className="p-4">Date</th>
                <th className="p-4">Grand Total</th>
                <th className="p-4">Fulfillment Status</th>
                <th className="p-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {filtered.length > 0 ? (
                filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="p-4 font-bold text-on-background">
                      <Link to={`/admin/orders/${order.id}`} className="hover:text-primary">
                        #{order.id}
                      </Link>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-on-background">{order.customerName}</p>
                      <p className="text-xs text-on-surface-variant">{order.customerEmail}</p>
                    </td>
                    <td className="p-4 text-on-surface-variant text-xs font-medium">{order.date}</td>
                    <td className="p-4 font-bold text-on-background font-display">
                      ${Number(order.total).toFixed(2)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`px-3 py-1 rounded border text-xs font-bold uppercase tracking-wider focus:outline-none cursor-pointer ${getStatusBadge(
                            order.status
                          )}`}
                        >
                          <option value="Placed">Placed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="px-3 py-1.5 bg-surface-container-low hover:bg-surface-container text-on-surface rounded text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
                      >
                        <span>View</span>
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl text-outline block mb-2">shopping_bag</span>
                    No orders found matching filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
