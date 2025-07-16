'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const products = [
    {
        title: 'Macbook Air',
        description:
            '15-inch Retina display for more of what you love in a slim design.',
        image: 'https://assets.stickpng.com/thumbs/5ec26e0b6c295800046c81db.png',
        bg: 'bg-white',
        text: 'text-black',
    },
    {
        title: 'PS4 Controller',
        description:
            'Powerful Controller that redefine your gaming experience.',
        image: 'https://assets.stickpng.com/thumbs/58f36427a4fa116215a923cf.png',
        bg: 'bg-white',
        text: 'text-black',
    },
    {
        title: 'Sony Headphones',
        description: 'Immersive audio experience with powerful computation.',
        image: 'https://assets.stickpng.com/thumbs/580b57fbd9996e24bc43bfbe.png',
        bg: 'bg-white',
        text: 'text-black',
    },
    {
        title: 'Apple Iphone 12',
        description: '15-inch Retina display (128GB Storage, Purple)',
        image: 'https://assets.stickpng.com/thumbs/61d2f93392b57c0004c64747.png',
        bg: 'bg-white',
        text: 'text-black',
    },

    
    
];

export default function ProductShowcase() {
    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product, idx) => (
                    <div
                        key={idx}
                        className={`rounded-xl overflow-hidden hover:bg-black hover:text-white shadow-md transition-transform hover:scale-[1.01] ${product.bg} ${product.text} flex flex-col`}
                    >
                        <div className="p-6 flex flex-col justify-center flex-1">
                            <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
                            <p className="text-sm mb-4">{product.description}</p>

                        </div>

                        {product.image && (
                            <div className="relative w-full h-52 sm:h-64 md:h-72 lg:h-80 xl:h-96">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-contain p-6"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>


                        )}
                    </div>
                ))}
            </div>

            <div className="mt-10 text-center">
                <Button className="bg-[#0066DA] hover:bg-[#2684FC] text-white px-6 py-3">
                    <span>View all Products</span><ArrowRight />
                </Button>
            </div>
        </section>
    );
}
