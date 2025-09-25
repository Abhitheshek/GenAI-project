'use client';

import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { AuthUser } from "../../lib/authService";

interface HeroProps {
  user: AuthUser | null;
}

export default function Hero({ user }: HeroProps) {
  return (
    <section className="relative py-10 bg-white overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(138, 180, 248, 0.1) 1px, transparent 55px),
            linear-gradient(90deg, rgba(138, 180, 248, 0.1) 1px, transparent 55px)
          `,
          backgroundSize: '50px 50px'
        }}
      ></div>
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
          <span className="text-sm font-medium text-blue-700">Trusted by 10,000+ artisans</span>
        </div>
        
        <h1 className="text-7xl font-semibold text-black mb-6 leading-tight tracking-tight">
          The Future of
          <br />
          <span className="font-semibold text-blue-600">Artisan Commerce</span>
        </h1>
        
        <p className="text-xl text-gray-500 mb-14 max-w-2xl mx-auto leading-relaxed font-light">
          Connect authentic artisans with global customers through our AI-powered marketplace. 
          Streamline operations and grow your craft business.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          {user ? (
            <>
              <Link href={user.role === 'artisan' ? '/seller' : '/buyer'}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-7 text-lg font-medium rounded-lg">
                  {user.role === 'artisan' ? 'Seller Dashboard' : 'Browse Marketplace'}
                </Button>
              </Link>
              <Link href={user.role === 'artisan' ? '/buyer' : '/seller'}>
                <div  className="border border-gray-200 text-white bg-black    px-10 py-4 text-lg font-medium rounded-lg">
                  {user.role === 'artisan' ? 'Shop Products' : 'Start Selling'}
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link href="/register">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg font-medium rounded-lg">
                  Start Selling Today
                </Button>
              </Link>
              <Link href="/buyer">
                <Button size="lg" variant="outline" className="border border-gray-400 text-black bg-white hover:border-gray-300 px-10 py-4 text-lg font-medium rounded-lg">
                  Explore Marketplace
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="grid grid-cols-3 gap-16 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-light text-black mb-2">500+</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">Verified Artisans</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-light text-black mb-2">10K+</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">Products Listed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-light text-black mb-2">50K+</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">Happy Customers</div>
          </div>
        </div>
      </div>
    </section>
  );
}