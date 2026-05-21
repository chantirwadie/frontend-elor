import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import Loading from '../../components/common/Loading';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get('/auth/me')
      .then(() => {
        return axiosClient.get('/users');
      })
      .then((res) => setCustomers(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="admin-header">
        <h1>Clients</h1>
      </div>
      <table className="admin-table">
        <thead><tr><th>Nom</th><th>Email</th><th>Téléphone</th><th>Ville</th><th>Rôle</th></tr></thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.firstName} {c.lastName}</td>
              <td>{c.email}</td>
              <td>{c.phone || '-'}</td>
              <td>{c.city || '-'}</td>
              <td><span className={`badge ${c.role === 'ADMIN' ? 'badge-new' : ''}`}>{c.role === 'ADMIN' ? 'Admin' : 'Client'}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCustomers;
