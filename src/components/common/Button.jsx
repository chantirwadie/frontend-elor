const Button = ({ children, variant = 'primary', size = '', fullWidth, className = '', ...props }) => {
  const classes = [
    'btn',
    variant === 'outline' ? 'btn-outline' : variant === 'outline-light' ? 'btn-outline-light' : 'btn-primary',
    size ? `btn-${size}` : '',
    fullWidth ? 'btn-full' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
