import { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../api/categoryApi';
import CategoryForm from '../../components/admin/CategoryForm';
import Modal from '../../components/common/Modal';
import Loading from '../../components/common/Loading';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchCategories = () => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      if (editing?.id) {
        await updateCategory(editing.id, data);
      } else {
        await createCategory(data);
      }
      setModalOpen(false);
      setEditing(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette catégorie ?')) return;
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setModalOpen(true);
  };

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="admin-header">
        <h1>Catégories</h1>
        <button onClick={openCreate} className="btn btn-primary">+ Ajouter</button>
      </div>
      <table className="admin-table">
        <thead><tr><th>Nom</th><th>Slug</th><th>Produits</th><th>Actions</th></tr></thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>{cat.slug}</td>
              <td>{cat._count?.products || 0}</td>
              <td>
                <div className="admin-table-actions">
                  <button className="btn-edit" onClick={() => openEdit(cat)}>Modifier</button>
                  <button className="btn-delete" onClick={() => handleDelete(cat.id)}>Supprimer</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h3 style={{ marginBottom: 'var(--space-lg)' }}>{editing?.id ? 'Modifier' : 'Ajouter'} une catégorie</h3>
        <CategoryForm initialData={editing || {}} onSubmit={handleSubmit} loading={saving} />
      </Modal>
    </div>
  );
};

export default AdminCategories;
