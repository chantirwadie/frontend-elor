import { Link } from 'react-router-dom';
import Button from './Button';

const EmptyState = ({ message = 'Aucun contenu', showButton = true, buttonText = 'Voir la boutique', buttonLink = '/shop' }) => {
  return (
    <div className="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
      <h3>{message}</h3>
      {showButton && (
        <Link to={buttonLink}>
          <Button>{buttonText}</Button>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
