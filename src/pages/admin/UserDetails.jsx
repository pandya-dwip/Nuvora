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
      <div data-testid="admin-user-details-not-found" className="p-12 text-center bg-surface rounded border border-outline-variant max-w-md mx-auto">
        <span className="material-symbols-outlined text-5xl text-outline mb-2">person_off</span>
        <h2 className="text-headline-md font-headline-md font-bold text-on-surface mb-2">User Record Not Found</h2>
        <p className="text-body-md text-on-surface-variant text-sm mb-6">No user account matching ID #{userId} exists.</p>
        <Link to="/admin/users" data-testid="admin-user-details-return-button" className="bg-primary text-on-primary px-5 py-2.5 rounded font-label-sm text-xs font-bold uppercase tracking-wider inline-block">
          Return to Users
        </Link>
      </div>
    );
  }

  const totalSpent = userOrders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + Number(o.total || 0), 0);

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div data-testid="admin-user-details-container" className="w-full space-y-stack-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant pb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary text-on-primary text-xl font-bold flex items-center justify-center font-display shadow-xs">
            {userInitial}
          </div>
          <div>
            <h2 data-testid="admin-user-details-name" className="text-display-lg-mobile md:text-headline-md font-headline-md font-bold text-on-background">{user.name}</h2>
            <p data-testid="admin-user-details-email" className="text-xs text-on-surface-variant">{user.email}</p>
          </div>
        </div>
        <Link
          to="/admin/users"
          data-testid="admin-user-details-back-link"
          className="font-label-sm text-xs font-bold text-on-surface hover:text-primary flex items-center gap-1"
        >
          &larr; Back to Users Directory
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-start w-full">
        {/* User Profile Card */}
        <div className="bg-surface rounded border border-outline-variant shadow-xs p-stack-md space-y-5 text-sm">
          <h3 className="text-headline-md font-headline-md font-bold text-on-background border-b border-outline-variant pb-3">
            Account Metadata
          </h3>
          <div>
            <span className="font-label-sm text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
              User ID
            </span>
            <p data-testid="admin-user-details-id" className="font-mono font-bold text-on-background">#{user.id}</p>
          </div>
          <div>
            <span className="font-label-sm text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
              System Role
            </span>
            <span data-testid="admin-user-details-role" className="px-3 py-1 rounded text-xs font-bold uppercase bg-primary/10 text-primary border border-primary/20">
              {user.role}
            </span>
          </div>
          <div>
            <span className="font-label-sm text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
              Account Status
            </span>
            <span
              data-testid="admin-user-details-status"
              className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                user.disabled ? 'bg-error-container text-on-error-container' : 'bg-primary/10 text-primary'
              }`}
            >
              {user.disabled ? 'Disabled' : 'Active'}
            </span>
          </div>
          <div className="pt-3 border-t border-outline-variant">
            <span className="font-label-sm text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
              Lifetime Value
            </span>
            <p data-testid="admin-user-details-lifetime-value" className="text-display-lg-mobile font-bold text-primary font-display">
              ${totalSpent.toFixed(2)}
            </p>
          </div>
        </div>

        {/* User Orders History */}
        <div className="lg:col-span-2 bg-surface rounded border border-outline-variant shadow-xs p-stack-md space-y-4">
          <h3 className="text-headline-md font-headline-md font-bold text-on-background border-b border-outline-variant pb-3">
            Customer Order History ({userOrders.length})
          </h3>

          {userOrders.length > 0 ? (
            <div data-testid="admin-user-details-orders-list" className="divide-y divide-outline-variant/60 text-sm">
              {userOrders.map((order) => (
                <div key={order.id} data-testid={`admin-user-order-${order.id}`} className="py-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-on-background">#{order.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          order.status === 'Delivered'
                            ? 'bg-primary/10 text-primary'
                            : order.status === 'Cancelled'
                            ? 'bg-error-container text-on-error-container'
                            : 'bg-surface-container-high text-on-surface'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Date: {order.date} • {order.items.length} items
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-on-background block font-display">
                      ${Number(order.total).toFixed(2)}
                    </span>
                    <Link
                      to={`/admin/orders/${order.id}`}
                      data-testid={`admin-user-order-link-${order.id}`}
                      className="text-xs font-bold text-primary hover:underline mt-0.5 inline-block"
                    >
                      View Order &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p data-testid="admin-user-details-no-orders" className="text-sm text-on-surface-variant py-8 text-center">No orders recorded for this user account.</p>
          )}
        </div>
      </div>
    </div>
  );
}
