'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <section className="relative bg-gradient-to-br from-black via-neutral-900 to-zinc-800 text-white py-20 overflow-hidden">
      {/* Decorative floating product images */}
      <div className="absolute top-10 left-4 w-32 sm:w-40 lg:w-52 rotate-[-12deg]">
        <Image src="/ps5.png" alt="Tablet" width={200} height={200} className="object-contain" />
      </div>

      <div className="absolute bottom-10 left-10 w-32 sm:w-40 lg:w-52 rotate-[8deg]">
        <Image src="/mackbook.png" alt="Laptop" width={200} height={200} className="object-contain" />
      </div>

      <div className="absolute top-12 right-6 w-28 sm:w-36 lg:w-48 rotate-[10deg]">
        <Image src="/airpod.png" alt="iPhone" width={200} height={200} className="object-contain" />
      </div>

      <div className="absolute bottom-12 right-10 w-28 sm:w-36 lg:w-44 rotate-[-8deg]">
        <Image src="/applevision.png" alt="Watch" width={200} height={200} className="object-contain" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center pt-30 pb-15 md:pt-0 md:pb-0" >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          About <span className="text-[#FFBA00]">FlipZon</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8">
          FlipZon is your modern online shopping destination built to deliver quality, convenience, and confidence. We offer a wide range of carefully curated products — from cutting-edge electronics to everyday essentials — all at competitive prices.
          </p>

           <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8">
         At FlipZon, we believe shopping should be effortless. That’s why we’ve designed a seamless and secure experience backed by fast delivery, easy returns, and a responsive support team. </p>
     
       <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8">
        Whether you're a casual shopper or a tech enthusiast, FlipZon brings the store to your screen — with innovation, affordability, and trust at the core.</p>
         <Button variant="ghost" size="lg" className="text-white bg-black hover:bg-[#0066DA] hover:text-white">
          Shop Now
        </Button>
      </div>
    </section>
  );
}
