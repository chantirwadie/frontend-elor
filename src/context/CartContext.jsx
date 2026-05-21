import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import axiosClient from '../api/axiosClient';

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) {
      const localCart = localStorage.getItem('elor_cart');
      if (localCart) {
        try { setCart(JSON.parse(localCart)); } catch { setCart({ items: [] }); }
      }
      return;
    }
    try {
      setLoading(true);
      const res = await axiosClient.get('/cart');
      setCart(res.data);
    } catch (err) {
      console.error('Cart fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity = 1, size = null, productData = null) => {
    if (!user) {
      const localCart = JSON.parse(localStorage.getItem('elor_cart') || '{"items":[]}');
      const existing = localCart.items.find((i) => i.productId === productId && i.size === size);
      if (existing) {
        existing.quantity += quantity;
        if (productData) existing.product = productData;
      } else {
        localCart.items.push({
          id: Date.now().toString(),
          productId,
          quantity,
          size,
          product: productData || { id: productId },
        });
      }
      localStorage.setItem('elor_cart', JSON.stringify(localCart));
      setCart({ ...localCart });
      return;
    }
    try {
      const res = await axiosClient.post('/cart', { productId, quantity, size });
      setCart(res.data);
    } catch (err) {
      console.error('Add to cart error:', err);
    }
  };

  const addItem = (product, quantity = 1, size = null) => {
    if (!product?.id) return;
    return addToCart(product.id, quantity, size, product);
  };

  const updateQuantity = async (itemId, quantity) => {
    if (!user) {
      const localCart = JSON.parse(localStorage.getItem('elor_cart') || '{"items":[]}');
      localCart.items = localCart.items.map((i) =>
        i.id === itemId ? { ...i, quantity } : i
      ).filter((i) => i.quantity > 0);
      localStorage.setItem('elor_cart', JSON.stringify(localCart));
      setCart({ ...localCart });
      return;
    }
    try {
      const res = await axiosClient.put(`/cart/${itemId}`, { quantity });
      setCart(res.data);
    } catch (err) {
      console.error('Update cart error:', err);
    }
  };

  const removeItem = async (itemId) => {
    if (!user) {
      const localCart = JSON.parse(localStorage.getItem('elor_cart') || '{"items":[]}');
      localCart.items = localCart.items.filter((i) => i.id !== itemId);
      localStorage.setItem('elor_cart', JSON.stringify(localCart));
      setCart({ ...localCart });
      return;
    }
    try {
      const res = await axiosClient.delete(`/cart/${itemId}`);
      setCart(res.data);
    } catch (err) {
      console.error('Remove cart error:', err);
    }
  };

  const clearCart = () => {
    if (!user) {
      localStorage.removeItem('elor_cart');
      setCart({ items: [] });
    }
  };

  const cartCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const cartTotal = cart.items?.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, loading, cartCount, cartTotal, addToCart, addItem, updateQuantity, removeItem, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
