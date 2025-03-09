'use client';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import { ShoppingCart } from 'lucide-react';

export default function Cart() {
  const { cartItems, removeItem, incrementQuantity, decrementQuantity } = useCartStore();

  return (
<div class="flex flex-col items-center justify-center ">
<div className="fixed top-20  bg-background rounded-lg shadow-lg p-6 sm:w-150 d-flex max-h-[90vh] flex flex-col border">
      {/* Cart Header */}
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <span className="ml-auto bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm">
          {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {cartItems.length === 0 ? (
          <div className="text-center text-muted-foreground py-8 font-semibold">
            Your cart is empty
          </div>
        ) : (
          cartItems.map((item) => (
            <div 
              key={item.id}
              className="border rounded-lg p-4 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => decrementQuantity(item.id)}
                      disabled={item.quantity === 1}
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => incrementQuantity(item.id)}
                      className="h-8 w-8 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)} each
                  </p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="mt-2  h-8 "
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cart Footer */}
      {cartItems.length > 0 && (
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-lg">Total:</span>
            <span className="font-bold text-lg">
              $
              {cartItems
                .reduce((sum, item) => sum + (item.price * item.quantity), 0)
                .toFixed(2)}
            </span>
          </div>
          <div class="flex items-center justify-center h-full">
          <Button className="mx-auto items-center justify-center">Proceed to Checkout</Button>

  </div>
        </div>
      )}
    </div>
</div>
  );
}