const statusColors = {
  PENDING: 'status-pending',
  CONFIRMED: 'status-confirmed',
  PROCESSING: 'status-processing',
  SHIPPED: 'status-shipped',
  DELIVERED: 'status-delivered',
  CANCELLED: 'status-cancelled',
  REFUNDED: 'status-refunded',
};

const statusLabels = {
  PENDING: 'En attente',
  CONFIRMED: 'Confirmée',
  PROCESSING: 'En préparation',
  SHIPPED: 'Expédiée',
  DELIVERED: 'Livrée',
  CANCELLED: 'Annulée',
  REFUNDED: 'Remboursée',
};

const OrderTable = ({ orders = [], onStatusChange }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Commande</th>
          <th>Client</th>
          <th>Date</th>
          <th>Total</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td><strong>{order.orderNumber}</strong></td>
            <td>{order.user?.firstName} {order.user?.lastName}<br /><span style={{ fontSize: '0.75rem', color: 'var(--color-gray)' }}>{order.user?.email}</span></td>
            <td>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</td>
            <td>€{order.totalAmount.toFixed(2)}</td>
            <td><span className={`status-badge ${statusColors[order.status] || ''}`}>{statusLabels[order.status] || order.status}</span></td>
            <td>
              <select
                value={order.status}
                onChange={(e) => onStatusChange(order.id, { status: e.target.value })}
                style={{ padding: '4px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-light-gray)', fontSize: 'var(--tiny)' }}
              >
                {Object.entries(statusLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
