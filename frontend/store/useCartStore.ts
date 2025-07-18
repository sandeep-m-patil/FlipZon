import { create } from "zustand"
import axios from "axios"

interface Product {
  _id: string
  title: string
  description: string
  price: number
  image: string
}

interface CartItem {
  _id: string
  product: Product
  quantity: number
}

interface CartStore {
  cartItems: CartItem[]
  cartQuantity: number
  cartLength: number
  fetchCartItems: () => Promise<void>
  addToCart: (productId: string, quantity: number) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>
  getCartLength:()=>number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  cartQuantity: 0,
  cartLength: 0,

  fetchCartItems: async () => {
    try {
      const token = localStorage.getItem("authToken")
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      set({ cartItems: res.data.items })
    } catch (error) {
      console.error("Failed to fetch cart items", error)
    }
  },

  addToCart: async (productId, quantity) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("User not authenticated");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/cart/add", // Full URL if not using proxy
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ cartItems: res.data.items });

      console.log("Cart updated:", res.data.items);
    } catch (error) {
      console.error("Failed to fetch cart items", error)
    }
  },


  removeFromCart: async (productId) => {
    try {
      const token = localStorage.getItem("authToken")
      const res = await axios.post('http://localhost:5000/api/cart/remove', { productId },
        {
          headers: { Authorization: `Bearer ${token}` },

        })
      set({
        cartItems: get().cartItems.filter((item) => item.product._id !== productId),
      })
      console.table(res.data.items)
    } catch (error) {
      console.error("Failed to remove from cart", error)
    }
  },

  updateCartQuantity: async (productId, quantity) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      if (quantity < 1) {
        await get().removeFromCart(productId);
        return;
      }

      const res = await axios.put(
        "http://localhost:5000/api/cart/update",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedItem = res.data.items.find(
        (item: any) => item.product === productId
      );

      if (!updatedItem) throw new Error("Updated item not found in response");

      set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: updatedItem.quantity }
            : item
        ),
      }));
    } catch (error) {
      console.error("Failed to remove from cart", error)
    }
  },



  getCartLength: () => { 
    const {cartItems}=get()
    return cartItems.length;
   },

  getTotalPrice: () => {
    const { cartItems } = get()
    return cartItems.reduce((total, item) => total + Number(item.product.price) * Number(item.quantity), 0)
  }
}))
