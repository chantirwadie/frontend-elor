import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <section className="about-hero">
        <span className="section-label">Notre Histoire</span>
        <h1>Une élégance née à Paris</h1>
        <p>L'acier inoxydable comme signature, l'élégance parisienne comme inspiration.</p>
      </section>

      <section className="about-story">
        <div className="about-grid">
          <div className="about-image">
            <img src="/assets/images/gold-jewelry-hero.jpg" alt="Élor Paris" loading="lazy" />
          </div>
          <div className="about-content">
            <span className="label">Notre Vision</span>
            <h2>L'élégance au quotidien</h2>
            <p>
              Élor Paris est née d'une passion pour la joaillerie fine et l'élégance à la française.
              Notre mission : offrir des bijoux de qualité, accessibles et intemporels, à toutes les femmes.
              Chaque pièce est conçue à Paris, avec l'acier inoxydable comme matière de prédilection.
              Un choix délibéré pour sa durabilité, son éclat et sa résistance.
            </p>
            <p>
              Chez Élor Paris, nous croyons que le vrai luxe réside dans la simplicité et la qualité.
              Nos bijoux sont pensés pour accompagner chaque femme dans son quotidien, du bureau aux soirées,
              en passant par les moments précieux de la vie.
            </p>
            <Link to="/shop" className="btn btn-outline" style={{ marginTop: 'var(--space-md)' }}>
              Découvrir la collection
            </Link>
          </div>
        </div>
      </section>

      <section className="about-story" style={{ background: 'var(--cream)' }}>
        <div className="about-grid reverse">
          <div className="about-image">
            <img src="/assets/images/stainless-jewelry.jpg" alt="Acier inoxydable" loading="lazy" />
          </div>
          <div className="about-content">
            <span className="label">Notre Matériau</span>
            <h2>L'acier inoxydable, l'élégance sans compromis</h2>
            <p>
              Nous avons choisi l'acier inoxydable 316L pour sa qualité supérieure. Un matériau noble,
              résistant à la corrosion, hypoallergénique et éternellement brillant. Contrairement aux
              bijoux plaqués qui s'abîment avec le temps, l'acier inoxydable conserve son éclat
              jour après jour.
            </p>
            <p>
              C'est le choix de la durabilité et de l'authenticité. Un bijou que l'on ne quitte plus,
              qui traverse les saisons et les tendances.
            </p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="section-header">
          <span className="section-label">Nos Valeurs</span>
          <h2>Éclat • Élégance • Intemporel</h2>
          <p>Trois piliers qui guident chacune de nos créations</p>
        </div>
        <div className="about-values-grid">
          <div className="about-value-card">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              </svg>
            </div>
            <h3>Éclat</h3>
            <p>Une lumière discrète, un éclat qui reste. Nos bijoux brillent par leur qualité et leur finition.</p>
          </div>
          <div className="about-value-card">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3>Élégance</h3>
            <p>Des designs raffinés, inspirés de l'élégance parisienne. La simplicité comme luxe suprême.</p>
          </div>
          <div className="about-value-card">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h3>Intemporel</h3>
            <p>Des pièces qui traversent le temps, au-delà des modes. Des bijoux pour toujours.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
