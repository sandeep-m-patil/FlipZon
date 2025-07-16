'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

import Navbar from '@/components/Navbar';

const Home: React.FC = () => {


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-[#0066DA] text-white min-h-screen flex items-center ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <div className="text-center">
              <h1 className="text-3xl md:text-6xl font-bold mb-6">
                Welcome to FlipZon
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-center leading-relaxed px-4">
               Shop quality products at low prices <br /> fast, secure, and reliable delivery.  </p>

              <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-[#0066DA] text-white hover:bg-white hover:text-[#0066DA]">
                Shop Now
              </Button>
            </div>
          </div>
        </section>
      </main>

    </div >
  );
};

export default Home;