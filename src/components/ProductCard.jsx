import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product }) {
  const { isInWishlist, toggleWishlist, addToCart } = useStore();
  const [isAdded, setIsAdded] = useState(false);

  const isLiked = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    const res = addToCart(product.id, 1);
    if (res.success) {
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }
  };

  const defaultImage =
    product.image ||
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop';

  return (
    <div className="group flex flex-col bg-surface-container-lowest border border-outline-variant rounded overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      {/* Wishlist Button */}
      <button
        aria-label="Add to wishlist"
        onClick={handleWishlistClick}
        className="absolute top-2 right-2 z-10 p-2 text-on-surface-variant hover:text-primary focus:outline-none bg-surface-container-lowest/80 rounded-full backdrop-blur-sm cursor-pointer"
      >
        <span
          aria-hidden="true"
          className={`material-symbols-outlined ${isLiked ? 'text-error' : ''}`}
          style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
        >
          favorite
        </span>
      </button>

      {/* Product Link & Image */}
      <Link
        to={`/product/${product.id}`}
        className="block relative aspect-square overflow-hidden bg-surface-container"
      >
        <img
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={defaultImage}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/75 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-error text-on-error text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      <div className="p-stack-md flex-1 flex flex-col">
        <span className="text-[12px] uppercase tracking-wider text-on-surface-variant mb-1 block">
          {product.category || 'Collection'}
        </span>
        <Link
          to={`/product/${product.id}`}
          className="text-body-md font-body-md font-medium text-on-background hover:text-primary mb-2 line-clamp-1"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-1 mb-3">
          <span className="text-label-sm text-secondary">★ {product.rating || '4.8'}</span>
          <span className="text-xs text-on-surface-variant ml-1">({product.stock} in stock)</span>
        </div>
        <div className="flex items-center gap-2 mb-stack-md mt-auto">
          <span className="text-headline-md font-headline-md text-on-background">
            ${Number(product.price).toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-body-md text-on-surface-variant line-through">
              ${Number(product.originalPrice).toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart CTA */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full h-10 rounded transition-colors duration-200 text-label-sm font-label-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center gap-2 ${
            isOutOfStock
              ? 'bg-surface-container text-on-surface-variant cursor-not-allowed opacity-60'
              : isAdded
              ? 'bg-primary text-on-primary cursor-pointer'
              : 'bg-surface-container-highest text-on-surface hover:bg-primary hover:text-on-primary cursor-pointer'
          }`}
        >
          {isOutOfStock ? (
            'Out of Stock'
          ) : isAdded ? (
            <>
              Added to Cart <span className="material-symbols-outlined text-[14px]">check</span>
            </>
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  );
}
