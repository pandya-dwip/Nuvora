import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function AdminProductForm() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, categories, addProduct, updateProduct } = useStore();

  const isEditing = Boolean(productId);
  const existingProduct = products.find((p) => String(p.id) === String(productId));

  const [formData, setFormData] = useState(() => {
    if (isEditing && existingProduct) {
      return {
        name: existingProduct.name || '',
        category: existingProduct.category || categories[0]?.name || 'Electronics',
        price: existingProduct.price ?? '',
        originalPrice: existingProduct.originalPrice ?? '',
        stock: existingProduct.stock ?? '10',
        rating: existingProduct.rating ?? '4.8',
        image: existingProduct.image || '',
        description: existingProduct.description || '',
        status: existingProduct.status || 'Active',
      };
    }
    return {
      name: '',
      category: categories[0]?.name || 'Electronics',
      price: '',
      originalPrice: '',
      stock: '10',
      rating: '4.8',
      image: '',
      description: '',
      status: 'Active',
    };
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateProduct(productId, formData);
    } else {
      addProduct(formData);
    }
    navigate('/admin/products');
  };

  return (
    <div className="w-full space-y-stack-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-outline-variant pb-4">
        <div>
          <h2 className="text-display-lg-mobile md:text-headline-md font-headline-md font-bold text-on-background">
            {isEditing ? `Edit Product #${productId}` : 'Create New Catalog Product'}
          </h2>
          <p className="text-body-md text-on-surface-variant text-sm mt-1">
            Configure product pricing, category taxonomy, media assets, and stock quantity.
          </p>
        </div>
        <Link
          to="/admin/products"
          className="font-label-sm text-xs font-bold text-on-surface hover:text-primary flex items-center gap-1"
        >
          &larr; Back to Products Catalog
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-start w-full">
        {/* Left 2 Columns: Form Fields */}
        <div className="lg:col-span-2 bg-surface p-stack-md rounded border border-outline-variant shadow-xs space-y-5">
          <div>
            <label htmlFor="name" className="block font-label-sm text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Product Title *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Minimalist Noise-Cancelling Headphones"
              className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block font-label-sm text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                Department Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-medium"
              >
                {categories.map((c) => (
                  <option key={c.id || c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block font-label-sm text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                Catalog Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-medium"
              >
                <option value="Active">Active (Visible)</option>
                <option value="Inactive">Inactive (Hidden)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="price" className="block font-label-sm text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                Retail Price ($) *
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="129.00"
                className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="originalPrice" className="block font-label-sm text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                Original Price ($)
              </label>
              <input
                id="originalPrice"
                name="originalPrice"
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="159.00"
                className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="stock" className="block font-label-sm text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                Stock Quantity *
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                placeholder="25"
                className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary font-bold"
              />
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block font-label-sm text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Primary Image URL
            </label>
            <input
              id="image"
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary font-mono text-xs"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-label-sm text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Product Copywriting & Specifications
            </label>
            <textarea
              id="description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description, material composition, or key features..."
              className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
            <Link
              to="/admin/products"
              className="px-5 py-2.5 border border-outline-variant text-on-surface rounded font-label-sm text-xs font-bold uppercase tracking-wider hover:bg-surface-container-low"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded font-label-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
            >
              {isEditing ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </div>

        {/* Right Column: Live Media Preview */}
        <div className="bg-surface p-stack-md rounded border border-outline-variant shadow-xs space-y-4">
          <h3 className="text-headline-md font-headline-md font-bold text-on-background border-b border-outline-variant pb-3">
            Product Media Preview
          </h3>
          <div className="aspect-square w-full rounded bg-surface-container-lowest border border-outline-variant overflow-hidden flex items-center justify-center relative">
            {formData.image ? (
              <img
                alt="Live product preview"
                className="w-full h-full object-cover"
                src={formData.image}
              />
            ) : (
              <div className="text-center text-on-surface-variant p-4">
                <span className="material-symbols-outlined text-4xl block mb-1">image</span>
                <span className="text-xs">No image URL provided yet</span>
              </div>
            )}
          </div>

          <div className="bg-surface-container-low p-4 rounded border border-outline-variant space-y-2 text-xs">
            <p className="font-bold text-on-background text-sm truncate">
              {formData.name || 'Untitled Product'}
            </p>
            <p className="text-on-surface-variant font-semibold">{formData.category}</p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-lg font-bold text-on-background font-display">
                ${formData.price ? Number(formData.price).toFixed(2) : '0.00'}
              </span>
              {formData.originalPrice && (
                <span className="text-on-surface-variant line-through">
                  ${Number(formData.originalPrice).toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
