import { useParams, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function CustomerOrderDetails() {
  const { orderId } = useParams();
  const { orders, currentUser, updateOrderStatus } = useStore();

  const order = orders.find((o) => String(o.id) === String(orderId));

  if (!order) {
    return (
      <div data-testid="order-details-not-found" className="px-margin-mobile md:px-margin-desktop py-16 text-center max-w-md mx-auto">
        <span className="material-symbols-outlined text-5xl text-outline mb-2">package_2</span>
        <h2 className="text-headline-md font-headline-md text-on-surface mb-2">Order Not Found</h2>
        <p className="text-body-md text-on-surface-variant mb-6">
          The requested order does not exist or has been removed.
        </p>
        <Link
          to="/orders"
          data-testid="order-details-return-orders-button"
          className="bg-primary text-on-primary px-6 py-3 rounded font-label-sm text-label-sm inline-block"
        >
          Return to My Orders
        </Link>
      </div>
    );
  }

  // Prevent customer from viewing another customer's order
  if (
    currentUser &&
    currentUser.role !== 'admin' &&
    String(order.userId) !== String(currentUser.id) &&
    order.customerEmail !== currentUser.email
  ) {
    return (
      <div data-testid="order-details-access-denied" className="px-margin-mobile md:px-margin-desktop py-16 text-center max-w-md mx-auto">
        <span className="material-symbols-outlined text-5xl text-error mb-2">lock</span>
        <h2 className="text-headline-md font-headline-md text-on-surface mb-2">Access Denied</h2>
        <p className="text-body-md text-on-surface-variant mb-6">
          You are not authorized to view this order.
        </p>
        <Link
          to="/orders"
          data-testid="order-details-denied-return-button"
          className="bg-primary text-on-primary px-6 py-3 rounded font-label-sm text-label-sm inline-block"
        >
          Return to My Orders
        </Link>
      </div>
    );
  }

  const handleCancelOrder = () => {
    updateOrderStatus(order.id, 'Cancelled');
  };

  const steps = [
    { label: 'Placed', done: ['Placed', 'Processing', 'Shipped', 'Delivered'].includes(order.status) },
    { label: 'Processing', done: ['Processing', 'Shipped', 'Delivered'].includes(order.status) },
    { label: 'Shipped', done: ['Shipped', 'Delivered'].includes(order.status) },
    { label: 'Delivered', done: order.status === 'Delivered' },
  ];

  const canCancel = ['Placed', 'Processing'].includes(order.status);

  return (
    <div data-testid="order-details-container" className="px-margin-mobile md:px-margin-desktop py-stack-lg">
      <div className="mb-stack-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg-mobile md:font-display-lg text-on-background">
          Order Details (<span data-testid="order-details-id">#{order.id}</span>)
        </h1>
        <div className="flex items-center gap-4">
          {canCancel && (
            <button
              onClick={handleCancelOrder}
              data-testid="order-details-cancel-button"
              className="text-label-sm font-label-sm text-error border border-error/30 px-3 py-1.5 rounded hover:bg-error-container transition-colors cursor-pointer"
            >
              Cancel Order
            </button>
          )}
          <Link to="/orders" data-testid="order-details-back-button" className="text-label-sm font-label-sm text-primary hover:underline">
            &larr; Back to My Orders
          </Link>
        </div>
      </div>

      {/* Status Progress Stepper */}
      {order.status !== 'Cancelled' ? (
        <div className="bg-surface border border-outline-variant rounded p-stack-md mb-stack-md">
          <div className="flex justify-between items-center max-w-2xl mx-auto relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary -translate-y-1/2 -z-0"></div>
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center relative z-10 bg-surface px-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.done ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {step.done ? '✓' : idx + 1}
                </div>
                <span data-testid={`order-details-step-${step.label.toLowerCase()}`} className="text-xs font-label-sm mt-1 text-on-background">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div data-testid="order-details-cancelled-alert" className="p-4 bg-red-100 text-red-800 rounded mb-stack-md font-medium text-center">
          This order has been Cancelled.
        </div>
      )}

      {/* Main Order Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-start">
        {/* Items List */}
        <div className="lg:col-span-2 bg-surface border border-outline-variant rounded p-stack-md flex flex-col gap-4">
          <h2 className="text-headline-md font-headline-md text-on-background border-b border-outline-variant pb-3">
            Itemized Order Invoice
          </h2>

          <div className="flex flex-col gap-4">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between pb-4 border-b border-outline-variant last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <Link
                    to={`/product/${item.productId}`}
                    className="w-16 h-16 rounded bg-surface-container overflow-hidden flex-shrink-0"
                  >
                    <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                  </Link>
                  <div>
                    <span className="text-[12px] uppercase text-on-surface-variant font-label-sm block">
                      {item.category || 'Product'}
                    </span>
                    <Link
                      to={`/product/${item.productId}`}
                      className="text-body-md font-medium text-on-background hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                </div>

                <span className="font-semibold text-on-background">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="flex flex-col gap-stack-md">
          <div className="bg-surface-container-low border border-outline-variant rounded p-stack-md flex flex-col gap-3 text-sm">
            <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold border-b border-outline-variant pb-2">
              Shipping & Recipient
            </h3>
            <p className="text-on-surface-variant">
              <strong>Order Date:</strong> {order.date}
            </p>
            <p className="text-on-surface-variant">
              <strong>Recipient:</strong> {order.shippingAddress?.fullName || order.customerName}
            </p>
            <p className="text-on-surface-variant">
              {order.shippingAddress?.address || '123 Luxury Lane'}
            </p>
            <p className="text-on-surface-variant">
              {order.shippingAddress?.city
                ? `${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}`
                : 'New York, NY 10001'}
            </p>
          </div>

          <div className="bg-surface-container-low border border-outline-variant rounded p-stack-md flex flex-col gap-3 text-sm">
            <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold border-b border-outline-variant pb-2">
              Payment Breakdown
            </h3>
            <p className="text-on-surface-variant mb-1">
              <strong>Method:</strong> {order.paymentMethod || 'Credit Card'}
            </p>

            <div className="flex justify-between text-on-surface-variant">
              <span>Subtotal</span>
              <span data-testid="order-details-subtotal">${Number(order.subtotal || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Shipping</span>
              <span data-testid="order-details-shipping">{order.shipping === 0 ? 'FREE' : `$${Number(order.shipping || 0).toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Tax (8%)</span>
              <span data-testid="order-details-tax">${Number(order.tax || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-headline-md font-headline-md text-on-background pt-2 border-t border-outline-variant">
              <span>Total</span>
              <span data-testid="order-details-total" className="text-primary">${Number(order.total || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
