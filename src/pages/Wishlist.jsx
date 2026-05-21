import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/productApi';
import { useWishlist } from '../context/WishlistContext';
import ProductGrid from '../components/common/ProductGrid';

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wishlist.length === 0) {
      setLoading(false);
      setProducts([]);
      return;
    }
    getProducts({ limit: 50 })
      .then((res) => {
        const filtered = res.data.products.filter((p) => wishlist.includes(p.id));
        setProducts(filtered);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [wishlist]);

  if (!loading && products.length === 0) {
    return (
      <div style={{ paddingTop: 'calc(var(--announcement-height) + var(--navbar-height) + 40px)' }}>
        <div className="empty-state" style={{ padding: 'var(--space-5xl) var(--space-lg)' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <h3>Votre wishlist est vide</h3>
          <p>Ajoutez vos coups de cœur pour les retrouver plus tard.</p>
          <Link to="/shop" className="btn btn-primary">Découvrir nos bijoux</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 'calc(var(--announcement-height) + var(--navbar-height) + 40px)' }}>
      <div className="section-header" style={{ paddingTop: 'var(--space-2xl)' }}>
        <span className="section-label">Favoris</span>
        <h2>Mes Favoris</h2>
        <p>Vos bijoux préférés, réunis dans une liste</p>
      </div>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <ProductGrid products={products} loading={loading} />
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
