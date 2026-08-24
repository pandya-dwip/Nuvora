import { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export default function AdminSettings() {
  const { settings, setSettings } = useStore();
  const [formData, setFormData] = useState({
    storeName: settings?.storeName || 'Nuvora Marketplace',
    supportEmail: settings?.supportEmail || 'support@nuvora.com',
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
    <div data-testid="admin-settings-container" className="w-full space-y-stack-md">
      {/* Header */}
      <div>
        <h2 className="text-display-lg-mobile md:text-headline-md font-headline-md font-bold text-on-background">Store Global Configuration</h2>
        <p className="text-body-md text-on-surface-variant text-sm mt-1">Configure store identity, support channels, tax parameters, and shipping policies.</p>
      </div>

      {saved && (
        <div data-testid="admin-settings-saved-message" className="p-4 bg-primary/10 border border-primary text-primary rounded text-sm font-medium flex items-center gap-2">
          <span className="material-symbols-outlined text-base">check_circle</span>
          Global store configuration saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} data-testid="admin-settings-form" className="space-y-stack-md w-full">
        {/* Card 1: Store Identity */}
        <div className="bg-surface p-stack-md rounded border border-outline-variant shadow-xs space-y-5">
          <h3 className="text-headline-md font-headline-md font-bold text-on-background border-b border-outline-variant pb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">store</span>
            Store Identity & Support
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter">
            <div>
              <label htmlFor="storeName" className="block font-label-sm text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                Brand / Store Name
              </label>
              <input
                id="storeName"
                type="text"
                data-testid="admin-settings-store-name-input"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary font-semibold"
              />
            </div>

            <div>
              <label htmlFor="supportEmail" className="block font-label-sm text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                Customer Support Email
              </label>
              <input
                id="supportEmail"
                type="email"
                data-testid="admin-settings-support-email-input"
                value={formData.supportEmail}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Financial & Shipping Rules */}
        <div className="bg-surface p-stack-md rounded border border-outline-variant shadow-xs space-y-5">
          <h3 className="text-headline-md font-headline-md font-bold text-on-background border-b border-outline-variant pb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">payments</span>
            Financial & Shipping Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
            <div>
              <label htmlFor="currency" className="block font-label-sm text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                Display Currency Symbol
              </label>
              <input
                id="currency"
                type="text"
                data-testid="admin-settings-currency-input"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary font-bold"
              />
            </div>

            <div>
              <label htmlFor="taxRate" className="block font-label-sm text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                Sales Tax Rate (%)
              </label>
              <input
                id="taxRate"
                type="number"
                data-testid="admin-settings-tax-rate-input"
                value={formData.taxRate}
                onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary font-bold"
              />
            </div>

            <div>
              <label htmlFor="freeShippingThreshold" className="block font-label-sm text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                Free Shipping Minimum ($)
              </label>
              <input
                id="freeShippingThreshold"
                type="number"
                data-testid="admin-settings-free-shipping-input"
                value={formData.freeShippingThreshold}
                onChange={(e) => setFormData({ ...formData, freeShippingThreshold: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary font-bold"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            data-testid="admin-settings-save-button"
            className="px-8 py-3 bg-primary hover:bg-primary-container text-on-primary rounded font-label-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
