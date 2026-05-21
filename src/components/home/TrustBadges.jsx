const TrustBadges = () => {
  const badges = [
    { title: 'Livraison Offerte', desc: 'Dès 60€ d\'achat', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
    { title: 'Paiement Sécurisé', desc: 'CB, PayPal, Apple Pay', icon: 'M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z' },
    { title: 'Retour Facile', desc: 'Satisfait ou remboursé', icon: 'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15' },
    { title: 'Qualité Garantie', desc: 'Acier inoxydable 316L', icon: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z' },
  ];

  return (
    <section className="trust-badges">
      <div className="trust-badges-inner">
        {badges.map((badge, i) => (
          <div key={i} className="trust-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={badge.icon}/>
            </svg>
            <h4>{badge.title}</h4>
            <p>{badge.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBadges;
