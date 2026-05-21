import { Link } from 'react-router-dom';
import { subscribeNewsletter } from '../../api/contactApi';
import { useState } from 'react';
import { siteContent } from '../../data/staticContent';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await subscribeNewsletter({ email });
      setMessage('Merci pour votre inscription !');
      setEmail('');
    } catch {
      setMessage('Vous êtes déjà inscrite.');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-brand-mark">
            <img src="/images/logo.jpg" alt="Élor Paris" className="footer-logo-img" />
            <h3>{siteContent.brand.name}</h3>
          </div>
          <p>{siteContent.brand.slogan}</p>
          <p style={{ marginTop: 'var(--space-md)' }}>{siteContent.brand.description}</p>
          <p style={{ marginTop: 'var(--space-sm)' }}>Paris, France</p>
          <p className="tagline">Éclat • Élégance • Intemporel</p>
          <div className="footer-social">
            <a href="https://instagram.com/elor_paris" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
            </a>
            <a href="https://pinterest.com/elor_paris" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12c0 5.1 3.2 9.4 7.6 11.2-.1-1-.2-2.4 0-3.4.2-.9 1.3-5.4 1.3-5.4s-.3-.6-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.5-.3 1.1.5 1.9 1.6 1.9 1.9 0 3.4-2 3.4-5 0-2.6-1.9-4.4-4.6-4.4-3.1 0-4.9 2.3-4.9 4.7 0 .9.3 1.9.8 2.5.1.1.1.2.1.3-.1.3-.2 1.1-.3 1.3-.1.4-.3.5-.6.3-1.8-.8-2.9-3.4-2.9-5.5 0-4.5 3.3-8.6 9.4-8.6 4.9 0 8.7 3.5 8.7 8.2 0 4.9-3.1 8.9-7.4 8.9-1.4 0-2.8-.7-3.3-1.6 0 0-.7 2.8-.9 3.5-.3 1.2-1.2 2.7-1.8 3.6 1.4.4 2.8.7 4.3.7 6.6 0 12-5.4 12-12S18.6 0 12 0z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4>Boutique</h4>
          <div className="footer-links">
            <Link to="/shop">Tous les produits</Link>
            <Link to="/collections">Collections</Link>
            <Link to="/shop?isNewArrival=true">Nouveautés</Link>
            <Link to="/shop?isBestSeller=true">Meilleures ventes</Link>
          </div>
        </div>

        <div>
          <h4>Service Client</h4>
          <div className="footer-links">
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/shipping-returns">Livraison & Retours</Link>
            <Link to="/privacy-policy">Politique de confidentialité</Link>
            <Link to="/terms">Conditions générales</Link>
          </div>
        </div>

        <div>
          <h4>Newsletter</h4>
          <p style={{ fontSize: 'var(--small)', marginBottom: 'var(--space-md)', color: 'var(--muted)' }}>
            Recevez nos nouveautés et offres exclusives
          </p>
          <form onSubmit={handleSubscribe} className="footer-newsletter-form">
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">
              S'inscrire
            </button>
          </form>
          {message && <p style={{ fontSize: 'var(--tiny)', marginTop: 'var(--space-sm)', color: 'var(--gold)' }}>{message}</p>}
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {siteContent.brand.name}. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
