import { useState, useEffect } from 'react';
import { getMessages, markAsRead, deleteMessage } from '../../api/contactApi';
import Loading from '../../components/common/Loading';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = () => {
    getMessages()
      .then((res) => setMessages(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleRead = async (id) => {
    try {
      await markAsRead(id);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce message ?')) return;
    try {
      await deleteMessage(id);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="admin-header">
        <h1>Messages</h1>
      </div>
      <table className="admin-table">
        <thead><tr><th>Date</th><th>Nom</th><th>Email</th><th>Sujet</th><th>Message</th><th>Statut</th><th>Actions</th></tr></thead>
        <tbody>
          {messages.map((m) => (
            <tr key={m.id} style={{ opacity: m.isRead ? 0.6 : 1 }}>
              <td style={{ fontSize: 'var(--tiny)' }}>{new Date(m.createdAt).toLocaleDateString('fr-FR')}</td>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.subject}</td>
              <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.message}</td>
              <td><span className={`badge ${!m.isRead ? 'badge-new' : ''}`}>{m.isRead ? 'Lu' : 'Non lu'}</span></td>
              <td>
                <div className="admin-table-actions">
                  {!m.isRead && <button className="btn-edit" onClick={() => handleRead(m.id)}>Marquer lu</button>}
                  <button className="btn-delete" onClick={() => handleDelete(m.id)}>Supprimer</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMessages;
