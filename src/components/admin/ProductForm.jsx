import { useState, useEffect } from 'react';
import { getCategories } from '../../api/categoryApi';
import { getCollections } from '../../api/collectionApi';

const ProductForm = ({ initialData = {}, onSubmit, loading }) => {
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [form, setForm] = useState({
    name: '', description: '', shortDescription: '', price: '',
    compareAtPrice: '', images: '', material: 'Acier inoxydable',
    color: 'Doré', sizes: '', stock: '50',
    isFeatured: false, isBestSeller: false, isNewArrival: false,
    waterproof: true, hypoallergenic: true,
    categoryId: '', collectionId: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data)).catch(() => {});
    getCollections().then((res) => setCollections(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!initialData?.id) return;
    setForm({
      name: initialData.name || '',
      description: initialData.description || '',
      shortDescription: initialData.shortDescription || '',
      price: initialData.price || '',
      compareAtPrice: initialData.compareAtPrice || '',
      images: initialData.images?.join(', ') || '',
      material: initialData.material || 'Acier inoxydable',
      color: initialData.color || 'Doré',
      sizes: initialData.sizes?.join(', ') || '',
      stock: initialData.stock || '50',
      isFeatured: initialData.isFeatured || false,
      isBestSeller: initialData.isBestSeller || false,
      isNewArrival: initialData.isNewArrival || false,
      waterproof: initialData.waterproof ?? true,
      hypoallergenic: initialData.hypoallergenic ?? true,
      categoryId: initialData.categoryId || '',
      collectionId: initialData.collectionId || '',
    });
  }, [initialData?.id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) { setError('Le nom du produit est requis.'); return; }
    if (!form.price || isNaN(parseFloat(form.price))) { setError('Veuillez entrer un prix valide.'); return; }
    const data = {
      ...form,
      price: parseFloat(form.price),
      compareAtPrice: form.compareAtPrice ? parseFloat(form.compareAtPrice) : null,
      stock: parseInt(form.stock) || 0,
      categoryId: form.categoryId ? Number(form.categoryId) : null,
      collectionId: form.collectionId ? Number(form.collectionId) : null,
      images: form.images.split(',').map((s) => s.trim()).filter(Boolean),
      sizes: form.sizes.split(',').map((s) => s.trim()).filter(Boolean),
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      {error && <p style={{ color: '#D32F2F', fontSize: 'var(--small)', textAlign: 'center', marginBottom: 'var(--space-md)', padding: 'var(--space-sm)', background: '#FFEBEE', borderRadius: 'var(--radius-sm)' }}>{error}</p>}
      <div className="form-grid">
        <div className="input-group">
          <label>Nom du produit *</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Prix (€) *</label>
          <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Prix barré (€)</label>
          <input name="compareAtPrice" type="number" step="0.01" value={form.compareAtPrice} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Stock *</label>
          <input name="stock" type="number" value={form.stock} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Couleur</label>
          <select name="color" value={form.color} onChange={handleChange}>
            <option value="Doré">Doré</option>
            <option value="Argenté">Argenté</option>
            <option value="Rose Gold">Rose Gold</option>
          </select>
        </div>
        <div className="input-group">
          <label>Catégorie</label>
          <select name="categoryId" value={form.categoryId} onChange={handleChange}>
            <option value="">Sélectionner</option>
            {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </div>
        <div className="input-group">
          <label>Collection</label>
          <select name="collectionId" value={form.collectionId} onChange={handleChange}>
            <option value="">Sélectionner</option>
            {collections.map((col) => <option key={col.id} value={col.id}>{col.name}</option>)}
          </select>
        </div>
        <div className="input-group">
          <label>Tailles (séparées par des virgules)</label>
          <input name="sizes" value={form.sizes} onChange={handleChange} placeholder="52, 54, 56" />
        </div>
      </div>

      <div className="input-group">
        <label>URLs des images (séparées par des virgules)</label>
        <input name="images" value={form.images} onChange={handleChange} placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" />
      </div>

      <div className="input-group">
        <label>Courte description</label>
        <input name="shortDescription" value={form.shortDescription} onChange={handleChange} />
      </div>

      <div className="input-group">
        <label>Description *</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-lg)', margin: 'var(--space-md) 0', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', cursor: 'pointer' }}>
          <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
          À la une
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', cursor: 'pointer' }}>
          <input type="checkbox" name="isBestSeller" checked={form.isBestSeller} onChange={handleChange} />
          Meilleure vente
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', cursor: 'pointer' }}>
          <input type="checkbox" name="isNewArrival" checked={form.isNewArrival} onChange={handleChange} />
          Nouveauté
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', cursor: 'pointer' }}>
          <input type="checkbox" name="waterproof" checked={form.waterproof} onChange={handleChange} />
          Waterproof
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', cursor: 'pointer' }}>
          <input type="checkbox" name="hypoallergenic" checked={form.hypoallergenic} onChange={handleChange} />
          Hypoallergénique
        </label>
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: 'var(--space-lg)' }}>
        {loading ? 'Enregistrement...' : initialData?.id ? 'Mettre à jour' : 'Créer le produit'}
      </button>
    </form>
  );
};

export default ProductForm;
