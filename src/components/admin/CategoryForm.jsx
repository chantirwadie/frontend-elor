import { useState, useEffect } from 'react';

const CategoryForm = ({ initialData = {}, onSubmit, loading }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setDescription(initialData.description || '');
      setImage(initialData.image || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, image });
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form" style={{ maxWidth: 500 }}>
      <div className="input-group">
        <label>Nom *</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="input-group">
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="input-group">
        <label>URL de l'image</label>
        <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Enregistrement...' : initialData.id ? 'Mettre à jour' : 'Créer'}
      </button>
    </form>
  );
};

export default CategoryForm;
