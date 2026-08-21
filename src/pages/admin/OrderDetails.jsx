import { useParams, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function AdminOrderDetails() {
  const { orderId } = useParams();
  const { orders, updateOrderStatus } = useStore();

  const order = orders.find((o) => String(o.id) === String(orderId));

  if (!order) {
    return (
      <div className="p-8 text-center bg-white rounded border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Order Not Found</h2>
        <Link to="/admin/orders" className="text-emerald-600 font-semibold hover:underline">
          Return to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
          <p className="text-sm text-gray-500">Placed on {order.date} by {order.customerName}</p>
        </div>
        <Link to="/admin/orders" className="text-xs text-gray-600 hover:underline font-medium">
          &larr; Back to Orders List
        </Link>
      </div>

      {/* Status Updater Card */}
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase block">Fulfillment Status</span>
          <span
            className={`inline-block mt-1 px-3 py-1 rounded text-xs font-bold uppercase ${
              order.status === 'Delivered'
                ? 'bg-emerald-100 text-emerald-800'
                : order.status === 'Cancelled'
                ? 'bg-red-100 text-red-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-gray-700">Change Status:</label>
          <select
            value={order.status}
            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-sm font-semibold focus:outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="Placed">Placed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Items Table */}
        <div className="md:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2">
            Ordered Line Items ({order.items.length})
          </h2>

          <div className="divide-y divide-gray-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <img
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover border border-gray-200 bg-gray-100"
                    src={item.image}
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity} × ${Number(item.price).toFixed(2)}</p>
                  </div>
                </div>
                <span className="font-bold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-1.5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${Number(order.subtotal || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? 'FREE' : `$${Number(order.shipping || 0).toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (8%)</span>
              <span>${Number(order.tax || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Total Revenue</span>
              <span className="text-emerald-600">${Number(order.total || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Customer & Address Details */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4 text-sm">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2">
            Customer Information
          </h2>
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">Customer</p>
            <p className="font-semibold text-gray-900">{order.customerName}</p>
            <p className="text-gray-600 text-xs">{order.customerEmail}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">Shipping Address</p>
            <p className="text-gray-700">
              {order.shippingAddress?.address || '123 Luxury Lane'}<br />
              {order.shippingAddress?.city
                ? `${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}`
                : 'New York, NY 10001'}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">Payment</p>
            <p className="text-gray-700 font-medium">{order.paymentMethod || 'Credit Card'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
