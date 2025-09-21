'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';
import { Product } from '../../lib/productService';
import { useCart } from '../../contexts/CartContext';

interface TopProductsProps {
  products: Product[];
}

export default function TopProducts({ products }: TopProductsProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const topProducts = products.slice(0, 8);

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-black">Top Products</h2>
          <Button variant="outline" className="text-blue-600 border-blue-600 bg-white hover:bg-blue-500">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topProducts.map((product) => {
            const finalPrice = product.price - (product.price * product.discount / 100);
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div 
                  className="relative cursor-pointer"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {product.discount}% OFF
                    </div>
                  )}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <h3 
                    className="font-semibold text-black mb-2 line-clamp-2 cursor-pointer hover:text-blue-600"
                    onClick={() => router.push(`/product/${product.id}`)}
                  >
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-black">₹{finalPrice.toFixed(2)}</span>
                    {product.discount > 0 && (
                      <span className="text-gray-500 line-through text-sm">₹{product.price}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">by {product.sellerName}</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
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
                      className="flex-1 bg-white border-blue-600 text-black hover:text-black hover:bg-blue-50"
                      onClick={() => router.push(`/product/${product.id}`)}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}