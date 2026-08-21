import { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export default function AdminCategories() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useStore();
  const [newCatName, setNewCatName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    setMessage('');
    setErrorMsg('');

    if (!newCatName.trim()) return;

    addCategory({ name: newCatName.trim() });
    setMessage(`Category "${newCatName.trim()}" created successfully!`);
    setNewCatName('');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleStartEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const handleSaveEdit = (id) => {
    if (editName.trim()) {
      updateCategory(id, { name: editName.trim() });
      setEditingId(null);
      setMessage('Category updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDelete = (id) => {
    setMessage('');
    setErrorMsg('');
    const res = deleteCategory(id);
    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      setMessage('Category deleted successfully.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
          <p className="text-sm text-gray-500">Add, edit, or remove product categories.</p>
        </div>
      </div>

      {message && (
        <div className="p-3 bg-emerald-100 border border-emerald-200 text-emerald-800 rounded text-sm font-medium">
          {message}
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-red-100 border border-red-200 text-red-800 rounded text-sm font-medium">
          {errorMsg}
        </div>
      )}

      {/* Add New Category Form */}
      <form
        onSubmit={handleAddCategory}
        className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-3 items-end"
      >
        <div className="flex-1">
          <label htmlFor="categoryName" className="block text-xs font-semibold uppercase text-gray-700 mb-1">
            New Category Name *
          </label>
          <input
            id="categoryName"
            type="text"
            required
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="e.g. Footwear, Smart Home..."
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-900"
          />
        </div>
        <button
          type="submit"
          className="bg-slate-900 text-white px-5 py-2 rounded text-sm font-medium hover:bg-slate-800 transition-colors cursor-pointer"
        >
          + Add Category
        </button>
      </form>

      {/* Categories Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase text-xs">
            <tr>
              <th className="p-3">Category Name</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Assigned Products</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((cat) => {
              const count = products.filter(
                (p) => p.category.toLowerCase() === cat.name.toLowerCase()
              ).length;

              return (
                <tr key={cat.id || cat.name} className="hover:bg-gray-50">
                  <td className="p-3 font-semibold text-gray-900">
                    {editingId === cat.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none"
                      />
                    ) : (
                      cat.name
                    )}
                  </td>
                  <td className="p-3 text-gray-500 font-mono text-xs">
                    {cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}
                  </td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 bg-gray-100 rounded text-xs font-bold text-gray-700">
                      {count} product{count === 1 ? '' : 's'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {editingId === cat.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleSaveEdit(cat.id)}
                          className="text-xs font-semibold text-emerald-600 hover:underline cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-xs font-semibold text-gray-500 hover:underline cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleStartEdit(cat)}
                          className="text-xs font-semibold text-slate-600 hover:underline cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
