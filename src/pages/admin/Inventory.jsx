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
    <div className="w-full space-y-stack-md">
      {/* Page Header */}
      <div>
        <h2 className="text-display-lg-mobile md:text-headline-md font-headline-md font-bold text-on-background">Inventory Control & Stock Adjustments</h2>
        <p className="text-body-md text-on-surface-variant text-sm mt-1">Real-time stock monitoring, threshold alerts, and batch adjustments.</p>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="bg-surface p-stack-md rounded border border-outline-variant shadow-xs flex flex-col sm:flex-row gap-stack-sm items-center justify-between">
        <div className="flex items-center gap-2">
          {[
            { id: 'All', label: `All Items (${products.length})` },
            { id: 'Low', label: `Low Stock (${products.filter((p) => p.stock > 0 && p.stock < 10).length})` },
            { id: 'Out', label: `Out of Stock (${products.filter((p) => p.stock === 0).length})` },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded font-label-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                filter === f.id
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search inventory title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary placeholder-outline"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-surface rounded border border-outline-variant shadow-xs overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-low border-b border-outline-variant text-on-surface-variant font-label-sm text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock Health</th>
                <th className="p-4 text-center">Live Stock Adjuster</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {filtered.length > 0 ? (
                filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3.5">
                        <img
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover border border-outline-variant bg-surface"
                          src={product.image}
                        />
                        <div>
                          <span className="font-bold text-on-background block max-w-xs truncate">
                            {product.name}
                          </span>
                          <span className="text-xs text-on-surface-variant font-mono">ID: #{product.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-on-surface font-semibold">{product.category}</td>
                    <td className="p-4 font-bold text-on-background font-display">
                      ${Number(product.price).toFixed(2)}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1.5 max-w-[160px]">
                        <div className="flex justify-between items-center text-xs">
                          <span
                            className={`font-bold ${
                              product.stock === 0
                                ? 'text-error'
                                : product.stock < 10
                                ? 'text-secondary'
                                : 'text-primary'
                            }`}
                          >
                            {product.stock === 0
                              ? 'Out of Stock'
                              : product.stock < 10
                              ? `Low Stock (${product.stock})`
                              : `In Stock (${product.stock})`}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              product.stock === 0
                                ? 'bg-error'
                                : product.stock < 10
                                ? 'bg-secondary'
                                : 'bg-primary'
                            }`}
                            style={{ width: `${Math.min(100, (product.stock / 30) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center gap-2 p-1 bg-surface-container-low border border-outline-variant rounded">
                        <button
                          onClick={() => updateStock(product.id, Math.max(0, product.stock - 1))}
                          className="w-8 h-8 bg-surface hover:bg-surface-container border border-outline-variant rounded font-bold text-on-surface flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                          title="Decrease 1"
                        >
                          -1
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={product.stock}
                          onChange={(e) => updateStock(product.id, e.target.value)}
                          className="w-16 py-1 bg-surface border border-outline-variant rounded text-center font-bold text-on-background focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <button
                          onClick={() => updateStock(product.id, product.stock + 1)}
                          className="w-8 h-8 bg-surface hover:bg-surface-container border border-outline-variant rounded font-bold text-on-surface flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                          title="Increase 1"
                        >
                          +1
                        </button>
                        <button
                          onClick={() => updateStock(product.id, product.stock + 10)}
                          className="px-2 py-1 bg-primary hover:bg-primary-container text-on-primary rounded font-label-sm text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                          title="Add 10 Batch"
                        >
                          +10
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl text-outline block mb-2">search_off</span>
                    No inventory records matching current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
