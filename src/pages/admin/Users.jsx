import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function AdminUsers() {
  const { users, currentUser, toggleUserStatus, deleteUser } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    setErrorMessage('');
    const res = deleteUser(id);
    if (!res.success) {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className="w-full space-y-stack-md">
      {/* Header */}
      <div>
        <h2 className="text-display-lg-mobile md:text-headline-md font-headline-md font-bold text-on-background">User Account Directory</h2>
        <p className="text-body-md text-on-surface-variant text-sm mt-1">Manage customer credentials, admin access privileges, and account status.</p>
      </div>

      {errorMessage && (
        <div className="p-4 bg-error-container border border-error/20 text-on-error-container rounded text-sm font-medium flex items-center gap-2">
          <span className="material-symbols-outlined text-base">error</span>
          {errorMessage}
        </div>
      )}

      {/* Control Bar */}
      <div className="bg-surface p-stack-md rounded border border-outline-variant shadow-xs flex flex-col sm:flex-row gap-stack-sm items-center justify-between">
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search name or email address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary placeholder-outline"
          />
        </div>
        <div className="text-xs text-on-surface-variant font-medium">
          Total Registered Accounts: <strong className="text-on-background font-bold">{users.length}</strong>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="bg-surface rounded border border-outline-variant shadow-xs overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-low border-b border-outline-variant text-on-surface-variant font-label-sm text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4">User Account</th>
                <th className="p-4">System Role</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {filtered.map((user) => {
                const isSelf = currentUser && currentUser.id === user.id;
                const userInitial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

                return (
                  <tr key={user.id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-sm font-display shadow-xs">
                          {userInitial}
                        </div>
                        <div>
                          <p className="font-bold text-on-background flex items-center gap-2">
                            {user.name}
                            {isSelf && (
                              <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase border border-primary/20">
                                You
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-on-surface-variant">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                          user.role === 'admin'
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'bg-surface-container-high text-on-surface'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        disabled={isSelf}
                        className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
                          user.disabled
                            ? 'bg-error-container text-on-error-container hover:bg-error-container/80'
                            : 'bg-primary/10 text-primary hover:bg-primary/20'
                        } ${isSelf ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        {user.disabled ? 'Disabled' : 'Active'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/users/${user.id}`}
                          className="px-3 py-1.5 bg-surface-container-low hover:bg-surface-container text-on-surface rounded text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                        >
                          Details
                        </Link>
                        {!isSelf && (
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="p-1.5 text-on-surface-variant hover:text-error rounded hover:bg-surface-container-low cursor-pointer transition-colors"
                            title="Delete User"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        )}
                      </div>
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
