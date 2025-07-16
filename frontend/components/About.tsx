'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-br from-black via-neutral-900 to-zinc-800 text-white py-24 md:py-40 px-4 overflow-hidden"
    >
      {/* Decorative Background Shapes (optional) */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-[#0066DA] rounded-full opacity-20 blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FFBA00] rounded-full opacity-20 blur-3xl animate-pulse -z-10" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          About <span className="text-[#FFBA00]">FlipZon</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 leading-relaxed px-2 md:px-8">
          FlipZon is your modern online shopping destination — delivering quality, convenience, and confidence. We provide an extensive selection of top-tier electronics and everyday essentials at competitive prices, all supported by seamless delivery and trusted service.
        </p>

        <Button
          variant="default"
          className="bg-[#0066DA] text-white hover:bg-[#2684FC] transition-all px-6 py-4 text-lg rounded-lg shadow-md"
        >
          Shop Now
        </Button>
      </div>

    </section>
  );
}
