'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="rounded-xl bg-white shadow-md hover:shadow-lg transition p-4 relative flex flex-col items-center text-center space-y-4">
    

      {/* Product Image */}
      <div className="w-40 h-40 relative">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain bg-transparent"
          sizes="(max-width: 800px) 100vw, 33vw"
          priority
        />
      </div>

      {/* Product Title */}
      <h3 className="text-lg font-medium text-gray-800">{product.title}</h3>

      {/* Product Description */}
      <p className="text-sm text-black">{product.description}</p>

      {/* Product Price */}
      <p className="text-lg font-bold text-black">₹{product.price}</p>

      
      {/* Buy Now Button */}
      <Button className="w-50 bg-black text-white hover:bg-gray-700">
        Buy Now
      </Button>
    </div>
  );
};

export default ProductCard;
