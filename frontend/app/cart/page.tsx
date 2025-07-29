"use client"

import { useEffect, useState } from "react"
import { useCartStore } from "@/store/useCartStore"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import PriceDisplay from "@/utils/PriceDisplay"
import { useRouter } from "next/navigation"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function CartPage() {
  const {
    cartItems,
    fetchCartItems,
    removeFromCart,
    updateCartQuantity,
    getTotalPrice,
  } = useCartStore()

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      await fetchCartItems()
      setLoading(false)
    }
    fetch()
  }, [])

  const handleIncrement = (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: string,
    quantity: number
  ) => {
    e.preventDefault();
    setUpdatingId(productId);
    updateCartQuantity(productId, quantity + 1);
    setUpdatingId(null);
  };

  const handleDecrement = (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: string,
    quantity: number
  ) => {
    e.preventDefault();
    if (quantity > 0) {
      setUpdatingId(productId);
      updateCartQuantity(productId, quantity - 1);
      setUpdatingId(null);
    }
  };

  const handlePayment = () => {
    const amount = getTotalPrice();

    const options = {
      key: "rzp_test_YourTestKeyHere", // Replace with your Razorpay Test Key
      amount: amount * 100, // Convert to paise
      currency: "INR",
      name: "FlipZon",
      description: "Test Transaction",
      image: "/logo.png", // optional: your brand logo
      handler: function (response: any) {
        alert("Payment Successful!")
        console.log(response);
      },
      prefill: {
        name: "Sandeep Patil",
        email: "testuser@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Test Corporate Office",
      },
      theme: {
        color: "#6366f1", // tailwind indigo-500
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const handleCheckout = () => {
    // You can pass data via query or use a global state/store
    router.push(`/checkout?amount=${getTotalPrice()}`);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-20 px-4 text-center text-muted-foreground">
        Loading your cart...
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto py-25 px-4 ">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 flex items-center justify-center text-center">
        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 md:w-10 md:h-10 mr-2" />
        Your Cart
      </h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-muted-foreground">Your cart is empty. </div>
      ) : (
        <>
          <div className="grid gap-4  ">
            {cartItems.map((item) => (
              <Card key={item._id} className="flex flex-col sm:flex-row items-center justify-between p-4">
                <div className="flex items-center justify-center gap-4 w-full sm:w-auto">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    width={120}
                    height={120}
                    className="rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.product.title}</h2>
                    <p className="text-sm text-muted-foreground">{item.product.description}</p>
                    <p className="text-base font-medium mt-1">
                      <PriceDisplay amount={item.product.price} />
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-4 mt-4 sm:mt-0">
                  <div className="flex items-center border rounded-md px-2 py-1">
                    <Button
                      variant="ghost"
                      onClick={(e) => handleDecrement(e, item.product._id, item.quantity)}
                      className="text-lg px-2"
                      disabled={updatingId === item._id}
                    >
                      -
                    </Button>
                    <span className="mx-2 font-medium">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      onClick={(e) => handleIncrement(e, item.product._id, item.quantity)}
                      className="text-lg px-2"
                      disabled={updatingId === item._id}
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    variant="destructive"
                    onClick={() => removeFromCart(item.product._id)}
                    disabled={updatingId === item.product._id}
                  >
                    <Trash2 className="h-4 w-4 mr-2 " />
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-white text-right space-y-4">
            <h2 className="text-xl font-semibold">Total: <PriceDisplay amount={getTotalPrice()} /></h2>
            <Button className="w-full sm:w-auto" onClick={handlePayment}>
              Order Now
            </Button>
            <Button className="w-full sm:w-auto" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
