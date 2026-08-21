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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500">Manage registered customer and administrator accounts.</p>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-100 border border-red-200 text-red-800 rounded text-sm font-medium">
          {errorMessage}
        </div>
      )}

      {/* Search */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-900"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase text-xs">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((user) => {
              const isSelf = currentUser && currentUser.id === user.id;
              return (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <p className="font-semibold text-gray-900 flex items-center gap-2">
                      {user.name}
                      {isSelf && (
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded uppercase">
                          You
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      disabled={isSelf}
                      className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase transition-colors ${
                        user.disabled
                          ? 'bg-red-100 text-red-800 hover:bg-red-200'
                          : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      } ${isSelf ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {user.disabled ? 'Disabled' : 'Active'}
                    </button>
                  </td>
                  <td className="p-3 text-right space-x-3">
                    <Link
                      to={`/admin/users/${user.id}`}
                      className="text-xs font-semibold text-emerald-600 hover:underline"
                    >
                      Details
                    </Link>
                    {!isSelf && (
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
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
