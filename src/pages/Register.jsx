import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    setLoading(true);
    try {
      await register({ firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div className="auth-brand-content">
          <div className="brand-icon">
            <img src="/images/logo.jpg" alt="Élor Paris" className="auth-logo-img" />
          </div>
          <h2>Élor Paris</h2>
          <p>Créez votre compte et rejoignez l'univers Élor Paris — inspiration, élégance et exclusivités.</p>
        </div>
      </div>
      <div className="auth-form-wrapper">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Créer mon compte</h2>
          <p className="subtitle">Rejoignez l'univers Élor Paris</p>
          {error && <p style={{ color: '#D32F2F', fontSize: 'var(--small)', textAlign: 'center', marginBottom: 'var(--space-md)', padding: 'var(--space-sm)', background: '#FFEBEE', borderRadius: 'var(--radius-sm)' }}>{error}</p>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
            <div className="input-group">
              <label>Prénom</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="Marie" />
            </div>
            <div className="input-group">
              <label>Nom</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Dubois" />
            </div>
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="marie@example.com" />
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} placeholder="Minimum 6 caractères" />
          </div>
          <div className="input-group">
            <label>Confirmer le mot de passe</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required minLength={6} placeholder="Confirmez votre mot de passe" />
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading} style={{ marginTop: 'var(--space-md)' }}>
            {loading ? 'Inscription...' : 'Créer mon compte'}
          </button>
          <div className="auth-link">
            Déjà un compte ? <Link to="/login">Se connecter</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
