import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.role === 'ADMIN') navigate('/admin/dashboard');
      else navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(email, password);
      if (data.user.role !== 'ADMIN') {
        setError('Accès réservé aux administrateurs');
        return;
      }
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--espresso)' }}>
      <form onSubmit={handleSubmit} style={{ background: 'var(--white)', padding: 'var(--space-2xl)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 400, boxShadow: 'var(--shadow-xl)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <img src="/images/logo.jpg" alt="Élor Paris" style={{ height: 48, width: 'auto', objectFit: 'contain', marginBottom: 8 }} />
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}>Élor <span style={{ color: 'var(--gold)' }}>Paris</span></h2>
          <p style={{ fontSize: 'var(--small)', color: 'var(--muted)', marginTop: 'var(--space-sm)' }}>Administration</p>
        </div>
        {error && <p style={{ color: '#D32F2F', fontSize: 'var(--small)', textAlign: 'center', marginBottom: 'var(--space-md)', padding: 'var(--space-sm)', background: '#FFEBEE', borderRadius: 'var(--radius-sm)' }}>{error}</p>}
        <div className="input-group" style={{ marginBottom: 'var(--space-md)' }}>
          <label>Email / Identifiant</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@elorparis.fr" />
        </div>
        <div className="input-group" style={{ marginBottom: 'var(--space-lg)' }}>
          <label>Mot de passe</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Votre mot de passe" />
        </div>
        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
