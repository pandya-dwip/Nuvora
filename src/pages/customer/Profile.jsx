import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function Profile() {
  const { currentUser, updateProfile } = useStore();

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
  const [savedSuccess, setSavedSuccess] = useState('');

  if (!currentUser) {
    return (
      <div className="px-margin-mobile py-16 text-center max-w-md mx-auto">
        <span className="material-symbols-outlined text-5xl text-outline mb-2">lock</span>
        <h2 className="text-headline-md font-headline-md text-on-surface mb-2">Sign In Required</h2>
        <p className="text-body-md text-on-surface-variant mb-6">
          Please sign in to your account to view and manage your profile details.
        </p>
        <Link
          to="/login"
          className="bg-primary text-on-primary px-6 py-3 rounded font-label-sm text-label-sm inline-block"
        >
          Sign In
        </Link>
      </div>
    );
  }

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
    if (passwords.newPass !== passwords.confirm) {
      setSavedSuccess('New passwords do not match.');
      return;
    }
    setSavedSuccess('Password updated successfully!');
    setPasswords({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-stack-lg">
      <div className="mb-stack-md flex items-center justify-between">
        <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg-mobile md:font-display-lg text-on-background">
          User Account Profile
        </h1>
        <span className="bg-primary/10 text-primary px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider">
          Role: {currentUser.role}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter items-start">
        {/* Navigation Sidebar */}
        <div className="bg-surface border border-outline-variant rounded p-stack-sm flex flex-col gap-1">
          <button
            onClick={() => setActiveTab('info')}
            className={`w-full text-left px-4 py-3 rounded text-label-sm font-label-sm flex items-center gap-3 transition-colors cursor-pointer ${
              activeTab === 'info'
                ? 'bg-primary text-on-primary font-bold'
                : 'text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
            Personal Details
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full text-left px-4 py-3 rounded text-label-sm font-label-sm flex items-center gap-3 transition-colors cursor-pointer ${
              activeTab === 'addresses'
                ? 'bg-primary text-on-primary font-bold'
                : 'text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">location_on</span>
            Saved Addresses
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-4 py-3 rounded text-label-sm font-label-sm flex items-center gap-3 transition-colors cursor-pointer ${
              activeTab === 'security'
                ? 'bg-primary text-on-primary font-bold'
                : 'text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">lock</span>
            Password & Security
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 bg-surface border border-outline-variant rounded p-stack-md">
          {savedSuccess && (
            <div className="mb-4 p-3 bg-primary/10 border border-primary text-primary rounded text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              {savedSuccess}
            </div>
          )}

          {activeTab === 'info' && (
            <form onSubmit={handleProfileSubmit} className="flex flex-col gap-stack-md max-w-lg">
              <h2 className="text-headline-md font-headline-md text-on-background border-b border-outline-variant pb-3">
                Personal Details
              </h2>

              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="font-label-sm text-label-sm text-on-surface">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-body-md"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-label-sm text-label-sm text-on-surface">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-body-md"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="font-label-sm text-label-sm text-on-surface">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-body-md"
                />
              </div>

              <button
                type="submit"
                className="w-fit px-6 py-2.5 bg-primary text-on-primary rounded font-label-sm text-label-sm hover:bg-primary-container transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          )}

          {activeTab === 'addresses' && (
            <div className="flex flex-col gap-stack-md">
              <div className="flex justify-between items-center border-b border-outline-variant pb-3">
                <h2 className="text-headline-md font-headline-md text-on-background">
                  Saved Addresses
                </h2>
                <button className="bg-primary text-on-primary px-3 py-1.5 rounded font-label-sm text-xs cursor-pointer">
                  + Add Address
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-primary bg-primary/5 rounded p-4 flex flex-col gap-2 relative">
                  <span className="absolute top-3 right-3 bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    Default
                  </span>
                  <p className="font-bold text-on-background">Home Address</p>
                  <p className="text-sm text-on-surface-variant">{profileData.name || currentUser.name}</p>
                  <p className="text-sm text-on-surface-variant">123 Luxury Lane</p>
                  <p className="text-sm text-on-surface-variant">New York, NY 10001</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-stack-md max-w-lg">
              <h2 className="text-headline-md font-headline-md text-on-background border-b border-outline-variant pb-3">
                Password & Security
              </h2>

              <div className="flex flex-col gap-1">
                <label htmlFor="currentPass" className="font-label-sm text-label-sm text-on-surface">
                  Current Password
                </label>
                <input
                  id="currentPass"
                  type="password"
                  required
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-body-md"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="newPass" className="font-label-sm text-label-sm text-on-surface">
                  New Password
                </label>
                <input
                  id="newPass"
                  type="password"
                  required
                  value={passwords.newPass}
                  onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-body-md"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="confirmPass" className="font-label-sm text-label-sm text-on-surface">
                  Confirm New Password
                </label>
                <input
                  id="confirmPass"
                  type="password"
                  required
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-body-md"
                />
              </div>

              <button
                type="submit"
                className="w-fit px-6 py-2.5 bg-primary text-on-primary rounded font-label-sm text-label-sm hover:bg-primary-container transition-colors cursor-pointer"
              >
                Update Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
