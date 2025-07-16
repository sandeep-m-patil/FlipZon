import { create } from 'zustand';
import axios from '@/lib/axios';

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>((set, get) => ({
  items: [],

  fetchCart: async () => {
    try {
      const res = await axios.get('/api/cart');
      set({ items: res.data.items });
    } catch (err) {
      set({ items: [] });
    }
  },

  addToCart: async (product) => {
    await axios.post('/api/cart/add', { productId: product._id });
    get().fetchCart();
  },

  removeFromCart: async (id) => {
    await axios.post('/api/cart/remove', { productId: id });
    get().fetchCart();
  },

  clearCart: async () => {
    await axios.post('/api/cart/clear');
    set({ items: [] });
  },
}));
