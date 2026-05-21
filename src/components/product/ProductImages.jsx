import { useState } from 'react';

const ProductImages = ({ images = [] }) => {
  const [selected, setSelected] = useState(0);

  const displayImages = images.length > 0
    ? images
    : ['/assets/images/gold-jewelry-hero.jpg'];

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
