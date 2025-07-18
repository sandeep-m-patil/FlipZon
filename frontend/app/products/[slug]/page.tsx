'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { Product } from '@/types'
import axios from '@/lib/axios'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ShoppingCart } from 'lucide-react'
import PriceDisplay from '@/utils/PriceDisplay'
import { useCartStore } from '@/store/useCartStore'

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

export default function ProductDetailPage() {
  const { slug } = useParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/products')
        setProducts(res.data)
      } catch (err) {
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const product = useMemo(() => {
    return products.find((p) => slugify(p.title) === slug)
  }, [products, slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066DA]"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <Button onClick={() => window.history.back()} variant="outline">
          Go Back
        </Button>
      </div>
    )
  }


  return (
    <div className="bg-slate-50 min-h-screen px-6">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          Home / Products / <span className="text-gray-800">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 justify-center items-center">
          {/* Left - Product Image */}
          <div className="space-y-6">
            <div className="relative w-full md:h-[400px] h-[300px] rounded-xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-6 transition-transfor"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6 pt-5">
            <div>
              <h1 className="md:text-4xl text-2xl font-bold text-gray-900 leading-snug">{product.title}</h1>

            </div>

            <p className="text-gray-700 text-md">{product.description}</p>

            <Separator />

            <div className="md:text-4xl text-2xl font-bold"><PriceDisplay amount={product.price} /></div>


            {/*quantity controlls*/}
            <div className="flex items-center space-x-4 bg-slate-50 p-2 rounded-lg">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-white text-black px-3 py-1 hover:bg-slate-100"
                >
                  -
                </Button>
                <span className="px-4 py-1 min-w-[40px] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-white text-black px-3 py-1 hover:bg-slate-100"
                >
                  +
                </Button>
              </div>
            </div>



            {/* Action Buttons */}
            <div className="flex gap-4 pt-2">
              <Button   onClick={(e) => addToCart(product._id, quantity)} className="bg-[#0066DA] hover:bg-[#2684FC] text-white px-6 py-6 text-lg shadow-lg rounded-xl">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="border-2 border-[#0066DA] text-[#0066DA] hover:bg-[#0066DA] hover:text-white px-6 py-6 text-lg rounded-xl"
              >
                Buy Now
              </Button>
            </div>


          </div>
        </div>
      </div>
    </div >
  )
}
