import { siteContent } from '../../data/staticContent';

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="section-header">
        <span className="section-label">Avis Client</span>
        <h2>Elles Parlent de Nous</h2>
        <p>La satisfaction de nos clientes est notre plus belle récompense</p>
      </div>

      <div className="testimonials-rating">
        <div className="big-stars">
          <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <h3><strong>4.8/5</strong> — 2,450+ clientes satisfaites</h3>
        <p>Basé sur les avis vérifiés</p>
      </div>

      <div className="testimonials-grid">
        {siteContent.testimonials.slice(0, 3).map((t, i) => (
          <div key={i} className="testimonial-card">
            <div className="stars">
              {Array.from({ length: 5 }, (_, j) => (
                <svg key={j} viewBox="0 0 24 24" fill={j < t.rating ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <p className="quote">&ldquo;{t.text}&rdquo;</p>
            <div className="author">{t.name}</div>
            <div className="author-title">Cliente Élor Paris</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
