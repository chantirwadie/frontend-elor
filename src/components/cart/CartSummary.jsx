import { Link } from 'react-router-dom';

const CartSummary = ({ total, itemCount }) => {
  const shipping = total >= 60 ? 0 : 4.90;

  return (
    <div className="cart-summary">
      <h3>Récapitulatif</h3>
      <div className="cart-summary-row">
        <span>Sous-total ({itemCount} article{itemCount !== 1 ? 's' : ''})</span>
        <span>€{total.toFixed(2)}</span>
      </div>
      <div className="cart-summary-row">
        <span>Livraison</span>
        <span>{shipping === 0 ? 'Offerte' : `€${shipping.toFixed(2)}`}</span>
      </div>
      <div className="cart-summary-row cart-summary-total">
        <span>Total</span>
        <span>€{(total + shipping).toFixed(2)}</span>
      </div>
      <Link to="/checkout" className="btn btn-primary btn-full">
        Commander
      </Link>
      <div className="trust-badges-mini">
        <span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Paiement sécurisé
        </span>
        <span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Retour facile
        </span>
        <span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Livraison offerte
        </span>
      </div>
    </div>
  );
};

export default CartSummary;
