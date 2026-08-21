import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { useStore } from '../../context/StoreContext';

export default function ProductDetails() {
  const { productId } = useParams();
  const { products, addToCart, isInWishlist, toggleWishlist } = useStore();
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState('Matte Black');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = products.find((p) => String(p.id) === String(productId));

  if (!product) {
    return (
      <div className="px-margin-mobile md:px-margin-desktop py-16 text-center max-w-md mx-auto">
        <span className="material-symbols-outlined text-5xl text-outline mb-2">search_off</span>
        <h2 className="text-headline-md font-headline-md text-on-surface mb-2">Product Not Found</h2>
        <p className="text-body-md text-on-surface-variant mb-6">
          The product you are looking for does not exist or has been removed from the catalog.
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

  const isLiked = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;

  const galleryImages =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.image, product.image, product.image, product.image];

  const relatedProducts = products
    .filter((p) => p.category === product.category && String(p.id) !== String(product.id))
    .slice(0, 4);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    const res = addToCart(product.id, quantity, selectedColor);
    if (res.success) {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product.id, quantity, selectedColor);
    navigate('/checkout');
  };

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-stack-lg">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-stack-md">
        <ol className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant">
          <li>
            <Link to="/home" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-primary transition-colors">
              {product.category}
            </Link>
          </li>
          <li>/</li>
          <li className="text-on-surface font-medium truncate max-w-xs">{product.name}</li>
        </ol>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-stack-lg">
        {/* Left Column: Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square w-full rounded-lg bg-surface-container overflow-hidden border border-outline-variant relative group">
            <img
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={galleryImages[activeImageIndex] || product.image}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = product.image;
              }}
            />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-background/75 backdrop-blur-[1px] flex items-center justify-center">
                <span className="bg-error text-on-error font-bold px-4 py-2 rounded uppercase tracking-wider text-sm">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`aspect-square rounded border overflow-hidden transition-opacity cursor-pointer ${activeImageIndex === idx
                  ? 'border-2 border-primary'
                  : 'border-outline-variant opacity-70 hover:opacity-100'
                  }`}
              >
                <img
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  src={img}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = product.image;
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Info */}
        <div className="flex flex-col">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">
            {product.category}
          </p>
          <h1 className="font-headline-md text-headline-md text-on-background mb-4">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-amber-500">
              <span className="material-symbols-outlined text-sm">star</span>
              <span className="material-symbols-outlined text-sm">star</span>
              <span className="material-symbols-outlined text-sm">star</span>
              <span className="material-symbols-outlined text-sm">star</span>
              <span className="material-symbols-outlined text-sm">star_half</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {product.rating || '4.8'} (124 reviews)
            </span>
          </div>

          <div className="flex items-end gap-4 mb-8">
            <span className="font-headline-md text-headline-md text-primary">
              ${Number(product.price).toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="font-body-md text-body-md text-on-surface-variant line-through mb-1">
                ${Number(product.originalPrice).toFixed(2)}
              </span>
            )}
            {product.originalPrice && (
              <span className="font-label-sm text-label-sm text-error bg-error-container px-2 py-1 rounded mb-1">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>

          <hr className="border-t border-outline-variant mb-8" />

          {/* Color Selection */}
          <div className="mb-6">
            <p className="font-label-sm text-label-sm text-on-background mb-3">
              Color: <span className="font-normal text-on-surface-variant">{selectedColor}</span>
            </p>
            <div className="flex gap-3">
              {['Matte Black', 'White', 'Silver'].map((color) => (
                <button
                  key={color}
                  aria-label={`Select ${color}`}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${color === 'Matte Black'
                    ? 'bg-[#1A1A1A]'
                    : color === 'White'
                      ? 'bg-[#F5F5F5]'
                      : 'bg-[#D3D3D3]'
                    } ${selectedColor === color ? 'border-primary ring-2 ring-primary/30' : 'border-outline-variant'
                    }`}
                ></button>
              ))}
            </div>
          </div>

          {/* Quantity & Stock Status */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col gap-2">
              <p className="font-label-sm text-label-sm text-on-background">Quantity</p>
              <div className="flex items-center border border-outline-variant rounded w-32 h-12">
                <button
                  disabled={isOutOfStock || quantity <= 1}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-sm">remove</span>
                </button>
                <span className="flex-grow text-center font-body-md text-body-md">{quantity}</span>
                <button
                  disabled={isOutOfStock || quantity >= product.stock}
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
            </div>
            <div className="flex items-center mt-6">
              {!isOutOfStock ? (
                <div className="flex items-center text-primary">
                  <span className="material-symbols-outlined text-sm mr-1">check_circle</span>
                  <span className="font-label-sm text-label-sm">
                    In Stock ({product.stock} available)
                  </span>
                </div>
              ) : (
                <div className="flex items-center text-error">
                  <span className="material-symbols-outlined text-sm mr-1">cancel</span>
                  <span className="font-label-sm text-label-sm">Out of Stock</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-grow h-14 rounded font-label-sm text-label-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${isOutOfStock
                  ? 'bg-surface-container text-on-surface-variant cursor-not-allowed opacity-60'
                  : isAdded
                    ? 'bg-primary text-on-primary cursor-pointer'
                    : 'bg-primary text-on-primary hover:bg-primary-container cursor-pointer'
                  }`}
              >
                {isOutOfStock ? 'Out of Stock' : isAdded ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-14 h-14 border border-outline-variant rounded flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all cursor-pointer"
              >
                <span
                  className={`material-symbols-outlined ${isLiked ? 'text-error' : ''}`}
                  style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
              </button>
            </div>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`w-full h-14 border border-on-background text-on-background rounded font-label-sm text-label-sm uppercase tracking-widest transition-colors ${isOutOfStock
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-surface-container-low cursor-pointer'
                }`}
            >
              Buy Now
            </button>
          </div>

          {/* Delivery Info */}
          <div className="bg-surface-container-low rounded-lg p-4 flex flex-col gap-3 mb-8">
            <div className="flex items-center gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined">local_shipping</span>
              <span className="font-body-md text-body-md text-sm">Free delivery over $200 (3-5 days)</span>
            </div>
            <div className="flex items-center gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined">assignment_return</span>
              <span className="font-body-md text-body-md text-sm">Easy 30-day returns</span>
            </div>
          </div>

          {/* Accordions */}
          <div className="border-t border-outline-variant">
            <details className="group py-4 border-b border-outline-variant cursor-pointer" open>
              <summary className="flex justify-between items-center font-label-sm text-label-sm text-on-background list-none">
                Description
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="mt-4 font-body-md text-body-md text-on-surface-variant text-sm leading-relaxed">
                <p>{product.description || 'Crafted with premium materials for everyday reliability.'}</p>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-stack-lg border-t border-outline-variant">
          <h2 className="text-display-lg-mobile font-display-lg-mobile text-on-background mb-stack-md">
            Related Products in {product.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
