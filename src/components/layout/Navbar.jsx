import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navClass = isHome && !scrolled ? 'navbar transparent' : 'navbar white';

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <>
      <div className="announcement-bar">
        <span>Livraison offerte dès 60€ — Bijoux en acier inoxydable — Paris — Résistant à l'eau • Hypoallergénique • Ne ternit pas facilement</span>
      </div>

      <nav className={navClass}>
        <div className="navbar-inner">
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              <img src="/images/logo.jpg" alt="Élor Paris" className="navbar-logo-img" />
              <span>Élor <span>Paris</span></span>
            </Link>

            <div className="navbar-links">
              <Link to="/shop" className={isActive('/shop')}>Boutique</Link>
              <Link to="/collections" className={isActive('/collections')}>Collections</Link>
              <Link to="/about" className={isActive('/about')}>Histoire</Link>
              <Link to="/contact" className={isActive('/contact')}>Contact</Link>
            </div>
          </div>

          <div className="navbar-actions">
            {user ? (
              <Link to="/account" title="Mon compte">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </Link>
            ) : (
              <Link to="/login" title="Connexion">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </Link>
            )}

            <Link to="/wishlist" title="Favoris" style={{ position: 'relative' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishlist.length > 0 && <span className="action-badge">{wishlist.length}</span>}
            </Link>

            <Link to="/cart" title="Panier" style={{ position: 'relative' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
            </Link>

            <button
              className={`mobile-menu-btn ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <Link to="/shop">Boutique</Link>
        <Link to="/collections">Collections</Link>
        <Link to="/about">Histoire</Link>
        <Link to="/contact">Contact</Link>
        <div className="mobile-menu-actions">
          {user ? (
            <>
              <Link to="/account">Mon Compte</Link>
              <button onClick={logout} style={{ flex: 1, textAlign: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)', fontSize: 'var(--small)', textTransform: 'uppercase', letterSpacing: '1px', padding: 'var(--space-md)', color: 'var(--espresso)' }}>Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/login">Connexion</Link>
              <Link to="/register">Inscription</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
