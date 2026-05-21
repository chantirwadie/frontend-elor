const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <input className={error ? 'error-input' : ''} {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default Input;
