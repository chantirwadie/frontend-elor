import Hero from '../components/home/Hero';
import FeaturedCollections from '../components/home/FeaturedCollections';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';
import LuxuryStory from '../components/home/LuxuryStory';
import InstagramSection from '../components/home/InstagramSection';
import Testimonials from '../components/home/Testimonials';
import TrustBadges from '../components/home/TrustBadges';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
  return (
    <>
      <Hero />

      <section className="shop-by-mood">
        <div className="section-header">
          <span className="section-label">Inspirations</span>
          <h2>Shop by Mood</h2>
          <p>Trouvez le bijou qui correspond à votre humeur</p>
        </div>
        <div className="mood-grid">
          <a href="/shop?isNewArrival=true" className="mood-card">
            <img src="/assets/images/new-arrivals.jpg" alt="Nouveautés" loading="lazy" />
            <div className="mood-card-overlay">
              <h3>Nouveautés</h3>
              <span>Les dernières créations</span>
            </div>
          </a>
          <a href="/shop?isBestSeller=true" className="mood-card">
            <img src="/assets/images/gold-jewelry-hero.jpg" alt="Best Sellers" loading="lazy" />
            <div className="mood-card-overlay">
              <h3>Best Sellers</h3>
              <span>Les plus aimés</span>
            </div>
          </a>
          <a href="/shop?color=Dor%C3%A9" className="mood-card">
            <img src="/assets/images/stainless-jewelry.jpg" alt="Doré Intemporel" loading="lazy" />
            <div className="mood-card-overlay">
              <h3>Doré Intemporel</h3>
              <span>L'éclat doré</span>
            </div>
          </a>
          <a href="/collections" className="mood-card">
            <img src="/assets/images/gift-jewelry.jpg" alt="Cadeaux Élégants" loading="lazy" />
            <div className="mood-card-overlay">
              <h3>Cadeaux Élégants</h3>
              <span>Offrir l'élégance</span>
            </div>
          </a>
        </div>
      </section>

      <TrustBadges />
      <FeaturedCollections />
      <BestSellers />
      <NewArrivals />
      <LuxuryStory />

      <section className="benefits">
        <div className="section-header">
          <span className="section-label">Qualité</span>
          <h2>Pourquoi l'acier inoxydable ?</h2>
          <p>Des bijoux pensés pour durer, sans compromis sur l'élégance</p>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <h4>Résistant à l'eau</h4>
            <p>Portez-les sous la pluie, à la mer ou dans votre quotidien sans souci.</p>
          </div>
          <div className="benefit-card">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <h4>Hypoallergénique</h4>
            <p>Conçus pour les peaux sensibles, sans nickel ni allergènes.</p>
          </div>
          <div className="benefit-card">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h4>Durable</h4>
            <p>L'acier inoxydable ne se déforme pas et conserve son éclat.</p>
          </div>
          <div className="benefit-card">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            </div>
            <h4>Éclat longue durée</h4>
            <p>Ne ternit pas facilement, garde sa brillance jour après jour.</p>
          </div>
          <div className="benefit-card">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
            </div>
            <h4>Parfait au quotidien</h4>
            <p>Des bijoux que vous ne quittez plus, pour un éclat permanent.</p>
          </div>
        </div>
      </section>

      <Testimonials />
      <InstagramSection />
      <Newsletter />
    </>
  );
};

export default Home;
