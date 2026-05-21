import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCollections } from '../api/collectionApi';
import Loading from '../components/common/Loading';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollections()
      .then((res) => setCollections(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="contact-page"><Loading /></div>;

  return (
    <>
      <section className="about-hero">
        <span className="section-label">Univers</span>
        <h1>Nos Collections</h1>
        <p>Des univers d'élégance inspirés par Paris</p>
      </section>
      <section className="featured-collections" style={{ background: 'var(--ivory)' }}>
        <div className="collections-grid">
          {collections.map((col, i) => (
            <Link
              to={`/collections/${col.slug}`}
              key={col.id}
              className={`collection-card ${i === 0 ? 'large' : ''}`}
              style={i === 0 ? { gridRow: 'span 2', aspectRatio: 'auto', minHeight: 400 } : { aspectRatio: '16/9' } }
            >
              <img src={col.bannerImage || col.image || '/assets/images/gold-jewelry-hero.jpg'} alt={col.name} loading="lazy" />
              <div className="collection-card-content">
                <span className="label">{col._count?.products || 0} pièces</span>
                <h3>{col.name}</h3>
                <p>Découvrez l'univers {col.name}</p>
                <span className="btn btn-outline-light btn-sm">Explorer</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Collections;
