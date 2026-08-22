import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { useStore } from '../../context/StoreContext';

export default function Collection() {
  const { products, categories } = useStore();
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [maxPrice, setMaxPrice] = useState(500);
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const displayCategoryNames = Array.from(
    new Set([
      ...categories.map((c) => c.name),
      ...products.map((p) => p.category),
    ])
  ).filter(Boolean);

  const filteredProducts = products
    .filter((item) => {
      const matchesSearch = searchQuery
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesCategory = selectedCategory
        ? item.category.toLowerCase() === selectedCategory.toLowerCase()
        : true;
      const matchesPrice = item.price <= maxPrice;
      const matchesStock = inStockOnly ? item.stock > 0 : true;
      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    })
    .sort((a, b) => {
      if (selectedSort === 'price-asc') return a.price - b.price;
      if (selectedSort === 'price-desc') return b.price - a.price;
      if (selectedSort === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (selectedSort === 'newest') return b.id - a.id;
      return 0; // recommended
    });

  return (
    <div data-testid="collection-container" className="px-margin-mobile md:px-margin-desktop py-stack-lg">
      {/* Header Title */}
      <div className="mb-stack-lg">
        <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg-mobile md:font-display-lg text-on-background mb-stack-sm">
          Shop Collection ({filteredProducts.length})
        </h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant">
          Explore our complete range of carefully curated minimalist items.
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-stack-lg pb-stack-md border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <button
            aria-controls="filter-sidebar"
            aria-expanded={isFilterSidebarOpen}
            data-testid="collection-filter-toggle-button"
            onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-md text-on-surface font-label-sm text-label-sm hover:bg-surface-container-low transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
            Filters
          </button>
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
              search
            </span>
            <input
              type="text"
              data-testid="collection-search-input"
              aria-label="Search within results"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-md text-body-md font-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-outline"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="sort-by"
            className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap"
          >
            Sort by:
          </label>
          <select
            id="sort-by"
            data-testid="collection-sort-select"
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant rounded-md px-3 py-2 text-body-md font-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary pr-8 cursor-pointer"
          >
            <option value="recommended">Recommended</option>
            <option value="newest">Newest Arrival</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-gutter">
        {/* Filter Sidebar */}
        {isFilterSidebarOpen && (
          <aside
            id="filter-sidebar"
            data-testid="collection-filter-sidebar"
            aria-label="Product Filters"
            className="w-full lg:w-64 flex-shrink-0 space-y-stack-md"
          >
            {/* Categories */}
            <div className="border-b border-outline-variant pb-stack-md">
              <h3 className="font-label-sm text-label-sm font-bold text-on-surface mb-3 uppercase tracking-wider">
                Categories
              </h3>
              <div className="space-y-2">
                {displayCategoryNames.map((catName) => {
                  const isChecked = selectedCategory.toLowerCase() === catName.toLowerCase();
                  const catSlug = catName.toLowerCase().replace(/[^a-z0-9]/g, '-');
                  return (
                    <label key={catName} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        data-testid={`collection-category-checkbox-${catSlug}`}
                        checked={isChecked}
                        onChange={() => setSelectedCategory(isChecked ? '' : catName)}
                        className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                      />
                      <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                        {catName}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div className="border-b border-outline-variant pb-stack-md">
              <h3 className="font-label-sm text-label-sm font-bold text-on-surface mb-3 uppercase tracking-wider">
                Max Price
              </h3>
              <div className="px-2 mb-4">
                <input
                  type="range"
                  data-testid="collection-price-range"
                  aria-label="Max price"
                  min="20"
                  max="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
              <div className="flex items-center justify-between text-body-md font-body-md text-on-surface-variant">
                <span>$20</span>
                <span className="font-medium text-on-surface">Up to ${maxPrice}</span>
              </div>
            </div>

            {/* Stock Availability */}
            <div className="border-b border-outline-variant pb-stack-md">
              <h3 className="font-label-sm text-label-sm font-bold text-on-surface mb-3 uppercase tracking-wider">
                Stock Status
              </h3>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  data-testid="collection-instock-checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                />
                <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                  In Stock Only
                </span>
              </label>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                data-testid="collection-clear-filters-button"
                onClick={() => {
                  setSelectedCategory('');
                  setSearchQuery('');
                  setMaxPrice(500);
                  setInStockOnly(false);
                }}
                className="w-full bg-transparent border border-outline-variant text-on-surface py-2 rounded-md font-label-sm text-label-sm hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          </aside>
        )}

        {/* Product Grid Area */}
        <div className="flex-1 w-full">
          {/* Active Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-stack-md">
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-surface-container-low border border-outline-variant rounded-full font-label-sm text-label-sm text-on-surface">
                {selectedCategory}
                <button
                  aria-label="Remove category filter"
                  onClick={() => setSelectedCategory('')}
                  className="text-on-surface-variant hover:text-error focus:outline-none cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </span>
            )}
            {maxPrice < 500 && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-surface-container-low border border-outline-variant rounded-full font-label-sm text-label-sm text-on-surface">
                Under ${maxPrice}
                <button
                  aria-label="Remove price filter"
                  onClick={() => setMaxPrice(500)}
                  className="text-on-surface-variant hover:text-error focus:outline-none cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-surface-container-low border border-outline-variant rounded-full font-label-sm text-label-sm text-on-surface">
                In Stock Only
                <button
                  aria-label="Remove stock filter"
                  onClick={() => setInStockOnly(false)}
                  className="text-on-surface-variant hover:text-error focus:outline-none cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </span>
            )}
            {(selectedCategory || maxPrice < 500 || searchQuery || inStockOnly) && (
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSearchQuery('');
                  setMaxPrice(500);
                  setInStockOnly(false);
                }}
                className="text-label-sm font-label-sm text-primary hover:underline ml-2 cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div data-testid="collection-product-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-gutter mb-stack-lg">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div data-testid="collection-no-results" className="text-center py-16 bg-surface-container-low rounded border border-outline-variant">
              <span className="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
              <h3 className="text-headline-md font-headline-md text-on-surface mb-2">No products match your criteria</h3>
              <p className="text-body-md text-on-surface-variant">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
