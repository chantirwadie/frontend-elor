const ProductFilters = ({ categories, collections, filters, onChange }) => {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value, page: 1 });
  };

  const handleRangeChange = (minPrice, maxPrice) => {
    onChange({ ...filters, minPrice, maxPrice, page: 1 });
  };

  const clearFilters = () => {
    onChange({ page: 1, limit: 12, sort: filters.sort || 'newest' });
  };

  const activeFilters = [
    filters.category && {
      key: 'category',
      label: categories?.find((cat) => cat.slug === filters.category)?.name || filters.category,
    },
    filters.collection && {
      key: 'collection',
      label: collections?.find((col) => col.slug === filters.collection)?.name || filters.collection,
    },
    filters.search && { key: 'search', label: `"${filters.search}"` },
    filters.color && { key: 'color', label: filters.color },
    (filters.minPrice || filters.maxPrice) && {
      key: 'price',
      label: filters.minPrice && filters.maxPrice
        ? `${filters.minPrice}€ - ${filters.maxPrice}€`
        : filters.minPrice
          ? `${filters.minPrice}€ et plus`
          : `Moins de ${filters.maxPrice}€`,
    },
    filters.isBestSeller && { key: 'isBestSeller', label: 'Best sellers' },
    filters.isNewArrival && { key: 'isNewArrival', label: 'Nouveautés' },
  ].filter(Boolean);

  const removeFilter = (key) => {
    if (key === 'price') {
      handleRangeChange('', '');
      return;
    }
    handleChange(key, '');
  };

  return (
    <div className="filters-sidebar">
      {activeFilters.length > 0 && (
        <div className="active-filters">
          <div className="active-filters-heading">Filtres actifs</div>
          <div className="active-filter-chips">
            {activeFilters.map((filter) => (
              <button key={filter.key} type="button" className="filter-chip" onClick={() => removeFilter(filter.key)}>
                {filter.label}
                <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
          <button type="button" onClick={clearFilters} className="clear-inline">
            Tout effacer
          </button>
        </div>
      )}

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
          <input type="radio" name="price" checked={!filters.minPrice && !filters.maxPrice} onChange={() => handleRangeChange('', '')} />
          Tous les prix
        </label>
        <label><input type="radio" name="price" checked={filters.maxPrice === '25'} onChange={() => handleRangeChange('0', '25')} />Moins de 25€</label>
        <label><input type="radio" name="price" checked={filters.minPrice === '25' && filters.maxPrice === '50'} onChange={() => handleRangeChange('25', '50')} />25€ - 50€</label>
        <label><input type="radio" name="price" checked={filters.minPrice === '50' && filters.maxPrice === '80'} onChange={() => handleRangeChange('50', '80')} />50€ - 80€</label>
        <label><input type="radio" name="price" checked={filters.minPrice === '80'} onChange={() => handleRangeChange('80', '')} />80€ et plus</label>
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

      <button type="button" onClick={clearFilters} className="filters-clear-btn">
        Effacer les filtres
      </button>
    </div>
  );
};

export default ProductFilters;
