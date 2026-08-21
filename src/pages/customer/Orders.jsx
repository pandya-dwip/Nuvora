import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function CustomerOrders() {
  const { orders, currentUser } = useStore();
  const [activeTab, setActiveTab] = useState('All');

  // Filter orders for current user if logged in
  const userOrders = currentUser
    ? orders.filter((o) => o.userId === currentUser.id || o.customerEmail === currentUser.email)
    : orders;

  const filteredOrders = activeTab === 'All'
    ? userOrders
    : userOrders.filter((o) => o.status === activeTab);

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-stack-lg">
      <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg-mobile md:font-display-lg text-on-background mb-stack-md">
        My Orders ({userOrders.length})
      </h1>

      {/* Filter Tabs */}
      <div className="flex gap-4 border-b border-outline-variant mb-stack-md overflow-x-auto">
        {['All', 'Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 font-label-sm text-label-sm border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === tab
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="flex flex-col gap-stack-md">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-surface border border-outline-variant rounded p-stack-md flex flex-col gap-4 hover:shadow-sm transition-shadow"
            >
              {/* Order Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-outline-variant text-sm">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-on-background">#{order.id}</span>
                  <span className="text-on-surface-variant">{order.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider ${
                      order.status === 'Delivered'
                        ? 'bg-primary/10 text-primary'
                        : order.status === 'Cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="font-bold text-on-background">${Number(order.total).toFixed(2)}</span>
                </div>
              </div>

              {/* Items Preview */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3 overflow-hidden">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <img
                        key={idx}
                        alt={item.name}
                        className="inline-block h-12 w-12 rounded-full ring-2 ring-surface object-cover border border-outline-variant"
                        src={item.image}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-body-md text-sm font-medium text-on-background">
                      {order.items[0]?.name || 'Item'}
                      {order.items.length > 1 ? ` +${order.items.length - 1} more` : ''}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      Total {order.items.reduce((s, i) => s + i.quantity, 0)} items
                    </p>
                  </div>
                </div>

                <Link
                  to={`/orders/${order.id}`}
                  className="bg-surface-container-low border border-outline-variant text-on-surface hover:bg-surface-container-high px-4 py-2 rounded text-label-sm font-label-sm text-center transition-colors cursor-pointer"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-surface-container-low rounded border border-outline-variant">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">package_2</span>
            <p className="text-body-md text-on-surface-variant">No orders found in this status.</p>
          </div>
        )}
      </div>
    </div>
  );
}
