import { useState } from 'react';
import { siteContent } from '../data/staticContent';

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item">
      <button className={`faq-question ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
        {question}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div className={`faq-answer ${open ? 'open' : ''}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  return (
    <>
      <div className="page-hero">
        <h1>FAQ</h1>
        <p>Questions fréquentes</p>
      </div>
      <section className="section">
        <div className="static-page" style={{ paddingTop: 0 }}>
          {siteContent.faq.map((item, i) => (
            <FAQItem key={i} question={item.q} answer={item.a} />
          ))}
        </div>
      </section>
    </>
  );
};

export default FAQ;
