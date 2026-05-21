import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../api/productApi';
import { getCategories } from '../api/categoryApi';
import { getCollections } from '../api/collectionApi';
import ProductGrid from '../components/common/ProductGrid';
import ProductFilters from '../components/common/ProductFilters';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filters = {
    page: parseInt(searchParams.get('page')) || 1,
    limit: 12,
    sort: searchParams.get('sort') || 'newest',
    category: searchParams.get('category') || '',
    collection: searchParams.get('collection') || '',
    search: searchParams.get('search') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    color: searchParams.get('color') || '',
    isBestSeller: searchParams.get('isBestSeller') || '',
    isNewArrival: searchParams.get('isNewArrival') || '',
  };

  const updateFilters = (newFilters) => {
    const params = {};
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && key !== 'limit') params[key] = value;
    });
    setSearchParams(params);
  };

  useEffect(() => {
    setLoading(true);
    setError('');
    const params = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params[key] = value;
    });

    Promise.all([
      getProducts(params),
      getCategories(),
      getCollections(),
    ])
      .then(([prodRes, catRes, colRes]) => {
        const data = prodRes.data;
        setProducts(Array.isArray(data) ? data : data.products || []);
        setTotalPages(data.totalPages || 1);
        setCategories(Array.isArray(catRes.data) ? catRes.data : []);
        setCollections(Array.isArray(colRes.data) ? colRes.data : []);
      })
      .catch((err) => {
        console.error('Erreur chargement boutique:', err);
        setError('Impossible de charger les produits. Veuillez réessayer.');
      })
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>La Boutique</h1>
        <p className="subtitle">Des essentiels lumineux pour composer votre éclat.</p>
      </div>

      <div className="shop-toolbar">
        <div className="shop-toolbar-left">
          <button className="filter-toggle" onClick={() => setMobileFiltersOpen(true)}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/>
            </svg>
            Filtres
          </button>
          <span className="result-count">{products.length} produits</span>
        </div>
        <div>
          <select value={filters.sort} onChange={(e) => updateFilters({ ...filters, sort: e.target.value })}>
            <option value="newest">Plus récents</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="best-sellers">Meilleures ventes</option>
          </select>
        </div>
      </div>

      <div className="shop-filters">
        <div className="search-input">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Rechercher..."
            value={filters.search}
            onChange={(e) => updateFilters({ ...filters, search: e.target.value, page: 1 })}
          />
        </div>
        <ProductFilters categories={categories} collections={collections} filters={filters} onChange={updateFilters} />
      </div>

      <div>
        <ProductGrid products={products} loading={loading} error={error} />

        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} className={p === filters.page ? 'active' : ''} onClick={() => updateFilters({ ...filters, page: p })}>
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer */}
      <div className={`mobile-filter-overlay ${mobileFiltersOpen ? 'open' : ''}`} onClick={() => setMobileFiltersOpen(false)} />
      <div className={`mobile-filter-drawer ${mobileFiltersOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}>Filtres</h4>
          <button onClick={() => setMobileFiltersOpen(false)} style={{ fontSize: 'var(--small)', color: 'var(--muted)' }}>Fermer</button>
        </div>
        <ProductFilters categories={categories} collections={collections} filters={filters} onChange={(f) => { updateFilters(f); setMobileFiltersOpen(false); }} />
      </div>
    </div>
  );
};

export default Shop;
