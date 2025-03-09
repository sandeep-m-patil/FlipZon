'use client';

import { Button } from '@/components/ui/button';
import { useCartStore } from '../store/cart-store';

export function AddToCartButton({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Button
    className="w-full transition-colors"
      onClick={() => addItem({
        id: product.id,
        name: product.name,
        price: product.price
      })}
    >
      Add to Cart
    </Button>
    
  );
}