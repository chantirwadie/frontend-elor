import { useState } from 'react';

const ProductImages = ({ images = [] }) => {
  const [selected, setSelected] = useState(0);

  const displayImages = images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1515562141589-9f6b9dc5e7b0?w=600'];

  return (
    <div className="product-images">
      <div className="product-main-image">
        <img src={displayImages[selected]} alt="Product" />
      </div>
      {displayImages.length > 1 && (
        <div className="product-thumbnails">
          {displayImages.map((img, i) => (
            <button key={i} className={i === selected ? 'active' : ''} onClick={() => setSelected(i)}>
              <img src={img} alt={`View ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;
