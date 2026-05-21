import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <img src="/images/logo.jpg" alt="Élor Paris" className="admin-logo-img" />
        <span>Élor <span>Paris</span></span>
        <div style={{ fontSize: '0.7rem', opacity: 0.6, fontFamily: 'var(--font-body)', marginTop: 4 }}>Administration</div>
      </div>

      <nav className="admin-sidebar-nav">
        <Link to="/admin/dashboard" className={isActive('/admin/dashboard')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          Dashboard
        </Link>
        <Link to="/admin/products" className={isActive('/admin/products')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
          Produits
        </Link>
        <Link to="/admin/categories" className={isActive('/admin/categories')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h6v6H4z"/><path d="M14 4h6v6h-6z"/><path d="M4 14h6v6H4z"/><path d="M14 14h6v6h-6z"/></svg>
          Catégories
        </Link>
        <Link to="/admin/collections" className={isActive('/admin/collections')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
          Collections
        </Link>
        <Link to="/admin/orders" className={isActive('/admin/orders')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          Commandes
        </Link>
        <Link to="/admin/customers" className={isActive('/admin/customers')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Clients
        </Link>
        <Link to="/admin/reviews" className={isActive('/admin/reviews')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Avis
        </Link>
        <Link to="/admin/messages" className={isActive('/admin/messages')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Messages
        </Link>
        <Link to="/admin/newsletter" className={isActive('/admin/newsletter')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Newsletter
        </Link>
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: 'var(--space-xl)' }}>
        <Link to="/" style={{ fontSize: 'var(--small)', opacity: 0.7, display: 'block', marginBottom: 'var(--space-sm)' }}>
          ← Voir le site
        </Link>
        <button
          onClick={logout}
          style={{ fontSize: 'var(--small)', opacity: 0.7, cursor: 'pointer', color: 'inherit', background: 'none', border: 'none', fontFamily: 'inherit' }}
        >
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
