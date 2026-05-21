import { useState, useEffect } from 'react';
import { getSubscribers } from '../../api/contactApi';
import Loading from '../../components/common/Loading';

const AdminNewsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSubscribers()
      .then((res) => setSubscribers(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="admin-header">
        <h1>Newsletter</h1>
        <span style={{ fontSize: 'var(--small)', color: 'var(--color-gray)' }}>{subscribers.length} abonné{subscribers.length > 1 ? 's' : ''}</span>
      </div>
      <table className="admin-table">
        <thead><tr><th>Email</th><th>Date d'inscription</th><th>Statut</th></tr></thead>
        <tbody>
          {subscribers.map((s) => (
            <tr key={s.id}>
              <td>{s.email}</td>
              <td>{new Date(s.subscribedAt).toLocaleDateString('fr-FR')}</td>
              <td><span className={`badge ${s.isActive ? 'badge-new' : ''}`}>{s.isActive ? 'Actif' : 'Désinscrit'}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminNewsletter;
