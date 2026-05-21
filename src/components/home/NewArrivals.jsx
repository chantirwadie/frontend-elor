import { useState, useEffect } from 'react';
import { getProducts } from '../../api/productApi';
import ProductGrid from '../common/ProductGrid';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const newArrivalRes = await getProducts({ isNewArrival: 'true', limit: 8 });
        const newArrivalData = Array.isArray(newArrivalRes.data) ? newArrivalRes.data : newArrivalRes.data.products || [];

        if (newArrivalData.length) {
          setProducts(newArrivalData);
          return;
        }

        const fallbackRes = await getProducts({ limit: 4 });
        const fallbackData = Array.isArray(fallbackRes.data) ? fallbackRes.data : fallbackRes.data.products || [];
        setProducts(fallbackData.slice(0, 4));
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (!loading && products.length === 0) return null;

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
