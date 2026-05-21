const LuxuryStory = () => {
  return (
    <section className="editorial-story">
      <div className="editorial-grid">
        <div className="editorial-image">
          <img
            src="/assets/images/gift-jewelry.jpg"
            alt="Élor Paris bijoux"
            loading="lazy"
          />
        </div>
        <div className="editorial-content">
          <span className="label">Notre Signature</span>
          <h2>Pensés comme une seconde peau</h2>
          <p>
            Chez Élor Paris, nous avons choisi l'acier inoxydable pour sa qualité exceptionnelle.
            Un matériau noble, résistant et éternellement brillant, à l'image de la femme parisienne.
          </p>
          <p>
            Nos bijoux sont conçus pour vous accompagner chaque jour, sans jamais perdre leur éclat.
            Waterproof, hypoallergéniques, ils résistent au temps et aux éléments.
          </p>
          <div className="editorial-benefits">
            <div className="editorial-benefit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <h4>Résistant à l'eau</h4>
              <p>Portez-les en toutes circonstances</p>
            </div>
            <div className="editorial-benefit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <h4>Hypoallergénique</h4>
              <p>Respectueux des peaux sensibles</p>
            </div>
            <div className="editorial-benefit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
              <h4>Ne ternit pas</h4>
              <p>Un éclat qui dure dans le temps</p>
            </div>
            <div className="editorial-benefit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <h4>Durable</h4>
              <p>Une qualité qui traverse le temps</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryStory;
