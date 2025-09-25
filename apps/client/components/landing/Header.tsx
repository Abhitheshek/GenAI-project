'use client';

import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { AuthUser } from "../../lib/authService";

interface HeaderProps {
  user: AuthUser | null;
  onProfile: () => void;
}

export default function Header({ user, onProfile }: HeaderProps) {
  return (
    <header className="bg-white border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-blue-600">ArtisanLux</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-10">
            <Link href="/products" className="text-gray-800 hover:text-gray-900 transition-colors text-sm font-medium">Products</Link>
            <Link href="/sellers" className="text-gray-800 hover:text-gray-900 transition-colors text-sm font-medium">Sellers</Link>
            <Link href="/about" className="text-gray-800 hover:text-gray-900 transition-colors text-sm font-medium">About</Link>
            <Link href="/contact" className="text-gray-800 hover:text-gray-900 transition-colors text-sm font-medium">Contact</Link>
          </nav>
          
          <div className="flex items-center gap-3">
            {user ? (
              <>
                
                <Link href={user.role === 'artisan' ? '/seller' : '/buyer'}>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium">
                    Dashboard
                  </Button>
                </Link>
                <Button size="sm" variant="outline" onClick={onProfile} className="border-blue-200 text-gray-800 bg-white hover:text-gray-900 hover:border-blue-300 hover:bg-blue-200 px-4 py-2 text-sm">
                  Profile
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button size="sm" variant="outline" className="border-blue-200 bg-white text-blue-600 hover:border-blue-300 px-4 py-2 text-sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}