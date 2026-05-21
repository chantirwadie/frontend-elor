import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const inWishlist = isInWishlist(product.id);

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const uniqueColors = product.color ? [product.color] : [];

  return (
    <div className="product-card">
      <Link to={`/shop/${product.slug}`}>
        <div className="product-card-image">
          <img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1515562141589-9f6b9dc5e7b0?w=600'}
            alt={product.name}
            loading="lazy"
          />
          <div className="product-card-badges">
            {product.isNewArrival && <span className="badge badge-new">Nouveau</span>}
            {product.isBestSeller && <span className="badge badge-seller">Best Seller</span>}
            {discount > 0 && <span className="badge badge-sale">-{discount}%</span>}
            {product.waterproof && <span className="badge badge-waterproof">Waterproof</span>}
          </div>
        </div>
      </Link>

      <button
        className={`product-card-wishlist ${inWishlist ? 'active' : ''}`}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
        aria-label="Favoris"
      >
        <svg viewBox="0 0 24 24" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>

      <div className="product-card-quick-add">
        <button className="btn" onClick={handleQuickAdd}>
          Ajouter au panier
        </button>
      </div>

      <Link to={`/shop/${product.slug}`}>
        <div className="product-card-info">
          <div className="product-card-category">{product.category?.name || 'Bijou'}</div>
          <div className="product-card-name">{product.name}</div>
          <div className="product-card-material">Acier inoxydable</div>
          {uniqueColors.length > 0 && (
            <div className="product-card-colors">
              {uniqueColors.map((color, i) => (
                <span key={i} className="color-chip" style={{ background: color.toLowerCase().includes('dor') ? '#C8A24A' : color.toLowerCase().includes('argent') ? '#C0C0C0' : color.toLowerCase().includes('rose') ? '#E8A0BF' : '#C8A24A' }} />
              ))}
            </div>
          )}
          <div className="product-card-price-row">
            <div className="product-card-price">
              €{product.price.toFixed(2)}
              {product.compareAtPrice && <span className="original">€{product.compareAtPrice.toFixed(2)}</span>}
            </div>
          </div>
          <div className="product-card-features">
            {product.waterproof && <span>💧 Waterproof</span>}
            {product.hypoallergenic && <span>✓ Hypoallergénique</span>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
