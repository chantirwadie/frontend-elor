import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import QuantitySelector from './QuantitySelector';

const ProductInfo = ({ product }) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [added, setAdded] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize || null);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  const accordionItems = [
    {
      id: 'description',
      title: 'Description',
      content: product.description,
    },
    {
      id: 'details',
      title: 'Détails & Matière',
      content: `• Matière : ${product.material || 'Acier inoxydable 316L'}\n• Couleur : ${product.color || 'Doré'}\n• Résistant à l'eau : ${product.waterproof ? 'Oui' : 'Non'}\n• Hypoallergénique : ${product.hypoallergenic ? 'Oui' : 'Non'}\n• Fabrication : Paris, France`,
    },
    {
      id: 'shipping',
      title: 'Livraison & Retours',
      content: 'Livraison offerte dès 60€ d\'achat. Expédition sous 24/48h. Retours faciles sous 30 jours. Paiement sécurisé par CB, PayPal ou Apple Pay.',
    },
    {
      id: 'care',
      title: 'Conseils d\'entretien',
      content: 'Pour préserver l\'éclat de vos bijoux Élor Paris, évitez le contact avec les produits chimiques. Nettoyez avec un chiffon doux. Rangez-les à l\'abri de l\'humidité.',
    },
  ];

  return (
    <div className="product-info">
      <h1>{product.name}</h1>

      <div className="product-info-rating">
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          ))}
        </div>
        <span>{product.reviews?.length || 0} avis</span>
      </div>

      <div className="product-info-price">
        €{product.price.toFixed(2)}
        {product.compareAtPrice && <span className="original">€{product.compareAtPrice.toFixed(2)}</span>}
      </div>

      <div className="product-info-badges">
        {product.waterproof && (
          <span className="product-info-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
            Résistant à l'eau
          </span>
        )}
        {product.hypoallergenic && (
          <span className="product-info-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
            Hypoallergénique
          </span>
        )}
        <span className="product-info-badge">Acier inoxydable</span>
        {product.isNewArrival && <span className="product-info-badge" style={{ background: 'var(--gold)', color: 'var(--white)' }}>Nouveau</span>}
      </div>

      {product.sizes?.length > 0 && (
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--muted)', marginBottom: 'var(--space-sm)', fontWeight: 600 }}>Taille</div>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                style={{
                  padding: '8px 18px',
                  border: selectedSize === size ? '1px solid var(--gold)' : '1px solid var(--border)',
                  background: selectedSize === size ? 'var(--cream)' : 'transparent',
                  fontSize: 'var(--small)',
                  fontWeight: selectedSize === size ? 600 : 400,
                  cursor: 'pointer',
                  color: 'var(--espresso)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="product-actions">
        <div className="product-actions-row">
          <QuantitySelector quantity={quantity} onChange={setQuantity} />
          <button onClick={handleAddToCart} className="btn btn-primary btn-lg" style={{ flex: 1 }}>
            {added ? '✓ Ajouté au panier' : 'Ajouter au panier'}
          </button>
        </div>
        <button
          onClick={() => toggleWishlist(product.id)}
          className="btn btn-outline"
          style={{ width: '100%' }}
        >
          {isInWishlist(product.id) ? '♥ Retirer des favoris' : '♡ Ajouter aux favoris'}
        </button>
      </div>

      <div className="product-delivery">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
        <span>Expédition sous 24/48h — Livraison offerte dès 60€</span>
      </div>

      <div className="product-accordion">
        {accordionItems.map((item) => (
          <div key={item.id} className="accordion-item">
            <button
              className={`accordion-trigger ${activeAccordion === item.id ? 'open' : ''}`}
              onClick={() => setActiveAccordion(activeAccordion === item.id ? null : item.id)}
            >
              {item.title}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <div className={`accordion-content ${activeAccordion === item.id ? 'open' : ''}`}>
              {item.content.split('\n').map((line, i) => <p key={i}>{line}</p>)}
            </div>
          </div>
        ))}
      </div>

      <div className="trust-list" style={{ marginTop: 'var(--space-lg)' }}>
        <span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Paiement sécurisé
        </span>
        <span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Retour facile 30 jours
        </span>
        <span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Qualité garantie
        </span>
      </div>
    </div>
  );
};

export default ProductInfo;
