const Select = ({ label, error, options = [], className = '', ...props }) => {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <select className={error ? 'error-input' : ''} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default Select;
