'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductShowcase from '@/components/PorductShowCase';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main>
        {/* Hero Section with background image + gradient */}
        <section className="relative min-h-screen flex items-center justify-center text-white">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/hero-bg.png" 
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0066DA]/80 to-[#2684FC]/70" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <div className="text-center">
              <h1 className="text-3xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                Welcome to FlipZon
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-center leading-relaxed px-4 drop-shadow-md">
                Shop quality products at low prices. <br /> Fast, secure, and reliable delivery.
              </p>

              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 bg-white text-[#0066DA] hover:bg-[#0066DA] hover:text-white transition-colors shadow-md"
              >
                Shop Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <ProductShowcase />

      <Footer />
    </div>
  );
};

export default Home;
