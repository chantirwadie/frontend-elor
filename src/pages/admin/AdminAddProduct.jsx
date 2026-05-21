import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../api/productApi';
import ProductForm from '../../components/admin/ProductForm';

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await createProduct(data);
      navigate('/admin/products');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Ajouter un produit</h1>
      </div>
      <ProductForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default AdminAddProduct;
