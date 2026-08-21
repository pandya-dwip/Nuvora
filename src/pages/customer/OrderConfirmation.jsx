import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function OrderConfirmation() {
  const location = useLocation();
  const { orders, currentUser } = useStore();

  const userOrders = currentUser
    ? orders.filter((o) => o.userId === currentUser.id || o.customerEmail === currentUser.email)
    : orders;

  const order = location.state?.order || userOrders[0];

  if (!order) {
    return (
      <div data-testid="order-confirmation-empty" className="px-margin-mobile md:px-margin-desktop py-16 text-center max-w-md mx-auto">
        <span className="material-symbols-outlined text-5xl text-outline mb-2">inventory</span>
        <h2 className="text-headline-md font-headline-md text-on-surface mb-2">No Recent Order Found</h2>
        <p className="text-body-md text-on-surface-variant mb-6">
          You haven&apos;t placed any recent orders in this session.
        </p>
        <Link
          to="/shop"
          data-testid="order-confirmation-explore-button"
          className="bg-primary text-on-primary px-6 py-3 rounded font-label-sm text-label-sm inline-block"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div data-testid="order-confirmation-container" className="px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col items-center">
      <div className="w-full max-w-3xl bg-surface border border-outline-variant rounded p-stack-lg flex flex-col gap-stack-md text-left">
        {/* Success Header */}
        <div className="flex flex-col items-center text-center pb-stack-md border-b border-outline-variant">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>
          <h1 data-testid="order-success-message" className="text-display-lg-mobile font-display-lg-mobile text-on-background mb-2">
            Thank you for your order!
          </h1>
          <p className="text-body-md text-on-surface-variant max-w-md">
            Order <span data-testid="order-id" className="font-semibold text-primary">#{order.id}</span> has been successfully placed. A confirmation email has been sent.
          </p>
        </div>

        {/* Order Info Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md py-stack-sm border-b border-outline-variant">
          <div className="flex flex-col gap-1">
            <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
              Shipping Address
            </h3>
            <p className="text-body-md text-on-surface-variant text-sm">
              {order.shippingAddress?.fullName || order.customerName}<br />
              {order.shippingAddress?.address}<br />
              {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
              Estimated Delivery
            </h3>
            <p className="text-body-md text-on-surface-variant text-sm">
              Standard Shipping (3-5 business days)<br />
              <span data-testid="order-status" className="text-primary font-medium">Status: {order.status || 'Placed'}</span>
            </p>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="flex flex-col gap-3 pb-stack-md border-b border-outline-variant">
          <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
            Order Items ({order.items.length})
          </h3>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-body-md text-sm py-2">
              <div className="flex items-center gap-3">
                <img
                  alt={item.name}
                  className="w-12 h-12 rounded object-cover border border-outline-variant"
                  src={item.image}
                />
                <div>
                  <p className="font-medium text-on-background">{item.name}</p>
                  <p className="text-xs text-on-surface-variant">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-semibold text-on-background">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Order Payment Summary */}
        <div className="flex flex-col gap-2 text-body-md text-on-surface-variant text-sm border-b border-outline-variant pb-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${Number(order.subtotal || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? 'FREE' : `$${Number(order.shipping || 0).toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (8%)</span>
            <span>${Number(order.tax || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-headline-md font-headline-md text-on-background pt-2 border-t border-outline-variant">
            <span>Total Paid</span>
            <span data-testid="order-total" className="text-primary">${Number(order.total || 0).toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Link
            to="/orders"
            data-testid="order-view-orders-button"
            className="flex-1 bg-primary text-on-primary py-3 rounded font-label-sm text-label-sm text-center uppercase tracking-widest hover:bg-primary-container transition-colors cursor-pointer"
          >
            View My Orders
          </Link>
          <Link
            to="/shop"
            data-testid="order-continue-shopping-button"
            className="flex-1 border border-outline-variant text-on-surface py-3 rounded font-label-sm text-label-sm text-center uppercase tracking-widest hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
