import { useState, useEffect } from 'react';
import { getProducts } from '../../api/productApi';
import ProductGrid from '../common/ProductGrid';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts({ isBestSeller: 'true', limit: 8 })
      .then((res) => setProducts(res.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="best-sellers">
      <div className="section-header">
        <span className="section-label">Best Sellers</span>
        <h2>Les Plus Aimés</h2>
        <p>Les bijoux préférés de nos clientes</p>
      </div>
      <div className="container">
        <ProductGrid products={products} loading={loading} />
      </div>
    </section>
  );
};

export default BestSellers;
