import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../api/authApi';
import Button from '../components/common/Button';

const Account = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    zipCode: user?.zipCode || '',
    country: user?.country || 'France',
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateProfile(form);
      updateUser(res.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-page">
      <h1 style={{ marginBottom: 'var(--space-xl)' }}>Mon Compte</h1>
      <form onSubmit={handleSubmit} className="admin-form" style={{ maxWidth: 600 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
          <div className="input-group">
            <label>Prénom</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Nom</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} required />
          </div>
        </div>
        <div className="input-group">
          <label>Email</label>
          <input value={form.email} disabled style={{ opacity: 0.6 }} />
        </div>
        <div className="input-group">
          <label>Téléphone</label>
          <input name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Adresse</label>
          <input name="address" value={form.address} onChange={handleChange} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-md)' }}>
          <div className="input-group">
            <label>Ville</label>
            <input name="city" value={form.city} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Code postal</label>
            <input name="zipCode" value={form.zipCode} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Pays</label>
            <input name="country" value={form.country} onChange={handleChange} />
          </div>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Enregistrement...' : saved ? '✓ Enregistré' : 'Mettre à jour'}
        </Button>
      </form>
    </div>
  );
};

export default Account;
