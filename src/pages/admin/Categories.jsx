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
    <div className="w-full space-y-stack-md">
      {/* Header */}
      <div>
        <h2 className="text-display-lg-mobile md:text-headline-md font-headline-md font-bold text-on-background">
          Category & Department Taxonomy
        </h2>
        <p className="text-body-md text-on-surface-variant text-sm mt-1">
          Organize store items into department collections matching the storefront design system.
        </p>
      </div>

      {message && (
        <div className="p-4 bg-primary/10 border border-primary text-primary rounded text-sm font-medium flex items-center gap-2">
          <span className="material-symbols-outlined text-base">check_circle</span>
          {message}
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-error-container border border-error/20 text-on-error-container rounded text-sm font-medium flex items-center gap-2">
          <span className="material-symbols-outlined text-base">error</span>
          {errorMsg}
        </div>
      )}

      {/* Add New Category Form Card */}
      <form
        onSubmit={handleAddCategory}
        className="bg-surface p-stack-md rounded border border-outline-variant shadow-xs flex flex-col sm:flex-row gap-stack-sm items-end"
      >
        <div className="flex-1 w-full">
          <label htmlFor="categoryName" className="block font-label-sm text-xs font-semibold uppercase tracking-wider text-on-surface mb-1.5">
            New Category Department Name
          </label>
          <input
            id="categoryName"
            type="text"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="e.g. Footwear, Outdoor Essentials..."
            className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2.5 rounded font-label-sm text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
        >
          + Create Category
        </button>
      </form>

      {/* Categories Table Card */}
      <div className="bg-surface rounded border border-outline-variant shadow-xs overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-low border-b border-outline-variant text-on-surface-variant font-label-sm text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4">Department Name</th>
                <th className="p-4">URL Slug</th>
                <th className="p-4">Assigned Items</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {categories.map((cat) => {
                const count = products.filter(
                  (p) => p.category.toLowerCase() === cat.name.toLowerCase()
                ).length;

                return (
                  <tr key={cat.id || cat.name} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="p-4 font-bold text-on-background">
                      {editingId === cat.id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="px-3 py-1 border border-outline-variant rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary"></span>
                          {cat.name}
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-on-surface-variant font-mono text-xs">
                      /{cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-surface-container rounded text-xs font-bold text-on-surface">
                        {count} item{count === 1 ? '' : 's'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {editingId === cat.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleSaveEdit(cat.id)}
                            className="px-3 py-1 bg-primary text-on-primary rounded text-xs font-bold cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 bg-surface-container-high text-on-surface rounded text-xs font-bold cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleStartEdit(cat)}
                            className="p-1.5 text-on-surface-variant hover:text-primary rounded hover:bg-surface-container-low cursor-pointer"
                            title="Edit Category Name"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(cat.id)}
                            className="p-1.5 text-on-surface-variant hover:text-error rounded hover:bg-surface-container-low cursor-pointer"
                            title="Delete Category"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
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
    </div>
  );
}
