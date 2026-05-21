import { useState, useEffect } from 'react';
import { getProducts } from '../../api/productApi';
import ProductGrid from '../common/ProductGrid';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const bestSellerRes = await getProducts({ isBestSeller: 'true', limit: 8 });
        const bestSellerData = Array.isArray(bestSellerRes.data) ? bestSellerRes.data : bestSellerRes.data.products || [];

        if (bestSellerData.length) {
          setProducts(bestSellerData);
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
