import { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../../api/orderApi';
import OrderTable from '../../components/admin/OrderTable';
import Loading from '../../components/common/Loading';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    getAllOrders()
      .then((res) => setOrders(res.data.orders))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (id, data) => {
    try {
      await updateOrderStatus(id, data);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="admin-header">
        <h1>Commandes</h1>
      </div>
      <OrderTable orders={orders} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default AdminOrders;
