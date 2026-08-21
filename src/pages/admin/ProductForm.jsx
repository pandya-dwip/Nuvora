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
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-xs text-gray-500">
            {isEditing ? `Modifying product #${productId}` : 'Create a new catalog item.'}
          </p>
        </div>
        <Link to="/admin/products" className="text-xs text-gray-600 hover:underline font-medium">
          &larr; Back to Products
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold uppercase text-gray-700 mb-1">
            Product Title *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Minimalist Noise-Cancelling Headphones"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-xs font-semibold uppercase text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-900 cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c.id || c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-xs font-semibold uppercase text-gray-700 mb-1">
              Catalog Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-900 cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="price" className="block text-xs font-semibold uppercase text-gray-700 mb-1">
              Price ($) *
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={handleChange}
              placeholder="129.00"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label htmlFor="originalPrice" className="block text-xs font-semibold uppercase text-gray-700 mb-1">
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
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label htmlFor="stock" className="block text-xs font-semibold uppercase text-gray-700 mb-1">
              Stock Quantity *
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              required
              value={formData.stock}
              onChange={handleChange}
              placeholder="25"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-900"
            />
          </div>
        </div>

        <div>
          <label htmlFor="image" className="block text-xs font-semibold uppercase text-gray-700 mb-1">
            Image URL
          </label>
          <input
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-900"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-xs font-semibold uppercase text-gray-700 mb-1">
            Product Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product specifications, details, features..."
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-900"
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Link
            to="/admin/products"
            className="px-4 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-slate-900 text-white rounded text-sm font-medium hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isEditing ? 'Save Changes' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
