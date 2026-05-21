import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCollectionBySlug } from '../api/collectionApi';
import { getProducts } from '../api/productApi';
import ProductGrid from '../components/common/ProductGrid';
import Loading from '../components/common/Loading';

const CollectionDetails = () => {
  const { slug } = useParams();
  const [collection, setCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getCollectionBySlug(slug),
      getProducts({ collection: slug, limit: 50 }),
    ])
      .then(([colRes, prodRes]) => {
        setCollection(colRes.data);
        setProducts(prodRes.data.products);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="page-hero"><Loading /></div>;
  if (!collection) return <div className="page-hero"><p>Collection non trouvée</p></div>;

  return (
    <>
      <div className="page-hero" style={{ background: `linear-gradient(135deg, var(--color-cream), var(--color-champagne))` }}>
        <h1>{collection.name}</h1>
        <p>{collection.description}</p>
      </div>
      <section className="section">
        <div className="container">
          <ProductGrid products={products} loading={false} />
        </div>
      </section>
    </>
  );
};

export default CollectionDetails;
