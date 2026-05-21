import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

const Cart = () => {
  const { cart, cartTotal, cartCount, updateQuantity, removeItem } = useCart();

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <h3>Votre panier est vide</h3>
          <p>Ajoutez vos bijoux préférés pour composer votre éclat.</p>
          <Link to="/shop" className="btn btn-primary">Découvrir nos bijoux</Link>
        </div>
      </div>
    );
  }

  const freeShippingThreshold = 60;
  const remaining = freeShippingThreshold - cartTotal;
  const progress = Math.min((cartTotal / freeShippingThreshold) * 100, 100);

  return (
    <div className="cart-page">
      <h1>Panier ({cartCount} article{cartCount > 1 ? 's' : ''})</h1>

      <div className="shipping-bar">
        <p className="shipping-bar-text">
          {remaining > 0
            ? <span>Plus que <strong>{remaining.toFixed(2)} €</strong> pour bénéficier de la livraison offerte</span>
            : <span><strong>Félicitations !</strong> Vous bénéficiez de la livraison offerte</span>
          }
        </p>
        <div className="shipping-progress">
          <div className="shipping-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="cart-layout">
        <div>
          {cart.items.map((item) => (
            <CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
          ))}
        </div>
        <CartSummary total={cartTotal} itemCount={cartCount} />
      </div>
    </div>
  );
};

export default Cart;
