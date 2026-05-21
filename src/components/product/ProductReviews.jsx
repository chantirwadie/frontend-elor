import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Loading from '../common/Loading';

const ProductReviews = ({ reviews = [], loading, onAddReview }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitting(true);
    try {
      await onAddReview(rating, comment);
      setComment('');
      setRating(5);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div style={{ marginTop: 'var(--space-3xl)' }}>
      <h3 style={{ marginBottom: 'var(--space-lg)' }}>Avis Clients</h3>

      {reviews.length === 0 ? (
        <p style={{ color: 'var(--color-gray)', marginBottom: 'var(--space-lg)' }}>Soyez la première à donner votre avis !</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
          {reviews.map((review) => (
            <div key={review.id} style={{ padding: 'var(--space-md)', borderBottom: '1px solid var(--color-cream)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
                <strong style={{ fontSize: 'var(--small)' }}>{review.user?.firstName} {review.user?.lastName?.[0]}.</strong>
                <span style={{ color: 'var(--color-gold)' }}>{'★'.repeat(review.rating)}</span>
              </div>
              <p style={{ fontSize: 'var(--small)', color: 'var(--color-gray)' }}>{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      {user ? (
        <form onSubmit={handleSubmit} style={{ background: 'var(--color-cream)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ marginBottom: 'var(--space-md)' }}>Donner votre avis</h4>
          <div style={{ marginBottom: 'var(--space-md)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--space-sm)', fontSize: 'var(--small)' }}>Note</label>
            <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: star <= rating ? 'var(--color-gold)' : 'var(--color-light-gray)' }}>
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="input-group" style={{ marginBottom: 'var(--space-md)' }}>
            <label>Votre avis</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Partagez votre expérience..." required />
          </div>
          <button type="submit" className="btn btn-primary" disabled={submitting || !comment.trim()}>
            {submitting ? 'Envoi...' : 'Publier'}
          </button>
        </form>
      ) : (
        <p style={{ fontSize: 'var(--small)', color: 'var(--color-gray)' }}>
          <a href="/login" style={{ color: 'var(--color-gold)', fontWeight: 600 }}>Connectez-vous</a> pour laisser un avis.
        </p>
      )}
    </div>
  );
};

export default ProductReviews;
