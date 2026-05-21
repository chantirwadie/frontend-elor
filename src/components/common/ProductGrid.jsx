import ProductCard from './ProductCard';
import Loading from './Loading';
import EmptyState from './EmptyState';

const ProductGrid = ({ products, loading, error }) => {
  if (loading) return <Loading />;
  if (error) return <EmptyState message={error} />;
  if (!products || products.length === 0) return <EmptyState message="Aucun produit trouvé" />;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
