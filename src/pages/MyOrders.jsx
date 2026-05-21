import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../api/orderApi';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';

const statusLabels = {
  PENDING: 'En attente', CONFIRMED: 'Confirmée', PROCESSING: 'En préparation',
  SHIPPED: 'Expédiée', DELIVERED: 'Livrée', CANCELLED: 'Annulée', REFUNDED: 'Remboursée',
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then((res) => setOrders(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="account-page"><Loading /></div>;

  return (
    <div className="account-page">
      <h1 style={{ marginBottom: 'var(--space-xl)' }}>Mes Commandes</h1>

      {orders.length === 0 ? (
        <EmptyState message="Vous n'avez pas encore de commande" buttonText="Découvrir nos bijoux" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {orders.map((order) => (
            <div key={order.id} style={{ background: 'var(--color-white)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                <div>
                  <strong>{order.orderNumber}</strong>
                  <br />
                  <span style={{ fontSize: 'var(--small)', color: 'var(--color-gray)' }}>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`status-badge status-${order.status.toLowerCase()}`}>{statusLabels[order.status]}</span>
                  <br />
                  <strong>€{order.totalAmount.toFixed(2)}</strong>
                </div>
              </div>
              {order.items?.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', padding: 'var(--space-xs) 0', borderTop: '1px solid var(--color-cream)' }}>
                  {item.image && <img src={item.image} alt="" style={{ width: 40, height: 50, objectFit: 'cover', borderRadius: 4 }} />}
                  <span style={{ fontSize: 'var(--small)' }}>{item.name} x{item.quantity}</span>
                  <span style={{ fontSize: 'var(--small)', marginLeft: 'auto' }}>€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
