import { useState } from 'react';
import { subscribeNewsletter } from '../../api/contactApi';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await subscribeNewsletter({ email });
      setMessage('Merci pour votre inscription ! Vous recevrez nos nouveautés en avant-première.');
      setEmail('');
    } catch {
      setMessage('Cet email est déjà inscrit à notre newsletter.');
    }
  };

  return (
    <section className="newsletter">
      <h2>Recevez les nouveautés en avant-première</h2>
      <p className="subtitle">
        Inscrivez-vous à notre newsletter pour découvrir nos nouvelles collections, offres exclusives et inspirations parisiennes.
      </p>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
      {message && <p className="newsletter-disclaimer">{message}</p>}
      <p className="newsletter-disclaimer">En vous inscrivant, vous acceptez de recevoir nos communications. Désinscription à tout moment.</p>
    </section>
  );
};

export default Newsletter;
