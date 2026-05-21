import { useState, useEffect } from 'react';
import { getProducts } from '../../api/productApi';
import { getAllOrders } from '../../api/orderApi';
import { getMessages } from '../../api/contactApi';
import AdminStats from '../../components/admin/AdminStats';
import Loading from '../../components/common/Loading';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getProducts({ limit: 1 }),
      getAllOrders({ limit: 1 }),
      getMessages(),
    ])
      .then(([prodRes, orderRes, msgRes]) => {
        setStats({
          products: prodRes.data.total || 0,
          orders: orderRes.data.total || 0,
          messages: msgRes.data.length || 0,
          customers: 0,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="admin-header">
        <h1>Dashboard</h1>
        <p style={{ color: 'var(--muted)', fontSize: 'var(--small)' }}>Vue d'ensemble de votre boutique</p>
      </div>
      <AdminStats stats={stats} />
    </div>
  );
};

export default AdminDashboard;
