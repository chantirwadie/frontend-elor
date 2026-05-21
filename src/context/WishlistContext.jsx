import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import axiosClient from '../api/axiosClient';

const WishlistContext = createContext(null);

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    if (!user) {
      const local = localStorage.getItem('elor_wishlist');
      setWishlist(local ? JSON.parse(local) : []);
      return;
    }
    try {
      const res = await axiosClient.get('/wishlist');
      setWishlist(res.data.map((item) => item.productId));
    } catch (err) {
      console.error('Wishlist fetch error:', err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const toggleWishlist = async (productId) => {
    if (!user) {
      let local = JSON.parse(localStorage.getItem('elor_wishlist') || '[]');
      if (local.includes(productId)) {
        local = local.filter((id) => id !== productId);
      } else {
        local.push(productId);
      }
      localStorage.setItem('elor_wishlist', JSON.stringify(local));
      setWishlist(local);
      return;
    }
    try {
      if (wishlist.includes(productId)) {
        await axiosClient.delete(`/wishlist/${productId}`);
        setWishlist((prev) => prev.filter((id) => id !== productId));
      } else {
        await axiosClient.post('/wishlist', { productId });
        setWishlist((prev) => [...prev, productId]);
      }
    } catch (err) {
      console.error('Wishlist toggle error:', err);
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
