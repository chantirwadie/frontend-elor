import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1600&q=80"
          alt="Élor Paris bijoux"
          loading="eager"
        />
      </div>

      <div className="hero-content" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
        <span className="hero-label">Élor Paris — Bijouterie Fine</span>
        <h1>L'éclat parisien, porté chaque jour.</h1>
        <p>
          Bijoux en acier inoxydable, lumineux, féminins et intemporels — imaginés pour sublimer chaque moment.
        </p>
        <div className="hero-buttons">
          <Link to="/shop" className="btn btn-primary btn-lg">Découvrir la collection</Link>
          <Link to="/shop?isNewArrival=true" className="btn btn-outline-light btn-lg">Voir les nouveautés</Link>
        </div>
        <div className="hero-trust">
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
            Résistant à l'eau
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
            Hypoallergénique
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Ne ternit pas facilement
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Livraison offerte dès 60€
          </span>
        </div>
      </div>

      <div className="hero-floating">
        <img
          src="https://images.unsplash.com/photo-1602751584558-8ba73aad10e4?w=400&q=80"
          alt="Bijou Élor Paris"
        />
        <h4>Collier Étoile Dorée</h4>
        <span>À partir de 39,90 €</span>
      </div>

      <div className="hero-scroll">
        <span>Découvrir</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5"/><path d="M7 6l5 5 5-5"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
