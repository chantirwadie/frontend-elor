const ProductFilters = ({ categories, collections, filters, onChange }) => {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value, page: 1 });
  };

  const clearFilters = () => {
    onChange({ page: 1, limit: 12, sort: 'newest' });
  };

  return (
    <div className="filters-sidebar">
      <div className="filters-section">
        <h4>Catégories</h4>
        {categories?.map((cat) => (
          <label key={cat.id}>
            <input
              type="checkbox"
              checked={filters.category === cat.slug}
              onChange={() => handleChange('category', filters.category === cat.slug ? '' : cat.slug)}
            />
            {cat.name} ({cat._count?.products || 0})
          </label>
        ))}
      </div>

      <div className="filters-section">
        <h4>Collections</h4>
        {collections?.map((col) => (
          <label key={col.id}>
            <input
              type="checkbox"
              checked={filters.collection === col.slug}
              onChange={() => handleChange('collection', filters.collection === col.slug ? '' : col.slug)}
            />
            {col.name}
          </label>
        ))}
      </div>

      <div className="filters-section">
        <h4>Prix</h4>
        <label>
          <input type="radio" name="price" checked={!filters.minPrice && !filters.maxPrice} onChange={() => { handleChange('minPrice', ''); handleChange('maxPrice', ''); }} />
          Tous les prix
        </label>
        <label><input type="radio" name="price" checked={filters.maxPrice === '25'} onChange={() => { handleChange('minPrice', '0'); handleChange('maxPrice', '25'); }} />Moins de 25€</label>
        <label><input type="radio" name="price" checked={filters.minPrice === '25' && filters.maxPrice === '50'} onChange={() => { handleChange('minPrice', '25'); handleChange('maxPrice', '50'); }} />25€ - 50€</label>
        <label><input type="radio" name="price" checked={filters.minPrice === '50' && filters.maxPrice === '80'} onChange={() => { handleChange('minPrice', '50'); handleChange('maxPrice', '80'); }} />50€ - 80€</label>
        <label><input type="radio" name="price" checked={filters.minPrice === '80'} onChange={() => { handleChange('minPrice', '80'); handleChange('maxPrice', ''); }} />80€ et plus</label>
      </div>

      <div className="filters-section">
        <h4>Couleur</h4>
        {['Doré', 'Argenté', 'Rose Gold'].map((c) => (
          <label key={c}>
            <input
              type="checkbox"
              checked={filters.color === c}
              onChange={() => handleChange('color', filters.color === c ? '' : c)}
            />
            {c}
          </label>
        ))}
      </div>

      <button onClick={clearFilters} className="btn btn-outline btn-sm" style={{ width: '100%' }}>
        Effacer les filtres
      </button>
    </div>
  );
};

export default ProductFilters;
