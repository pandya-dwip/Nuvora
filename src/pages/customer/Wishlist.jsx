import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { useStore } from '../../context/StoreContext';

export default function Wishlist() {
  const { wishlist, products, addToCart } = useStore();

  const wishlistProducts = products.filter((p) =>
    wishlist.some((id) => String(id) === String(p.id))
  );

  const handleAddAllToCart = () => {
    wishlistProducts.forEach((product) => {
      if (product.stock > 0) {
        addToCart(product.id, 1);
      }
    });
  };

  return (
    <div data-testid="wishlist-container" className="px-margin-mobile md:px-margin-desktop py-stack-lg">
      <div className="mb-stack-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg-mobile md:font-display-lg text-on-background">
          My Saved Wishlist ({wishlistProducts.length})
        </h1>
        {wishlistProducts.length > 0 && (
          <button
            onClick={handleAddAllToCart}
            data-testid="wishlist-add-all-to-cart-button"
            className="bg-primary text-on-primary px-4 py-2 rounded font-label-sm text-xs uppercase tracking-wider hover:bg-primary-container transition-colors cursor-pointer"
          >
            Add All to Cart
          </button>
        )}
      </div>

      {wishlistProducts.length > 0 ? (
        <div data-testid="wishlist-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-gutter">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div data-testid="wishlist-empty-state" className="text-center py-16 bg-surface-container-low rounded border border-outline-variant max-w-md mx-auto">
          <span className="material-symbols-outlined text-5xl text-outline mb-2">favorite_border</span>
          <h2 className="text-headline-md font-headline-md text-on-surface mb-2">Your Wishlist is Empty</h2>
          <p className="text-body-md text-on-surface-variant mb-6">
            Save items you love to your wishlist while shopping.
          </p>
          <Link
            to="/shop"
            data-testid="wishlist-explore-button"
            className="bg-primary text-on-primary px-6 py-3 rounded font-label-sm text-label-sm inline-block hover:bg-primary-container transition-colors"
          >
            Explore Products
          </Link>
        </div>
      )}
    </div>
  );
}
