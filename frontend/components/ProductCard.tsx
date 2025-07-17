'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

type Props = {
  product: Product;
  slug: string
};

const ProductCard: React.FC<Props> = ({ product, slug }) => {
  return (


    <div className="rounded-xl bg-white shadow-md hover:shadow-lg hover:shadow-black/40  transition p-4 relative flex flex-col items-center text-center space-y-4">


      {/* Product Image */}
      <Link href={`/products/${slug}`}>
        <div className="w-40 h-40 relative">

          <Image
            src={product.image}
            alt={product.title}
            fill

            className="object-contain "
            sizes="(max-width: 800px) 100vw, 33vw"
            priority
          />
        </div>
      </Link>


      {/* Product Title */}
      <h3 className="text-lg font-medium">{product.title}</h3>

      {/* Product Description */}
      <p className="text-sm">{product.description}</p>

      {/* Product Price */}
      <p className="text-lg font-bold">₹{product.price}</p>

      {/* Buy Now Button */}
      <Button className="w-50  text-white bg-[#0066DA] hover:bg-[#2684FC]">
        <ShoppingCart className="mr-2 h-5 w-5" />Add to Cart
      </Button>
    </div>


  );
};

export default ProductCard;
