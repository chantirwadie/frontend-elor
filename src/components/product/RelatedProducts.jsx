import { useState, useEffect } from 'react';
import { getProducts } from '../../api/productApi';
import ProductGrid from '../common/ProductGrid';

const RelatedProducts = ({ categoryId, currentProductId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) { setLoading(false); return; }
    getProducts({ category: categoryId, limit: 4 })
      .then((res) => setProducts(res.data.products.filter((p) => p.id !== currentProductId).slice(0, 4)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [categoryId, currentProductId]);

  if (!loading && products.length === 0) return null;

  return (
    <div style={{ marginTop: 'var(--space-3xl)' }}>
      <h3 style={{ marginBottom: 'var(--space-lg)' }}>Vous aimerez aussi</h3>
      <ProductGrid products={products} loading={loading} />
    </div>
  );
};

export default RelatedProducts;
