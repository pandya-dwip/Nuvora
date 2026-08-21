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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-sm text-gray-500">View, create, edit, or remove products in your store catalog.</p>
        </div>
        <Link
          to="/admin/products/new"
          className="bg-slate-900 text-white px-4 py-2.5 rounded text-sm font-medium hover:bg-slate-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Add New Product
        </Link>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search product title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-900"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-semibold text-gray-500 uppercase">Category:</label>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id || c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase text-xs">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length > 0 ? (
              filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover border border-gray-200 bg-gray-100"
                        src={product.image}
                      />
                      <div>
                        <span className="font-semibold text-gray-900 block line-clamp-1">
                          {product.name}
                        </span>
                        <span className="text-xs text-gray-400">ID: #{product.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-gray-600 font-medium">{product.category}</td>
                  <td className="p-3 font-bold text-gray-900">${Number(product.price).toFixed(2)}</td>
                  <td className="p-3">
                    <span
                      className={`font-semibold ${
                        product.stock === 0
                          ? 'text-red-600'
                          : product.stock < 10
                          ? 'text-amber-600'
                          : 'text-gray-900'
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleStatus(product)}
                      className={`px-2 py-0.5 rounded text-xs font-semibold uppercase cursor-pointer ${
                        product.status === 'Inactive'
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {product.status || 'Active'}
                    </button>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/products/${product.id}/edit`}
                        className="p-1.5 text-slate-600 hover:text-emerald-600 rounded hover:bg-gray-100"
                        title="Edit product"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </Link>
                      <button
                        onClick={() => setDeletingId(product.id)}
                        className="p-1.5 text-slate-600 hover:text-red-600 rounded hover:bg-gray-100 cursor-pointer"
                        title="Delete product"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Delete Product</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to permanently delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 cursor-pointer"
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
