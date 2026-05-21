import { useState, useEffect } from 'react';
import { getAllReviews, approveReview, deleteReview } from '../../api/reviewApi';
import Loading from '../../components/common/Loading';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = () => {
    getAllReviews()
      .then((res) => setReviews(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleApprove = async (id) => {
    try {
      await approveReview(id);
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet avis ?')) return;
    try {
      await deleteReview(id);
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="admin-header">
        <h1>Avis Clients</h1>
      </div>
      <table className="admin-table">
        <thead><tr><th>Client</th><th>Produit</th><th>Note</th><th>Avis</th><th>Statut</th><th>Actions</th></tr></thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r.id}>
              <td>{r.user?.firstName} {r.user?.lastName}</td>
              <td>{r.product?.name}</td>
              <td style={{ color: 'var(--color-gold)' }}>{'★'.repeat(r.rating)}</td>
              <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.comment}</td>
              <td><span className={`badge ${r.isApproved ? 'badge-new' : ''}`}>{r.isApproved ? 'Approuvé' : 'En attente'}</span></td>
              <td>
                <div className="admin-table-actions">
                  {!r.isApproved && <button className="btn-edit" onClick={() => handleApprove(r.id)}>Approuver</button>}
                  <button className="btn-delete" onClick={() => handleDelete(r.id)}>Supprimer</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReviews;
