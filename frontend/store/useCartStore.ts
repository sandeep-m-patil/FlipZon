import { create } from 'zustand'
import axios from 'axios'
import { CartItem } from '@/types/index'

interface CartStore {
  cartItems: CartItem[]
  isLoading: boolean
  error: string | null
  fetchCartItems: () => Promise<void>
  addToCart: (productId: string, quantity: number) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  isLoading: false,
  error: null,

  fetchCartItems: async () => {
    set({ isLoading: true, error: null })
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
      const res = await axios.get('http://localhost:5000/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (Array.isArray(res.data.items)) {
        set({ cartItems: res.data.items })
        console.table(res.data.items)

      }
    } catch (err: any) {
      console.error('Error fetching cart:', err)
      set({ error: 'Failed to load cart' })
    } finally {
      set({ isLoading: false })
    }
  },

  addToCart: async (productId, quantity) => {
    set({ isLoading: true, error: null })
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
      const res = await axios.post(
        'http://localhost:5000/api/cart/add',
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (Array.isArray(res.data.items)) {
        set({ cartItems: res.data.items })
      }
    } catch (err: any) {
      console.error('Add to cart error:', err)
      set({ error: 'Failed to add item to cart' })
    } finally {
      set({ isLoading: false })
    }
  },

  removeFromCart: async (productId) => {
    set({ isLoading: true, error: null })
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
      const res = await axios.delete('http://localhost:5000/api/cart/remove', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId },
      })

      if (Array.isArray(res.data.items)) {
        set({ cartItems: res.data.items })
      }
    } catch (err: any) {
      console.error('Remove from cart error:', err)
      set({ error: 'Failed to remove item from cart' })
    } finally {
      set({ isLoading: false })
    }
  },

  updateQuantity: async (productId, quantity) => {
   set({ isLoading: true, error: null })
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
      const res = await axios.post(
        'http://localhost:5000/api/cart/update',
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (Array.isArray(res.data.items)) {
        set({ cartItems: res.data.items })
      }
    } catch (err: any) {
      console.error('Update to cart error:', err)
      set({ error: 'Failed to Update item' })
    } finally {
      set({ isLoading: false })
    }
  },

  getTotalPrice: () => {
    const { cartItems } = get()
    return cartItems.reduce((total, item) => total + Number(item.product.price) * Number(item.quantity), 0)
  },
}))
