import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProducts, updateProduct } from '../../api/productApi';
import ProductForm from '../../components/admin/ProductForm';
import Loading from '../../components/common/Loading';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProducts({ limit: 200 })
      .then((res) => {
        const data = res.data;
        const productsList = Array.isArray(data) ? data : data.products || [];
        const found = productsList.find((p) => p.id === id);
        if (found) setProduct(found);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      await updateProduct(id, data);
      navigate('/admin/products');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;
  if (!product) return <p>Produit non trouvé</p>;

  return (
    <div>
      <div className="admin-header">
        <h1>Modifier : {product.name}</h1>
      </div>
      <ProductForm initialData={product} onSubmit={handleSubmit} loading={saving} />
    </div>
  );
};

export default AdminEditProduct;
