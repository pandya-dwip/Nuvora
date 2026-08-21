import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function Cart() {
  const { cart, products, updateCartQty, removeFromCart, clearCart } = useStore();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const navigate = useNavigate();

  const cartItems = cart
    .map((item) => {
      const prod = products.find((p) => String(p.id) === String(item.productId));
      if (!prod) return null;
      return { ...item, product: prod };
    })
    .filter(Boolean);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LUXE10') {
      setDiscount(0.1); // 10% off
      setPromoMessage('10% promo discount applied!');
    } else {
      setDiscount(0);
      setPromoMessage('Invalid promo code.');
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 15.0;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + shipping + tax;

  return (
    <div data-testid="cart-container" className="px-margin-mobile md:px-margin-desktop py-stack-lg">
      <div className="mb-stack-md flex items-center justify-between">
        <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg-mobile md:font-display-lg text-on-background">
          Shopping Cart ({cartItems.length})
        </h1>
        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            data-testid="cart-clear-button"
            className="text-label-sm font-label-sm text-error hover:underline cursor-pointer"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-start">
          {/* Cart Item List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-surface border border-outline-variant rounded p-stack-md flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  data-testid={`cart-item-${item.product.id}`}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-outline-variant last:border-0 last:pb-0 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="w-20 h-20 rounded bg-surface-container overflow-hidden flex-shrink-0"
                    >
                      <img
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        src={item.product.image}
                      />
                    </Link>
                    <div>
                      <span className="text-[12px] uppercase text-on-surface-variant font-label-sm block">
                        {item.product.category}
                      </span>
                      <Link
                        to={`/product/${item.product.id}`}
                        data-testid={`cart-item-name-${item.product.id}`}
                        className="text-body-md font-medium text-on-background hover:text-primary transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p data-testid={`cart-item-price-${item.product.id}`} className="text-body-md font-semibold text-primary mt-1">
                        ${Number(item.product.price).toFixed(2)}
                      </p>
                      <span className="text-xs text-on-surface-variant">
                        Color: {item.color || 'Default'} | Max stock: {item.product.stock}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-outline-variant rounded h-10 w-28">
                      <button
                        onClick={() => updateCartQty(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        data-testid={`cart-item-${item.product.id}-decrease`}
                        className="w-8 h-full flex items-center justify-center text-on-surface-variant hover:text-primary cursor-pointer disabled:opacity-40"
                        aria-label="Decrease quantity"
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span data-testid={`cart-item-${item.product.id}-quantity`} className="flex-1 text-center font-body-md text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQty(item.productId, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        data-testid={`cart-item-${item.product.id}-increase`}
                        className="w-8 h-full flex items-center justify-center text-on-surface-variant hover:text-primary cursor-pointer disabled:opacity-40"
                        aria-label="Increase quantity"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>

                    <p data-testid={`cart-item-${item.product.id}-total`} className="font-semibold text-on-background w-20 text-right">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.productId)}
                      data-testid={`cart-item-${item.product.id}-remove`}
                      className="text-on-surface-variant hover:text-error transition-colors p-1 cursor-pointer"
                      aria-label="Remove item"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <Link
                to="/shop"
                data-testid="cart-continue-shopping-link"
                className="text-label-sm font-label-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Summary Panel */}
          <div className="bg-surface-container-low border border-outline-variant rounded p-stack-md flex flex-col gap-stack-md">
            <h2 className="text-headline-md font-headline-md text-on-background border-b border-outline-variant pb-3">
              Order Summary
            </h2>

            <form onSubmit={applyPromo} className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  data-testid="cart-promo-input"
                  placeholder="Promo Code (LUXE10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-sm focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  data-testid="cart-promo-submit"
                  className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded font-label-sm text-xs hover:bg-outline-variant transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p data-testid="cart-promo-message" className={`text-xs ${discount > 0 ? 'text-primary' : 'text-error'}`}>
                  {promoMessage}
                </p>
              )}
            </form>

            <div className="flex flex-col gap-2 text-body-md text-on-surface-variant text-sm border-b border-outline-variant pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span data-testid="cart-subtotal" className="font-medium text-on-surface">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-primary font-medium">
                  <span>Discount (10%)</span>
                  <span data-testid="cart-discount">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span data-testid="cart-shipping">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span data-testid="cart-tax">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between text-headline-md font-headline-md text-on-background">
              <span>Total</span>
              <span data-testid="cart-total" className="text-primary">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              data-testid="cart-checkout-button"
              className="w-full bg-primary text-on-primary py-3 rounded font-label-sm text-label-sm uppercase tracking-widest text-center hover:bg-primary-container transition-colors cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div data-testid="cart-empty-state" className="text-center py-16 bg-surface-container-low rounded border border-outline-variant max-w-md mx-auto">
          <span className="material-symbols-outlined text-5xl text-outline mb-2">shopping_bag</span>
          <h2 className="text-headline-md font-headline-md text-on-surface mb-2">Your Cart is Empty</h2>
          <p className="text-body-md text-on-surface-variant mb-6">
            Looks like you haven&apos;t added any items to your shopping cart yet.
          </p>
          <Link
            to="/shop"
            data-testid="cart-empty-explore-button"
            className="bg-primary text-on-primary px-6 py-3 rounded font-label-sm text-label-sm inline-block hover:bg-primary-container transition-colors"
          >
            Explore Collection
          </Link>
        </div>
      )}
    </div>
  );
}
