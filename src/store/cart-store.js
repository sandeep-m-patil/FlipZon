// stores/cart-store.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      addItem: (item) => set((state) => {
        const existingItem = state.cartItems.find(i => i.id === item.id);
        if (existingItem) {
          return {
            cartItems: state.cartItems.map(i => 
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          };
        }
        return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
      }),
      removeItem: (id) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== id)
      })),
      incrementQuantity: (id) => set((state) => ({
        cartItems: state.cartItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      })),
      decrementQuantity: (id) => set((state) => ({
        cartItems: state.cartItems.map(item => 
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        )
      }))
    }),
    {
      name: 'cart-storage',
    }
  )
); 