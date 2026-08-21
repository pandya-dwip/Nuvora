import { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export default function AdminSettings() {
  const { settings, setSettings } = useStore();
  const [formData, setFormData] = useState({
    storeName: settings?.storeName || 'LUXE Marketplace',
    supportEmail: settings?.supportEmail || 'support@luxe.com',
    currency: settings?.currency || '$',
    taxRate: settings?.taxRate ?? '8',
    freeShippingThreshold: settings?.freeShippingThreshold ?? '200',
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Store Settings</h1>
          <p className="text-sm text-gray-500">Configure global parameters and store defaults.</p>
        </div>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-100 border border-emerald-200 text-emerald-800 rounded text-sm font-medium flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          Store settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <div>
          <label htmlFor="storeName" className="block text-xs font-semibold uppercase text-gray-700 mb-1">
            Store Name
          </label>
          <input
            id="storeName"
            type="text"
            required
            value={formData.storeName}
            onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-900"
          />
        </div>

        <div>
          <label htmlFor="supportEmail" className="block text-xs font-semibold uppercase text-gray-700 mb-1">
            Support Email Address
          </label>
          <input
            id="supportEmail"
            type="email"
            required
            value={formData.supportEmail}
            onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="currency" className="block text-xs font-semibold uppercase text-gray-700 mb-1">
              Currency Symbol
            </label>
            <input
              id="currency"
              type="text"
              required
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label htmlFor="taxRate" className="block text-xs font-semibold uppercase text-gray-700 mb-1">
              Tax Rate (%)
            </label>
            <input
              id="taxRate"
              type="number"
              required
              value={formData.taxRate}
              onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label htmlFor="freeShippingThreshold" className="block text-xs font-semibold uppercase text-gray-700 mb-1">
              Free Shipping Above ($)
            </label>
            <input
              id="freeShippingThreshold"
              type="number"
              required
              value={formData.freeShippingThreshold}
              onChange={(e) => setFormData({ ...formData, freeShippingThreshold: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-900"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-slate-900 text-white rounded text-sm font-medium hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
