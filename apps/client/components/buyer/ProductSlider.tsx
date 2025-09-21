'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '../../lib/productService';

interface ProductSliderProps {
  products: Product[];
}

export default function ProductSlider({ products }: ProductSliderProps) {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      title: 'Handcrafted Excellence',
      subtitle: 'Discover unique artisan products made with passion and tradition',
      cta: 'Shop Now',
      bgColor: 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800'
    },
    {
      title: 'Premium Quality',
      subtitle: 'Authentic handmade items from skilled artisans worldwide',
      cta: 'Explore',
      bgColor: 'bg-gradient-to-br from-gray-900 via-black to-gray-800'
    },
    {
      title: 'Artisan Marketplace',
      subtitle: 'Connect with authentic creators and their beautiful creations',
      cta: 'Browse',
      bgColor: 'bg-gradient-to-br from-blue-800 via-blue-900 to-black'
    },
    {
      title: 'Traditional Crafts',
      subtitle: 'Time-honored techniques meet modern design excellence',
      cta: 'Discover',
      bgColor: 'bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-800'
    },
    {
      title: 'Luxury Collection',
      subtitle: 'Premium handcrafted items for discerning buyers',
      cta: 'View Collection',
      bgColor: 'bg-gradient-to-br from-slate-800 via-gray-900 to-black'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden h-80 rounded-3xl shadow-2xl">
          <div 
            className="flex transition-transform duration-1000 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner, index) => (
              <div key={index} className={`w-full flex-shrink-0 relative ${banner.bgColor}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white max-w-4xl px-8">
                    <h1 className="text-5xl font-extralight mb-6 tracking-wide">
                      {banner.title}
                    </h1>
                    <p className="text-xl mb-8 opacity-90 font-light leading-relaxed max-w-2xl mx-auto">
                      {banner.subtitle}
                    </p>
                    <button 
                      className="bg-white text-black px-10 py-4 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg"
                      onClick={() => router.push('/buyer')}
                    >
                      {banner.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>


          
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}