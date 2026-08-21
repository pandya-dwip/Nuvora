import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function Profile() {
  const { currentUser, updateProfile, orders, wishlist } = useStore();

  const [activeTab, setActiveTab] = useState('info');
  const [profileData, setProfileData] = useState(() => ({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
  }));
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState('');

  // Address State
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: 'Home Address',
      fullName: currentUser?.name || 'Customer Name',
      street: '123 Luxury Lane',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      isDefault: true,
    },
    {
      id: 2,
      title: 'Office Address',
      fullName: currentUser?.name || 'Customer Name',
      street: '456 Commerce Avenue, Suite 400',
      city: 'New York',
      state: 'NY',
      zip: '10018',
      isDefault: false,
    },
  ]);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: 'Work Address',
    fullName: currentUser?.name || '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  if (!currentUser) {
    return (
      <div data-testid="profile-signin-required" className="px-margin-mobile py-16 text-center max-w-md mx-auto">
        <span className="material-symbols-outlined text-5xl text-outline mb-2">lock</span>
        <h2 className="text-headline-md font-headline-md text-on-surface mb-2">Sign In Required</h2>
        <p className="text-body-md text-on-surface-variant mb-6">
          Please sign in to your account to view and manage your profile details.
        </p>
        <Link
          to="/login"
          data-testid="profile-signin-button"
          className="bg-primary text-on-primary px-6 py-3 rounded font-label-sm text-label-sm inline-block"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const myOrdersCount = orders.filter(
    (o) => o.userId === currentUser.id || o.customerEmail === currentUser.email
  ).length;

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
    });
    setSavedSuccess('Personal details updated successfully!');
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwords.newPass) {
      setSavedSuccess('Please enter a new password.');
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      setSavedSuccess('New passwords do not match.');
      return;
    }
    setSavedSuccess('Password updated successfully!');
    setPasswords({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddress.street || !newAddress.city) return;

    setAddresses((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newAddress.title || 'Other Address',
        fullName: newAddress.fullName || currentUser.name,
        street: newAddress.street,
        city: newAddress.city,
        state: newAddress.state,
        zip: newAddress.zip,
        isDefault: false,
      },
    ]);
    setShowAddAddressModal(false);
    setNewAddress({
      title: 'Work Address',
      fullName: currentUser.name,
      street: '',
      city: '',
      state: '',
      zip: '',
    });
    setSavedSuccess('New address added successfully!');
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  // Get user initial for avatar badge
  const userInitial = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U';

  return (
    <div data-testid="profile-container" className="w-full px-margin-mobile md:px-margin-desktop py-stack-lg">
      {/* Enhanced Profile Header Banner */}
      <div className="bg-surface border border-outline-variant rounded-xl p-6 md:p-8 mb-stack-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div data-testid="profile-header-avatar" className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#1B3B32] text-white flex items-center justify-center text-2xl md:text-3xl font-bold font-display shadow-md">
              {userInitial}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 data-testid="profile-header-name" className="text-2xl md:text-3xl font-bold text-on-background font-headline">
                  {currentUser.name}
                </h1>
                <span data-testid="profile-header-role" className="bg-[#1B3B32]/10 text-[#1B3B32] text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {currentUser.role}
                </span>
              </div>
              <p data-testid="profile-header-email" className="text-body-md text-on-surface-variant text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">mail</span>
                {currentUser.email}
              </p>
            </div>
          </div>

          {/* Quick Stats Pills */}
          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-outline-variant pt-4 md:pt-0 md:pl-6">
            <Link
              to="/orders"
              data-testid="profile-my-orders-pill"
              className="flex flex-col items-center bg-surface-container-low hover:bg-surface-container transition-colors p-3 px-5 rounded-lg border border-outline-variant text-center cursor-pointer"
            >
              <span className="text-2xl font-bold text-primary font-display">{myOrdersCount}</span>
              <span className="text-xs font-label-sm text-on-surface-variant uppercase tracking-wider">
                My Orders
              </span>
            </Link>
            <Link
              to="/wishlist"
              data-testid="profile-wishlist-pill"
              className="flex flex-col items-center bg-surface-container-low hover:bg-surface-container transition-colors p-3 px-5 rounded-lg border border-outline-variant text-center cursor-pointer"
            >
              <span className="text-2xl font-bold text-primary font-display">{wishlist.length}</span>
              <span className="text-xs font-label-sm text-on-surface-variant uppercase tracking-wider">
                Saved Wishlist
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-gutter items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 bg-surface border border-outline-variant rounded-xl p-stack-sm flex flex-col gap-1 shadow-sm">
          <button
            onClick={() => setActiveTab('info')}
            data-testid="profile-tab-info"
            className={`w-full text-left px-4 py-3.5 rounded-lg text-label-sm font-medium flex items-center justify-between transition-all cursor-pointer ${activeTab === 'info'
              ? 'bg-[#1B3B32] text-white font-bold shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-background'
              }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px]">person</span>
              Personal Details
            </div>
            {activeTab === 'info' && <span className="material-symbols-outlined text-sm">chevron_right</span>}
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            data-testid="profile-tab-addresses"
            className={`w-full text-left px-4 py-3.5 rounded-lg text-label-sm font-medium flex items-center justify-between transition-all cursor-pointer ${activeTab === 'addresses'
              ? 'bg-[#1B3B32] text-white font-bold shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-background'
              }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px]">location_on</span>
              Saved Addresses
            </div>
            {activeTab === 'addresses' && <span className="material-symbols-outlined text-sm">chevron_right</span>}
          </button>

          <button
            onClick={() => setActiveTab('security')}
            data-testid="profile-tab-security"
            className={`w-full text-left px-4 py-3.5 rounded-lg text-label-sm font-medium flex items-center justify-between transition-all cursor-pointer ${activeTab === 'security'
              ? 'bg-[#1B3B32] text-white font-bold shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-background'
              }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px]">lock</span>
              Password & Security
            </div>
            {activeTab === 'security' && <span className="material-symbols-outlined text-sm">chevron_right</span>}
          </button>

          <div className="mt-6 pt-4 border-t border-outline-variant px-3 text-xs text-on-surface-variant flex flex-col gap-1">
            <p className="font-semibold text-on-surface">Member Status</p>
            <p className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-xs">verified</span> LUXE Insider
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 bg-surface border border-outline-variant rounded-xl p-6 md:p-8 shadow-sm">
          {savedSuccess && (
            <div data-testid="profile-saved-success" className="mb-6 p-4 bg-[#1B3B32]/10 border border-[#1B3B32]/30 text-[#1B3B32] rounded-lg text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-base">check_circle</span>
              {savedSuccess}
            </div>
          )}

          {/* TAB 1: Personal Details */}
          {activeTab === 'info' && (
            <form onSubmit={handleProfileSubmit} className="flex flex-col gap-6">
              <div className="border-b border-outline-variant pb-4">
                <h2 className="text-xl font-bold text-on-background font-headline">
                  Personal Information
                </h2>
                <p className="text-body-md text-on-surface-variant text-sm mt-1">
                  Manage your personal details, email, and primary contact number.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label htmlFor="name" className="font-label-sm text-xs font-semibold uppercase tracking-wider text-on-surface">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                      person
                    </span>
                    <input
                      id="name"
                      type="text"
                      data-testid="profile-name-input"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-[#1B3B32]/20 focus:border-[#1B3B32] transition-colors"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-label-sm text-xs font-semibold uppercase tracking-wider text-on-surface">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                      mail
                    </span>
                    <input
                      id="email"
                      type="email"
                      data-testid="profile-email-input"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-[#1B3B32]/20 focus:border-[#1B3B32] transition-colors"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="font-label-sm text-xs font-semibold uppercase tracking-wider text-on-surface">
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                      call
                    </span>
                    <input
                      id="phone"
                      type="text"
                      data-testid="profile-phone-input"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-[#1B3B32]/20 focus:border-[#1B3B32] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant flex justify-start">
                <button
                  type="submit"
                  data-testid="profile-save-button"
                  className="px-8 py-3 bg-[#1B3B32] text-white rounded-lg font-semibold text-sm hover:bg-[#122A23] transition-all cursor-pointer shadow-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">save</span>
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-outline-variant pb-4">
                <div>
                  <h2 className="text-xl font-bold text-on-background font-headline">
                    Saved Shipping Addresses
                  </h2>
                  <p className="text-body-md text-on-surface-variant text-sm mt-1">
                    Manage your saved delivery destinations for quick checkout.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddAddressModal(true)}
                  data-testid="profile-add-address-button"
                  className="bg-[#1B3B32] text-white px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-wider hover:bg-[#122A23] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Address
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    data-testid={`profile-address-card-${addr.id}`}
                    className={`rounded-xl p-5 border transition-all flex flex-col justify-between relative ${addr.isDefault
                      ? 'border-[#1B3B32] bg-[#1B3B32]/5 shadow-sm'
                      : 'border-outline-variant bg-surface-container-lowest'
                      }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-on-background text-sm flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#1B3B32]">home</span>
                          {addr.title}
                        </span>
                        {addr.isDefault && (
                          <span className="bg-[#1B3B32] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-on-background">{addr.fullName}</p>
                      <p className="text-sm text-on-surface-variant mt-1">{addr.street}</p>
                      <p className="text-sm text-on-surface-variant">
                        {addr.city}, {addr.state} {addr.zip}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-4 pt-3 border-t border-outline-variant/60 text-xs font-semibold">
                      {!addr.isDefault && (
                        <button
                          onClick={() => handleSetDefaultAddress(addr.id)}
                          data-testid={`profile-address-default-button-${addr.id}`}
                          className="text-[#1B3B32] hover:underline cursor-pointer"
                        >
                          Set as Default
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        data-testid={`profile-address-remove-button-${addr.id}`}
                        className="text-error hover:underline ml-auto cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Address Modal Form */}
              {showAddAddressModal && (
                <div data-testid="profile-add-address-modal" className="p-5 bg-surface-container-low border border-outline-variant rounded-xl mt-4">
                  <h3 className="font-bold text-on-background mb-4 text-base">Add New Address</h3>
                  <form onSubmit={handleAddAddressSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold uppercase text-on-surface">Address Label</label>
                      <input
                        type="text"
                        data-testid="profile-address-label-input"
                        value={newAddress.title}
                        onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                        placeholder="e.g. Vacation Home"
                        className="px-3 py-2 bg-surface border border-outline-variant rounded text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold uppercase text-on-surface">Recipient Name</label>
                      <input
                        type="text"
                        data-testid="profile-address-recipient-input"
                        value={newAddress.fullName}
                        onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                        placeholder="Jane Doe"
                        className="px-3 py-2 bg-surface border border-outline-variant rounded text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1 sm:col-span-2">
                      <label className="text-xs font-semibold uppercase text-on-surface">Street Address</label>
                      <input
                        type="text"
                        data-testid="profile-address-street-input"
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                        placeholder="789 Park Avenue"
                        className="px-3 py-2 bg-surface border border-outline-variant rounded text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold uppercase text-on-surface">City</label>
                      <input
                        type="text"
                        data-testid="profile-address-city-input"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        placeholder="New York"
                        className="px-3 py-2 bg-surface border border-outline-variant rounded text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold uppercase text-on-surface">State</label>
                        <input
                          type="text"
                          data-testid="profile-address-state-input"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          placeholder="NY"
                          className="px-3 py-2 bg-surface border border-outline-variant rounded text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold uppercase text-on-surface">Zip</label>
                        <input
                          type="text"
                          data-testid="profile-address-zip-input"
                          value={newAddress.zip}
                          onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                          placeholder="10021"
                          className="px-3 py-2 bg-surface border border-outline-variant rounded text-sm"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddAddressModal(false)}
                        className="px-4 py-2 border border-outline-variant text-on-surface rounded text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        data-testid="profile-save-address-submit"
                        className="px-5 py-2 bg-[#1B3B32] text-white rounded text-xs font-semibold cursor-pointer"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Password & Security */}
          {activeTab === 'security' && (
            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-6 max-w-xl">
              <div className="border-b border-outline-variant pb-4">
                <h2 className="text-xl font-bold text-on-background font-headline">
                  Password & Security Settings
                </h2>
                <p className="text-body-md text-on-surface-variant text-sm mt-1">
                  Update your password and maintain security across your account.
                </p>
              </div>

              {/* Current Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="currentPass" className="font-label-sm text-xs font-semibold uppercase tracking-wider text-on-surface">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    id="currentPass"
                    type={showCurrentPass ? 'text' : 'password'}
                    data-testid="profile-current-password-input"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-4 pr-10 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-[#1B3B32]/20 focus:border-[#1B3B32]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showCurrentPass ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="newPass" className="font-label-sm text-xs font-semibold uppercase tracking-wider text-on-surface">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="newPass"
                    type={showNewPass ? 'text' : 'password'}
                    data-testid="profile-new-password-input"
                    value={passwords.newPass}
                    onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-4 pr-10 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-[#1B3B32]/20 focus:border-[#1B3B32]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showNewPass ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirmPass" className="font-label-sm text-xs font-semibold uppercase tracking-wider text-on-surface">
                  Confirm New Password
                </label>
                <input
                  id="confirmPass"
                  type={showNewPass ? 'text' : 'password'}
                  data-testid="profile-confirm-password-input"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-[#1B3B32]/20 focus:border-[#1B3B32]"
                />
              </div>

              <div className="pt-4 border-t border-outline-variant flex justify-start">
                <button
                  type="submit"
                  data-testid="profile-update-password-button"
                  className="px-8 py-3 bg-[#1B3B32] text-white rounded-lg font-semibold text-sm hover:bg-[#122A23] transition-all cursor-pointer shadow-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">lock_reset</span>
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
