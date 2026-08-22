import { useParams, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function AdminOrderDetails() {
  const { orderId } = useParams();
  const { orders, updateOrderStatus } = useStore();

  const order = orders.find((o) => String(o.id) === String(orderId));

  if (!order) {
    return (
      <div data-testid="admin-order-details-not-found" className="p-12 text-center bg-surface rounded border border-outline-variant max-w-md mx-auto">
        <span className="material-symbols-outlined text-5xl text-outline mb-2">shopping_bag</span>
        <h2 className="text-headline-md font-headline-md font-bold text-on-surface mb-2">Order Record Not Found</h2>
        <p className="text-body-md text-on-surface-variant text-sm mb-6">No order matching ID #{orderId} exists in store memory.</p>
        <Link to="/admin/orders" data-testid="admin-order-details-return-button" className="bg-primary text-on-primary px-5 py-2.5 rounded font-label-sm text-xs font-bold uppercase tracking-wider inline-block">
          Return to Orders
        </Link>
      </div>
    );
  }

  const steps = ['Placed', 'Processing', 'Shipped', 'Delivered'];
  const currentStepIndex = steps.indexOf(order.status);

  return (
    <div data-testid="admin-order-details-container" className="w-full space-y-stack-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-display-lg-mobile md:text-headline-md font-headline-md font-bold text-on-background">Order #{order.id}</h2>
            <span
              data-testid="admin-order-details-status-badge"
              className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                order.status === 'Delivered'
                  ? 'bg-primary/10 text-primary'
                  : order.status === 'Cancelled'
                  ? 'bg-error-container text-on-error-container'
                  : 'bg-surface-container-high text-on-surface'
              }`}
            >
              {order.status}
            </span>
          </div>
          <p className="text-body-md text-on-surface-variant text-xs mt-1">
            Placed on {order.date} by {order.customerName || 'Customer'} ({order.customerEmail || 'N/A'})
          </p>
        </div>
        <Link
          to="/admin/orders"
          data-testid="admin-order-details-back-link"
          className="font-label-sm text-xs font-bold text-on-surface hover:text-primary flex items-center gap-1"
        >
          &larr; Back to Orders
        </Link>
      </div>

      {/* Progress Stepper (if not cancelled) */}
      {order.status !== 'Cancelled' && (
        <div className="bg-surface p-stack-md rounded border border-outline-variant shadow-xs">
          <div className="flex items-center justify-between w-full max-w-4xl mx-auto relative">
            {steps.map((step, idx) => {
              const isPassed = idx <= currentStepIndex;
              return (
                <div key={step} className="flex flex-col items-center z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                      isPassed ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container-low text-on-surface-variant border border-outline-variant'
                    }`}
                  >
                    {isPassed ? <span className="material-symbols-outlined text-sm">check</span> : idx + 1}
                  </div>
                  <span className={`text-xs font-label-sm uppercase tracking-wider mt-2 ${isPassed ? 'text-on-background font-bold' : 'text-on-surface-variant'}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Status Updater Bar */}
      <div className="bg-surface p-stack-md rounded border border-outline-variant shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="font-label-sm text-xs font-bold text-on-surface uppercase tracking-wider block">
            Update Order Progress Status
          </span>
          <span className="text-body-md text-on-surface-variant text-xs mt-0.5 block">
            Updating status notifies customer and updates live catalog records.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <label className="font-label-sm text-xs font-bold text-on-surface uppercase">Status:</label>
          <select
            value={order.status}
            data-testid="admin-order-details-status-select"
            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant rounded px-4 py-2 text-xs font-bold uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option value="Placed">Placed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Grid: Order Items & Customer Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-start w-full">
        {/* Line Items Card */}
        <div className="lg:col-span-2 bg-surface rounded border border-outline-variant shadow-xs p-stack-md space-y-4">
          <h3 className="text-headline-md font-headline-md font-bold text-on-background border-b border-outline-variant pb-3">
            Purchased Line Items ({(order.items || []).length})
          </h3>

          <div className="divide-y divide-outline-variant/60">
            {(order.items || []).map((item, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between text-sm">
                <div className="flex items-center gap-3.5">
                  <img
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover border border-outline-variant bg-surface"
                    src={item.image}
                  />
                  <div>
                    <p className="font-bold text-on-background">{item.name}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-on-background font-display">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-outline-variant pt-4 space-y-2 text-sm text-on-surface-variant">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${Number(order.subtotal || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span>{order.shipping === 0 ? 'FREE' : `$${Number(order.shipping || 0).toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (8%)</span>
              <span>${Number(order.tax || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-on-background pt-3 border-t border-outline-variant">
              <span>Grand Total</span>
              <span data-testid="admin-order-details-grand-total" className="text-primary font-display">${Number(order.total || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Customer Info Card */}
        <div className="bg-surface rounded border border-outline-variant shadow-xs p-stack-md space-y-5 text-sm">
          <h3 className="text-headline-md font-headline-md font-bold text-on-background border-b border-outline-variant pb-3">
            Customer Info
          </h3>
          <div>
            <span className="font-label-sm text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
              Customer Name
            </span>
            <p className="font-bold text-on-background">{order.customerName || 'Customer'}</p>
            <p className="text-on-surface-variant text-xs mt-0.5">{order.customerEmail || 'N/A'}</p>
          </div>
          <div>
            <span className="font-label-sm text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
              Shipping Address
            </span>
            <p className="text-on-surface font-medium leading-relaxed">
              {order.shippingAddress?.address || '123 Luxury Lane'}<br />
              {order.shippingAddress?.city
                ? `${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}`
                : 'New York, NY 10001'}
            </p>
          </div>
          <div>
            <span className="font-label-sm text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
              Payment Method
            </span>
            <p className="text-on-background font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-primary">credit_card</span>
              {order.paymentMethod || 'Credit Card'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
