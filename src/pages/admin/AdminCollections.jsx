import { useState, useEffect } from 'react';
import { getCollections, createCollection, updateCollection, deleteCollection } from '../../api/collectionApi';
import CollectionForm from '../../components/admin/CollectionForm';
import Modal from '../../components/common/Modal';
import Loading from '../../components/common/Loading';

const AdminCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchCollections = () => {
    getCollections()
      .then((res) => setCollections(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCollections(); }, []);

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      if (editing?.id) {
        await updateCollection(editing.id, data);
      } else {
        await createCollection(data);
      }
      setModalOpen(false);
      setEditing(null);
      fetchCollections();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette collection ?')) return;
    try {
      await deleteCollection(id);
      fetchCollections();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="admin-header">
        <h1>Collections</h1>
        <button onClick={() => { setEditing(null); setModalOpen(true); }} className="btn btn-primary">+ Ajouter</button>
      </div>
      <table className="admin-table">
        <thead><tr><th>Nom</th><th>Slug</th><th>Produits</th><th>Actions</th></tr></thead>
        <tbody>
          {collections.map((col) => (
            <tr key={col.id}>
              <td>{col.name}</td>
              <td>{col.slug}</td>
              <td>{col._count?.products || 0}</td>
              <td>
                <div className="admin-table-actions">
                  <button className="btn-edit" onClick={() => { setEditing(col); setModalOpen(true); }}>Modifier</button>
                  <button className="btn-delete" onClick={() => handleDelete(col.id)}>Supprimer</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h3 style={{ marginBottom: 'var(--space-lg)' }}>{editing?.id ? 'Modifier' : 'Ajouter'} une collection</h3>
        <CollectionForm initialData={editing || {}} onSubmit={handleSubmit} loading={saving} />
      </Modal>
    </div>
  );
};

export default AdminCollections;
