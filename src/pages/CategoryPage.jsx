import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../api/productApi';
import ProductGrid from '../components/common/ProductGrid';

const CategoryPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts({ category: slug, limit: 50 })
      .then((res) => setProducts(res.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const categoryNames = {
    colliers: 'Colliers', bagues: 'Bagues', bracelets: 'Bracelets',
    'boucles-d-oreilles': "Boucles d'oreilles", parures: 'Parures',
    piercings: 'Piercings',
  };

  return (
    <>
      <div className="page-hero">
        <h1>{categoryNames[slug] || slug}</h1>
      </div>
      <section className="section">
        <div className="container">
          <ProductGrid products={products} loading={loading} />
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
