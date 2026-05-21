import { siteContent } from '../data/staticContent';

const ShippingReturns = () => {
  return (
    <>
      <div className="page-hero">
        <h1>Livraison & Retours</h1>
      </div>
      <section className="section">
        <div className="static-page" style={{ paddingTop: 0 }}>
          <h2>Livraison</h2>
          <p>{siteContent.shippingReturns.shipping}</p>

          <h2>Retours</h2>
          <p>{siteContent.shippingReturns.returns}</p>

          <h2>Paiement</h2>
          <p>{siteContent.shippingReturns.payment}</p>
        </div>
      </section>
    </>
  );
};

export default ShippingReturns;
