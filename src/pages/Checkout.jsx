import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../api/orderApi';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    shippingAddress: user?.address || '',
    shippingCity: user?.city || '',
    shippingZipCode: user?.zipCode || '',
    shippingCountry: user?.country || 'France',
    phone: user?.phone || '',
    paymentMethod: 'Carte bancaire',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.shippingAddress.trim()) errs.shippingAddress = 'Adresse requise';
    if (!form.shippingCity.trim()) errs.shippingCity = 'Ville requise';
    if (!form.shippingZipCode.trim()) errs.shippingZipCode = 'Code postal requis';
    if (!form.phone.trim()) errs.phone = 'Téléphone requis';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await createOrder(form);
      clearCart();
      navigate('/account/orders');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!cart.items || cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <h1 style={{ marginBottom: 'var(--space-xl)' }}>Commande</h1>

      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-section">
            <h3><span className="step-number">1</span> Informations de livraison</h3>
            <div className="checkout-grid">
              <div className="input-group">
                <label>Adresse *</label>
                <input name="shippingAddress" value={form.shippingAddress} onChange={handleChange} placeholder="123 rue de Rivoli" className={errors.shippingAddress ? 'error-input' : ''} />
                {errors.shippingAddress && <span className="error">{errors.shippingAddress}</span>}
              </div>
              <div className="input-group">
                <label>Ville *</label>
                <input name="shippingCity" value={form.shippingCity} onChange={handleChange} placeholder="Paris" className={errors.shippingCity ? 'error-input' : ''} />
                {errors.shippingCity && <span className="error">{errors.shippingCity}</span>}
              </div>
              <div className="input-group">
                <label>Code postal *</label>
                <input name="shippingZipCode" value={form.shippingZipCode} onChange={handleChange} placeholder="75001" className={errors.shippingZipCode ? 'error-input' : ''} />
                {errors.shippingZipCode && <span className="error">{errors.shippingZipCode}</span>}
              </div>
              <div className="input-group">
                <label>Pays</label>
                <input name="shippingCountry" value={form.shippingCountry} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Téléphone *</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+33 6 12 34 56 78" className={errors.phone ? 'error-input' : ''} />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>
              <div className="input-group">
                <label>Mode de paiement</label>
                <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                  <option value="Carte bancaire">Carte bancaire</option>
                  <option value="PayPal">PayPal</option>
                </select>
              </div>
            </div>
          </div>

          <div className="checkout-section">
            <h3><span className="step-number">2</span> Notes (optionnel)</h3>
            <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Instructions particulières..." style={{ width: '100%', padding: '14px 18px', border: '1px solid var(--border)', minHeight: 100, resize: 'vertical', outline: 'none' }} />
          </div>

          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
            {loading ? 'Traitement en cours...' : 'Confirmer la commande'}
          </button>
        </form>

        <div className="checkout-summary">
          <h3>Récapitulatif</h3>
          {cart.items.map((item) => (
            <div key={item.id} className="checkout-summary-item">
              <img src={item.product?.images?.[0] || ''} alt={item.product?.name} />
              <div className="checkout-summary-item-info">
                <h4>{item.product?.name}</h4>
                <p>Qté: {item.quantity} — €{(item.product?.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className="checkout-summary-totals">
            <div className="cart-summary-row">
              <span>Sous-total</span>
              <span>€{cartTotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Livraison</span>
              <span>{cartTotal >= 50 ? 'Offerte' : '4.90 €'}</span>
            </div>
            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>€{(cartTotal + (cartTotal >= 50 ? 0 : 4.90)).toFixed(2)}</span>
            </div>
          </div>
          <div className="secure-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Paiement 100% sécurisé
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
