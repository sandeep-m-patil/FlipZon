'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { Product } from '@/types'
import axios from '@/lib/axios'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Truck, Shield, RotateCcw, Star, ShoppingCart } from 'lucide-react'
import PriceDisplay from '@/utils/PriceDisplay'

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

export default function ProductDetailPage() {
  const { slug } = useParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

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

  const productImages = [product.image, product.image, product.image]

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
                src={productImages[selectedImage]}
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

            {/* Action Buttons */}
            <div className="flex gap-4 pt-2">
              <Button className="bg-[#0066DA] hover:bg-[#2684FC] text-white px-6 py-6 text-lg shadow-lg rounded-xl">
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

            <Separator />

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <Truck className="h-6 w-6 text-[#0066DA]" />
                <div>
                  <p className="font-semibold text-sm">Free Shipping</p>
                  <p className="text-xs text-gray-600">On orders over ₹999</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <Shield className="h-6 w-6 text-[#0066DA]" />
                <div>
                  <p className="font-semibold text-sm">Warranty</p>
                  <p className="text-xs text-gray-600">1 year official</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <RotateCcw className="h-6 w-6 text-[#0066DA]" />
                <div>
                  <p className="font-semibold text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-600">30 days return</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
