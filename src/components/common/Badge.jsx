const Badge = ({ children, variant = 'new' }) => {
  const variantClass = variant === 'seller' ? 'badge-seller' : variant === 'sale' ? 'badge-sale' : 'badge-new';
  return <span className={`badge ${variantClass}`}>{children}</span>;
};

export default Badge;
