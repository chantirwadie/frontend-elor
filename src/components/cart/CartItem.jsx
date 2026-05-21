import { Link } from 'react-router-dom';
import QuantitySelector from '../product/QuantitySelector';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const product = item.product;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={product?.images?.[0] || '/assets/images/gold-jewelry-hero.jpg'} alt={product?.name} />
      </div>
      <div className="cart-item-info">
        <Link to={`/shop/${product?.slug}`} className="cart-item-name">{product?.name || 'Produit'}</Link>
        <div className="cart-item-detail">Acier inoxydable</div>
        <div className="cart-item-price">€{(product?.price || 0).toFixed(2)}</div>
        {item.size && <div className="cart-item-detail">Taille: {item.size}</div>}
        <div className="cart-item-actions">
          <QuantitySelector quantity={item.quantity} onChange={(q) => onUpdateQuantity(item.id, q)} />
          <button onClick={() => onRemove(item.id)} className="cart-item-remove" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
