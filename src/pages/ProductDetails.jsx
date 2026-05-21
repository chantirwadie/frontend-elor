import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug } from '../api/productApi';
import ProductImages from '../components/product/ProductImages';
import ProductInfo from '../components/product/ProductInfo';
import ProductReviews from '../components/product/ProductReviews';
import RelatedProducts from '../components/product/RelatedProducts';
import Loading from '../components/common/Loading';
import { addReview } from '../api/reviewApi';

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = () => {
    setLoading(true);
    getProductBySlug(slug)
      .then((res) => setProduct(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleAddReview = async (rating, comment) => {
    await addReview({ productId: product.id, rating, comment });
    fetchProduct();
  };

  if (loading) return <div className="product-details"><Loading /></div>;
  if (!product) return <div className="product-details"><p>Produit non trouvé</p></div>;

  return (
    <div className="product-details">
      <div className="breadcrumb">
        <Link to="/">Accueil</Link>
        <span>/</span>
        <Link to="/shop">Boutique</Link>
        {product.category && (
          <>
            <span>/</span>
            <Link to={`/category/${product.category.slug}`}>{product.category.name}</Link>
          </>
        )}
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="product-details-grid">
        <ProductImages images={product.images} />
        <ProductInfo product={product} />
      </div>

      <ProductReviews reviews={product.reviews} loading={false} onAddReview={handleAddReview} />
      <RelatedProducts categoryId={product.categoryId} currentProductId={product.id} />
    </div>
  );
};

export default ProductDetails;
