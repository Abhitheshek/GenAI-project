'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';
import { Product } from '../../lib/productService';
import { useCart } from '../../contexts/CartContext';

interface AllProductsProps {
  products: Product[];
  selectedCategory: string;
}

export default function AllProducts({ products, selectedCategory }: AllProductsProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    filterAndSortProducts();
  }, [products, selectedCategory, sortBy, priceRange]);

  const filterAndSortProducts = () => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = filtered.filter(product => {
      const finalPrice = product.price - (product.price * product.discount / 100);
      return finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price - (a.price * a.discount / 100)) - (b.price - (b.price * b.discount / 100));
        case 'price-high':
          return (b.price - (b.price * b.discount / 100)) - (a.price - (a.price * a.discount / 100));
        case 'discount':
          return b.discount - a.discount;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const ProductCard = ({ product }: { product: Product }) => {
    const finalPrice = product.price - (product.price * product.discount / 100);
    
    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
        <div 
          className="relative cursor-pointer"
          onClick={() => router.push(`/product/${product.id}`)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discount > 0 && (
            <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-md text-sm font-bold">
              {product.discount}% OFF
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 
            className="font-semibold text-black mb-2 line-clamp-2 cursor-pointer hover:text-blue-600"
            onClick={() => router.push(`/product/${product.id}`)}
          >
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-black">₹{finalPrice.toFixed(2)}</span>
            {product.discount > 0 && (
              <span className="text-gray-500 line-through text-sm">₹{product.price}</span>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">by {product.sellerName}</span>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
              {product.category}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 text-white bg-blue-500 hover:bg-blue-600"
              onClick={(e) => {
                e.stopPropagation();
                addToCart({
                  productId: product.id!,
                  name: product.name,
                  price: product.price,
                  discount: product.discount,
                  image: product.image,
                  quantity: 1,
                  sellerId: product.sellerId,
                  sellerName: product.sellerName
                });
              }}
            >
              Add to Cart
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 bg-white border-blue-600 hover:text-black text-black hover:bg-blue-50"
              onClick={() => router.push(`/product/${product.id}`)}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-black">
            {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
          </h2>
          
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>
            
            <div className="flex border border-gray-200 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6' 
            : 'space-y-4'
          }>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}