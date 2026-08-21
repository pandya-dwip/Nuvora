import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function Checkout() {
  const { cart, products, currentUser, placeOrder } = useStore();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [formData, setFormData] = useState({
    fullName: currentUser ? currentUser.name : 'Jane Doe',
    email: currentUser ? currentUser.email : 'jane@example.com',
    address: '123 Luxury Lane',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    cardNumber: '4532 •••• •••• 8892',
    expiry: '12/28',
    cvc: '889',
  });

  const cartItems = cart
    .map((item) => {
      const prod = products.find((p) => String(p.id) === String(item.productId));
      if (!prod) return null;
      return { ...item, product: prod };
    })
    .filter(Boolean);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 15.0;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + shipping + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }

    const newOrder = placeOrder(formData, paymentMethod);
    if (newOrder) {
      navigate('/order-confirmation', { state: { order: newOrder } });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="px-margin-mobile md:px-margin-desktop py-16 text-center max-w-md mx-auto">
        <span className="material-symbols-outlined text-5xl text-outline mb-2">shopping_bag</span>
        <h2 className="text-headline-md font-headline-md text-on-surface mb-2">Your Cart is Empty</h2>
        <p className="text-body-md text-on-surface-variant mb-6">
          You have no items in your shopping cart to checkout.
        </p>
        <Link
          to="/shop"
          className="bg-primary text-on-primary px-6 py-3 rounded font-label-sm text-label-sm inline-block"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-stack-lg">
      <div className="mb-stack-md">
        <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg-mobile md:font-display-lg text-on-background">
          Checkout
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-start">
        {/* Left Column: Form Details */}
        <div className="lg:col-span-2 flex flex-col gap-stack-md">
          {/* Shipping Address */}
          <div className="bg-surface border border-outline-variant rounded p-stack-md flex flex-col gap-stack-sm">
            <h2 className="text-headline-md font-headline-md text-on-background border-b border-outline-variant pb-3 mb-2">
              1. Shipping Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label htmlFor="fullName" className="font-label-sm text-label-sm text-on-surface">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-body-md"
                />
              </div>
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label htmlFor="email" className="font-label-sm text-label-sm text-on-surface">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-body-md"
                />
              </div>
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label htmlFor="address" className="font-label-sm text-label-sm text-on-surface">
                  Street Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-body-md"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="city" className="font-label-sm text-label-sm text-on-surface">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-body-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="state" className="font-label-sm text-label-sm text-on-surface">
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded text-body-md"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="zip" className="font-label-sm text-label-sm text-on-surface">
                    Postal Code
                  </label>
                  <input
                    id="zip"
                    name="zip"
                    type="text"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded text-body-md"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-surface border border-outline-variant rounded p-stack-md flex flex-col gap-stack-sm">
            <h2 className="text-headline-md font-headline-md text-on-background border-b border-outline-variant pb-3 mb-2">
              2. Payment Method
            </h2>

            <div className="flex gap-4 mb-4">
              <label
                className={`flex-1 flex items-center gap-2 p-3 border rounded cursor-pointer ${
                  paymentMethod === 'Credit Card'
                    ? 'border-primary bg-surface-container-low font-medium'
                    : 'border-outline-variant'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="Credit Card"
                  checked={paymentMethod === 'Credit Card'}
                  onChange={() => setPaymentMethod('Credit Card')}
                  className="text-primary focus:ring-primary"
                />
                <span className="material-symbols-outlined text-[20px]">credit_card</span>
                <span className="font-label-sm text-sm">Credit / Debit Card</span>
              </label>
              <label
                className={`flex-1 flex items-center gap-2 p-3 border rounded cursor-pointer ${
                  paymentMethod === 'PayPal'
                    ? 'border-primary bg-surface-container-low font-medium'
                    : 'border-outline-variant'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="PayPal"
                  checked={paymentMethod === 'PayPal'}
                  onChange={() => setPaymentMethod('PayPal')}
                  className="text-primary focus:ring-primary"
                />
                <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                <span className="font-label-sm text-sm">PayPal</span>
              </label>
            </div>

            {paymentMethod === 'Credit Card' ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1 sm:col-span-3">
                  <label htmlFor="cardNumber" className="font-label-sm text-label-sm text-on-surface">
                    Card Number
                  </label>
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-body-md"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="expiry" className="font-label-sm text-label-sm text-on-surface">
                    Expiry Date
                  </label>
                  <input
                    id="expiry"
                    name="expiry"
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded text-body-md"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="cvc" className="font-label-sm text-label-sm text-on-surface">
                    CVC / CVV
                  </label>
                  <input
                    id="cvc"
                    name="cvc"
                    type="text"
                    placeholder="123"
                    value={formData.cvc}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded text-body-md"
                  />
                </div>
              </div>
            ) : (
              <div className="p-4 bg-surface-container-low rounded border border-outline-variant text-body-md text-sm">
                You will be redirected to PayPal to complete your purchase securely.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="bg-surface border border-outline-variant rounded p-stack-md flex flex-col gap-stack-md">
          <h2 className="text-headline-md font-headline-md text-on-background border-b border-outline-variant pb-3">
            Order Summary
          </h2>

          {/* Cart Items */}
          <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={`${item.productId}-${item.color}`} className="flex items-center justify-between text-body-md text-sm">
                <div className="flex items-center gap-3">
                  <img
                    alt={item.product.name}
                    className="w-12 h-12 rounded object-cover border border-outline-variant"
                    src={item.product.image}
                  />
                  <div>
                    <p className="font-medium text-on-background truncate max-w-[150px]">{item.product.name}</p>
                    <p className="text-xs text-on-surface-variant">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold text-on-background">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <hr className="border-t border-outline-variant" />

          {/* Pricing Breakdown */}
          <div className="flex flex-col gap-2 text-body-md text-on-surface-variant text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-headline-md font-headline-md text-on-background pt-2 border-t border-outline-variant">
              <span>Total</span>
              <span className="text-primary">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            className="w-full py-4 rounded bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary-container transition-colors duration-200 cursor-pointer mt-2"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}
