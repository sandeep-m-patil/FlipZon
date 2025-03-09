"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Search as SearchIcon } from "lucide-react"
import { AddToCartButton } from "@/components/AddToCartButton"

const products = [
  {
    id: 1,
    image: 'https://media.croma.com/image/upload/v1725959390/Croma%20Assets/Communication/Mobiles/Images/309729_0_s6f4oz.png',
    name: "Apple iPhone 15 pro max",
    price: 70900,
    category: "Electronic",
    discount: 0,
    rating: 4.5,
    inStock: true,
    description: 'Latest Apple iPhone 15 with advanced features and powerful performance.',
  },
  {
    id: 2,
    image: 'https://m.media-amazon.com/images/I/71wSE6SOhPL.jpg',
    name: "Dyazo Laptop bag - Grey",
    price: 299,
    category: "Accessory",
    discount: 0,
    rating: 4.0,
    inStock: true,
    description: 'A stylish and durable laptop bag perfect for work or travel.',
  },
  {
    id: 3,
    image: 'https://www.jiomart.com/images/product/original/rvulyznotm/proelite-smart-flip-case-cover-for-apple-ipad-10th-generation-10-9-inch-2022-fully-transparent-back-with-pencil-holder-black-product-images-orvulyznotm-p595761054-0-202211281101.jpg?im=Resize=(420,420)',
    name: "ProElite Smart Case for iPad",
    price: 699,
    category: "Accessory",
    discount: 0,
    rating: 4.3,
    inStock: true,
    description: 'A protective case designed for iPads, made with high-quality materials.',
  },
  {
    id: 4,
    image: 'https://m.media-amazon.com/images/I/41GMgZG6zdL.AC_SX250.jpg',
    name: "Razer Headset",
    price: 1200,
    category: "Electronic",
    discount: 0,
    rating: 4.7,
    inStock: true,
    description: 'High-quality gaming headset with immersive sound and comfortable fit.',
  },
  {
    id: 5,
    image: 'https://m.media-amazon.com/images/I/51dRoa85BNL._SR480,440_.jpg',
    name: "Samsung Smart TV",
    price: 66900,
    category: "Electronic",
    discount: 0,
    rating: 4.6,
    inStock: true,
    description: 'A stunning smart TV with a wide range of features and picture quality.',
  },
  {
    id: 6,
    image: 'https://m.media-amazon.com/images/I/61NqrZdoh6L._SY695_.jpg',
    name: "YOHO Stride Sneakers",
    price: 1799,
    category: "Foot Wear",
    discount: 0,
    rating: 4.2,
    inStock: true,
    description: 'Comfortable and stylish sneakers for casual and sportswear.',
  },
  {
    id: 7,
    image: 'https://images-eu.ssl-images-amazon.com/images/I/61-SNkMcaqL._AC_UL675_SR675,480_.jpg',
    name: "Safari Pentagon 3 Pc Set",
    price: 6299,
    category: "Package",
    discount: 0,
    rating: 4.5,
    inStock: true,
    description: 'A travel-friendly 3-piece set perfect for your next trip.',
  },
  {
    id: 8,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnU7MkRdE9JtIsiUfEhq8VGYya_O7zVEl4Cg&s',
    name: "Leather Analog Watch",
    price: 13999,
    category: "Accessory",
    discount: 0,
    rating: 4.4,
    inStock: true,
    description: 'A sophisticated leather analog watch for elegant looks.',
  },
  
];


export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...new Set(products.map(p => p.category))]

  const calculateDiscountedPrice = (price, discount) => {
    return (price * (100 - discount) / 100).toFixed(2)
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">Our Products</h1>
        <p className="text-muted-foreground">
          Discover our curated collection of premium products
        </p>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-3xl mx-auto">
        <div className="relative w-full sm:w-[350px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px] ">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category} className="capitalize">
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="flex flex-col group">
            <CardHeader className="p-0">
              <div className="h-40 relative aspect-square overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-fill  mx-auto h-[100%] transition-transform group-hover:scale-105"
                />
               
                {product.discount > 0 && (
                  <Badge className="absolute left-2 bg-destructive">
                    -{product.discount}%
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 px-6">
              <div className="space-y-2">
                <Badge variant="secondary" className="capitalize">
                  {product.category}
                </Badge>
                <CardTitle className="line-clamp-1 py-1">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">
                    ${calculateDiscountedPrice(product.price, product.discount)}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.price}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">
                      {i < Math.floor(product.rating) ? "★" : "☆"}
                    </span>
                  ))}
                  <span className="ml-1 text-sm text-muted-foreground">
                    ({product.rating})
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="">
            <AddToCartButton product={product} />
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No products found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  )
}
