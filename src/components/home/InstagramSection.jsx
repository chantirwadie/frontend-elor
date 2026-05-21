import { siteContent } from '../../data/staticContent';

const InstagramSection = () => {
  return (
    <section className="instagram-section">
      <div className="section-header">
        <span className="section-label">Inspiration</span>
        <h2>Porté par vous, inspiré par Paris</h2>
        <p>Suivez-nous sur Instagram pour découvrir nos inspirations quotidiennes</p>
      </div>
      <div className="instagram-grid">
        {siteContent.instagramImages.slice(0, 6).map((img, i) => (
          <div key={i} className="instagram-item">
            <img src={img.url} alt={`Élor Paris ${i + 1}`} loading="lazy" />
            <div className="instagram-item-overlay">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
        <a href="https://instagram.com/elor_paris" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          Suivre @elor_paris
        </a>
      </div>
    </section>
  );
};

export default InstagramSection;
