import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../api/productApi';
import Loading from '../../components/common/Loading';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    getProducts({ limit: 50 })
      .then((res) => setProducts(res.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="admin-header">
        <h1>Produits</h1>
        <Link to="/admin/products/new" className="btn btn-primary">+ Ajouter</Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Prix</th>
            <th>Stock</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                <img src={p.images?.[0] || ''} alt="" style={{ width: 50, height: 60, objectFit: 'cover', borderRadius: 4 }} />
              </td>
              <td>{p.name}</td>
              <td>€{p.price.toFixed(2)}</td>
              <td>{p.stock}</td>
              <td><span className={`badge ${p.isActive ? 'badge-new' : ''}`}>{p.isActive ? 'Actif' : 'Inactif'}</span></td>
              <td>
                <div className="admin-table-actions">
                  <Link to={`/admin/products/${p.id}/edit`} className="btn-edit" style={{ padding: '4px 12px', border: '1px solid var(--color-gold)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--tiny)', color: 'var(--color-gold-dark)' }}>Modifier</Link>
                  <button className="btn-delete" onClick={() => handleDelete(p.id)}>Supprimer</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
