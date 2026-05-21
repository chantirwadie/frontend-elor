import { useState } from 'react';
import { submitContact } from '../api/contactApi';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(form);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <span className="section-label">Contact</span>
        <h1>Nous sommes à votre écoute</h1>
        <p>Une question, une suggestion ? N'hésitez pas à nous écrire.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-card">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div>
              <h4>Email</h4>
              <p>bonjour@elorparis.fr</p>
              <p>Réponse sous 24h</p>
            </div>
          </div>

          <div className="contact-card">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </div>
            <div>
              <h4>Instagram</h4>
              <p>@elor_paris</p>
              <p>Suivez notre actualité</p>
            </div>
          </div>

          <div className="contact-card">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <h4>Paris</h4>
              <p>Île-de-France, France</p>
              <p>Bijouterie en ligne</p>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          {sent ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
              <h3>Message envoyé</h3>
              <p style={{ color: 'var(--muted)', margin: 'var(--space-md) 0' }}>Nous vous répondrons dans les plus brefs délais.</p>
              <button className="btn btn-outline" onClick={() => setSent(false)}>Envoyer un autre message</button>
            </div>
          ) : (
            <>
              <h3>Envoyez-nous un message</h3>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                  <div className="input-group">
                    <label>Nom *</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Votre nom" />
                  </div>
                  <div className="input-group">
                    <label>Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="votre@email.com" />
                  </div>
                </div>
                <div className="input-group">
                  <label>Sujet *</label>
                  <input name="subject" value={form.subject} onChange={handleChange} required placeholder="Sujet de votre message" />
                </div>
                <div className="input-group">
                  <label>Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Votre message..." />
                </div>
                <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                  {loading ? 'Envoi...' : 'Envoyer le message'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
