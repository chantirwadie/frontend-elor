import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCollections } from '../../api/collectionApi';

const FeaturedCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getCollections().then((res) => setCollections(res.data.slice(0, 4))).catch(() => {});
  }, []);

  if (collections.length === 0) return null;

  const collectionData = [
    { subtitle: 'Sophistication à l\'état pur' },
    { subtitle: 'Des pièces qui traversent le temps' },
    { subtitle: 'L\'esprit de Paris, l\'élégance française' },
    { subtitle: 'Des créations qui brillent de mille feux' },
  ];

  return (
    <section className="featured-collections">
      <div className="section-header">
        <span className="section-label">Collections</span>
        <h2>Nos Univers</h2>
        <p>Des inspirations uniques pour chaque femme</p>
      </div>
      <div className="collections-grid">
        {collections.map((col, i) => (
          <Link
            to={`/collections/${col.slug}`}
            key={col.id}
            className={`collection-card ${i === 0 ? 'large' : ''}`}
            style={i === 0 ? { gridRow: 'span 2', aspectRatio: 'auto' } : { aspectRatio: '16/9' } }
          >
            <img src={col.bannerImage || col.image || '/assets/images/gold-jewelry-hero.jpg'} alt={col.name} loading="lazy" />
            <div className="collection-card-content">
              <span className="label">{col._count?.products || 0} Pièces</span>
              <h3>{col.name}</h3>
              <p>{collectionData[i]?.subtitle || 'Découvrez la collection'}</p>
              <span className="btn btn-outline-light btn-sm">Explorer</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollections;
