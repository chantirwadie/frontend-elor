import { useState, useEffect } from 'react';
import { getProducts } from '../../api/productApi';
import ProductGrid from '../common/ProductGrid';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts({ isNewArrival: 'true', limit: 8 })
      .then((res) => setProducts(res.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section" style={{ background: 'var(--cream)' }}>
      <div className="section-header">
        <span className="section-label">Nouveautés</span>
        <h2>Les Dernières Créations</h2>
        <p>Des pièces fraîchement imaginées pour vous</p>
      </div>
      <div className="container">
        <ProductGrid products={products} loading={loading} />
      </div>
    </section>
  );
};

export default NewArrivals;
