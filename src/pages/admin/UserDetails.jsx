import { useParams, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function AdminUserDetails() {
  const { userId } = useParams();
  const { users, orders } = useStore();

  const user = users.find((u) => String(u.id) === String(userId));
  const userOrders = orders.filter(
    (o) => o.userId === user?.id || o.customerEmail === user?.email
  );

  if (!user) {
    return (
      <div className="p-8 text-center bg-white rounded border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2">User Not Found</h2>
        <Link to="/admin/users" className="text-emerald-600 font-semibold hover:underline">
          Return to Users List
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <Link to="/admin/users" className="text-xs text-gray-600 hover:underline font-medium">
          &larr; Back to Users List
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-3">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2">
            Account Profile
          </h2>
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">User ID</p>
            <p className="font-semibold text-gray-900">#{user.id}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">Role</p>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-purple-100 text-purple-800">
              {user.role}
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">Account Status</p>
            <span
              className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
                user.disabled ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {user.disabled ? 'Disabled' : 'Active'}
            </span>
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2">
            User Order History ({userOrders.length})
          </h2>

          {userOrders.length > 0 ? (
            <div className="divide-y divide-gray-100 text-sm">
              {userOrders.map((order) => (
                <div key={order.id} className="py-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-900">#{order.id}</span>
                    <span className="text-xs text-gray-500 ml-2">{order.date}</span>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {order.items.length} items • ${Number(order.total).toFixed(2)}
                    </p>
                  </div>
                  <Link
                    to={`/admin/orders/${order.id}`}
                    className="text-xs font-semibold text-emerald-600 hover:underline"
                  >
                    View Order
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 py-4">No order history for this user.</p>
          )}
        </div>
      </div>
    </div>
  );
}
