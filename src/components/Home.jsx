import { Button } from "@/components/ui/button"
import { ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-10">
            <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent sm:text-5xl lg:text-6xl">
                        Welcome to FlipZon 
                    </h1>
                    <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
                        Your one-stop destination for all your shopping needs. Browse our collection and find the best deals.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                    <Button asChild size="lg" className="gap-2">
                        <Link href="/products">
                            <ShoppingBag className="h-5 w-5" />

                            Explore Products

                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="gap-2">
                        <Link href="/cart">
                            View Cart
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    {[
                        {
                            title: "Wide Selection",
                            description: "Browse through thousands of products from top brands"
                        },
                        {
                            title: "Best Deals",
                            description: "Get the best prices and exclusive offers on all items"
                        },
                        {
                            title: "Fast Delivery",
                            description: "Quick and reliable shipping to your doorstep"
                        }
                    ].map((feature, index) => (
                        <div key={index} className="bg-card p-6 rounded-lg border">
                            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}