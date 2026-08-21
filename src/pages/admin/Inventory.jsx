import { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export default function AdminInventory() {
  const { products, updateStock } = useStore();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === 'Low') return matchesSearch && p.stock > 0 && p.stock < 10;
    if (filter === 'Out') return matchesSearch && p.stock === 0;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Control</h1>
          <p className="text-sm text-gray-500">Monitor stock levels and perform quick inventory adjustments.</p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2">
          {['All', 'Low', 'Out'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded text-xs font-semibold uppercase cursor-pointer ${
                filter === f ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'Low' ? 'Low Stock (< 10)' : f === 'Out' ? 'Out of Stock' : 'All Items'}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-900"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase text-xs">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock Status</th>
              <th className="p-3">Adjust Stock</th>
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
                      <span className="font-semibold text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-600 font-medium">{product.category}</td>
                  <td className="p-3 font-bold text-gray-900">${Number(product.price).toFixed(2)}</td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${
                        product.stock === 0
                          ? 'bg-red-100 text-red-800'
                          : product.stock < 10
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {product.stock === 0
                        ? 'Out of Stock'
                        : product.stock < 10
                        ? `Low Stock (${product.stock})`
                        : `In Stock (${product.stock})`}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateStock(product.id, Math.max(0, product.stock - 1))}
                        className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center font-bold text-gray-700 cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={product.stock}
                        onChange={(e) => updateStock(product.id, e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-200 rounded text-center text-sm font-semibold focus:outline-none focus:border-slate-900"
                      />
                      <button
                        onClick={() => updateStock(product.id, product.stock + 1)}
                        className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center font-bold text-gray-700 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No inventory items match filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
