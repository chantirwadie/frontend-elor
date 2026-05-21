import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Email ou mot de passe incorrect');
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
          <p>Connectez-vous pour accéder à votre univers Élor Paris — vos favoris, vos commandes et bien plus.</p>
        </div>
      </div>
      <div className="auth-form-wrapper">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Bon retour parmi nous</h2>
          <p className="subtitle">Connectez-vous à votre compte</p>
          {error && <p style={{ color: '#D32F2F', fontSize: 'var(--small)', textAlign: 'center', marginBottom: 'var(--space-md)', padding: 'var(--space-sm)', background: '#FFEBEE', borderRadius: 'var(--radius-sm)' }}>{error}</p>}
          <div className="input-group">
            <label>Email ou identifiant</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="votre@email.com" />
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Votre mot de passe" />
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading} style={{ marginTop: 'var(--space-md)' }}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
          <div className="auth-link">
            Pas encore de compte ? <Link to="/register">S'inscrire</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
