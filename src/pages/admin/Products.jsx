import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function AdminProducts() {
  const { products, categories, deleteProduct, updateProduct } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCat ? p.category === selectedCat : true;
    return matchesSearch && matchesCat;
  });

  const handleDeleteConfirm = () => {
    if (deletingId) {
      deleteProduct(deletingId);
      setDeletingId(null);
    }
  };

  const toggleStatus = (product) => {
    const newStatus = product.status === 'Inactive' ? 'Active' : 'Inactive';
    updateProduct(product.id, { status: newStatus });
  };

  return (
    <div data-testid="admin-products-container" className="w-full space-y-stack-md">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-display-lg-mobile md:text-headline-md font-headline-md font-bold text-on-background">Product Catalog Management</h2>
          <p className="text-body-md text-on-surface-variant text-sm mt-1">Manage store catalog items, prices, category tags, and stock availability.</p>
        </div>
        <Link
          to="/admin/products/new"
          data-testid="admin-products-add-button"
          className="bg-primary hover:bg-primary-container text-on-primary px-5 py-2.5 rounded font-label-sm text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Add New Product
        </Link>
      </div>

      {/* Control Bar: Search & Category Filter */}
      <div className="bg-surface p-stack-md rounded border border-outline-variant shadow-xs flex flex-col sm:flex-row gap-stack-sm items-center justify-between">
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
            search
          </span>
          <input
            type="text"
            data-testid="admin-products-search-input"
            placeholder="Search by title or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-outline"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="font-label-sm text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Category:</label>
          <select
            value={selectedCat}
            data-testid="admin-products-category-select"
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant rounded px-4 py-2.5 text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-medium"
          >
            <option value="">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id || c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Table Card */}
      <div className="bg-surface rounded border border-outline-variant shadow-xs overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table data-testid="admin-products-table" className="w-full text-left text-sm">
            <thead className="bg-surface-container-low border-b border-outline-variant text-on-surface-variant font-label-sm text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4">Product Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock Level</th>
                <th className="p-4">Catalog Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {filtered.length > 0 ? (
                filtered.map((product) => (
                  <tr key={product.id} data-testid={`admin-product-row-${product.id}`} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3.5">
                        <img
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover border border-outline-variant bg-surface"
                          src={product.image}
                        />
                        <div>
                          <span data-testid={`admin-product-title-${product.id}`} className="font-bold text-on-background block max-w-xs truncate">
                            {product.name}
                          </span>
                          <span className="text-xs text-on-surface-variant font-mono">ID: #{product.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-on-surface font-semibold">{product.category}</td>
                    <td data-testid={`admin-product-price-${product.id}`} className="p-4 font-bold text-on-background font-display">
                      ${Number(product.price).toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span
                        data-testid={`admin-product-stock-${product.id}`}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold ${
                          product.stock === 0
                            ? 'bg-error-container text-on-error-container'
                            : product.stock < 10
                            ? 'bg-secondary-container text-on-secondary-container'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {product.stock === 0 ? 'Out of Stock' : `${product.stock} in stock`}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(product)}
                        data-testid={`admin-product-status-toggle-${product.id}`}
                        className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                          product.status === 'Inactive'
                            ? 'bg-surface-container-high text-on-surface-variant'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        {product.status || 'Active'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          data-testid={`admin-product-edit-button-${product.id}`}
                          className="p-2 text-on-surface-variant hover:text-primary rounded hover:bg-surface-container-low transition-colors"
                          title="Edit Product"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </Link>
                        <button
                          onClick={() => setDeletingId(product.id)}
                          data-testid={`admin-product-delete-button-${product.id}`}
                          className="p-2 text-on-surface-variant hover:text-error rounded hover:bg-surface-container-low transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" data-testid="admin-products-no-results" className="text-center py-12 text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl text-outline block mb-2">search_off</span>
                    No products matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div data-testid="admin-delete-product-modal" className="fixed inset-0 bg-inverse-surface/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded p-6 max-w-md w-full shadow-lg border border-outline-variant">
            <div className="w-12 h-12 bg-error-container text-error rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">warning</span>
            </div>
            <h3 className="text-headline-md font-headline-md font-bold text-on-background mb-2">Delete Product Confirmation</h3>
            <p className="text-body-md text-on-surface-variant text-sm mb-6">
              Are you sure you want to permanently remove this product from the store catalog? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeletingId(null)}
                data-testid="admin-delete-product-cancel"
                className="px-5 py-2.5 bg-surface-container-high text-on-surface rounded font-label-sm text-xs font-bold uppercase tracking-wider hover:bg-surface-container cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                data-testid="admin-delete-product-confirm"
                className="px-5 py-2.5 bg-error text-on-error rounded font-label-sm text-xs font-bold uppercase tracking-wider hover:bg-error/90 cursor-pointer shadow-xs"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
