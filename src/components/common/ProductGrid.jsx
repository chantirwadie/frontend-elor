import ProductCard from './ProductCard';
import Loading from './Loading';
import EmptyState from './EmptyState';

const ProductGrid = ({
  products,
  loading,
  error,
  emptyMessage = 'Aucun produit trouvé',
  emptyAction = null,
  showEmpty = true,
}) => {
  if (loading) return <Loading />;
  if (error) return <EmptyState message={error} />;
  if (!products || products.length === 0) {
    if (!showEmpty) return null;
    return (
      <div className="product-grid-empty">
        <EmptyState message={emptyMessage} />
        {emptyAction}
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
