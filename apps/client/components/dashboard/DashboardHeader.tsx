'use client';

import { useRouter } from 'next/navigation';
import { AuthUser } from '../../lib/authService';
import { Button } from '@workspace/ui/components/button';

interface DashboardHeaderProps {
  user: AuthUser | null;
  onAddProduct: () => void;
}

export default function DashboardHeader({ user, onAddProduct }: DashboardHeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a2 2 0 011-1h4a2 2 0 011 1v12m-6 0h6"></path>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Seller Central</h1>
                <p className="text-sm text-gray-600">Manage your business</p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                onClick={onAddProduct}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Add Product
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM11 19H6a2 2 0 01-2-2V7a2 2 0 012-2h5m5 0v5"></path>
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>
            
            {user && (
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">Seller Account</p>
                </div>
              </div>
            )}
            
            <Button 
              variant="outline" 
              onClick={() => router.push('/profile')}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Profile
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}