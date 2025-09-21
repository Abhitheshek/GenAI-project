'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product, productService } from '../../lib/productService';
import { authService, AuthUser } from '../../lib/authService';
import BuyerHeader from '../../components/buyer/BuyerHeader';
import CategorySection from '../../components/buyer/CategorySection';
import ProductSlider from '../../components/buyer/ProductSlider';
import TopProducts from '../../components/buyer/TopProducts';
import AllProducts from '../../components/buyer/AllProducts';

export default function BuyerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    loadProducts();
  }, [router]);

  const loadProducts = async () => {
    try {
      const allProducts = await productService.getProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BuyerHeader user={user} />
      <CategorySection onCategorySelect={setSelectedCategory} />
      <ProductSlider products={products.slice(0, 10)} />
      <TopProducts products={products.slice(0, 8)} />
      <AllProducts products={products} selectedCategory={selectedCategory} />
    </div>
  );
}