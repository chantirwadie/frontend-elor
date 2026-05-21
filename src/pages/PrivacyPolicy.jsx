const PrivacyPolicy = () => {
  return (
    <>
      <div className="page-hero">
        <h1>Politique de Confidentialité</h1>
      </div>
      <section className="section">
        <div className="static-page" style={{ paddingTop: 0 }}>
          <h2>Collecte des données</h2>
          <p>Nous collectons vos données personnelles (nom, email, adresse) uniquement dans le cadre de la gestion de vos commandes et de votre compte client.</p>

          <h2>Utilisation des données</h2>
          <p>Vos données sont utilisées pour :</p>
          <ul>
            <li>Traitement et expédition de vos commandes</li>
            <li>Communication concernant votre commande</li>
            <li>Envoi de notre newsletter (avec votre consentement)</li>
            <li>Amélioration de notre service client</li>
          </ul>

          <h2>Protection des données</h2>
          <p>Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires pour garantir la sécurité de vos données personnelles.</p>

          <h2>Vos droits</h2>
          <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à contact@elorparis.fr.</p>

          <h2>Cookies</h2>
          <p>Notre site utilise des cookies nécessaires au fonctionnement du panier et à votre authentification. Nous n'utilisons pas de cookies publicitaires tiers.</p>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
