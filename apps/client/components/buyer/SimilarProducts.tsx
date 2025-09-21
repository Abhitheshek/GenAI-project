'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';
import { Product } from '../../lib/productService';
import { useCart } from '../../contexts/CartContext';

interface SimilarProductsProps {
  products: Product[];
}

export default function SimilarProducts({ products }: SimilarProductsProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  if (products.length === 0) return null;

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-black mb-6">Similar Products</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => {
          const finalPrice = product.price - (product.price * product.discount / 100);
          
          return (
            <div
              key={product.id}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={() => router.push(`/product/${product.id}`)}
            >
              <div className="relative mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              
              <h3 className="font-medium text-black mb-2 line-clamp-2 text-sm">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-black">₹{finalPrice.toFixed(2)}</span>
                {product.discount > 0 && (
                  <span className="text-gray-500 line-through text-sm">₹{product.price}</span>
                )}
              </div>
              
              <p className="text-xs text-gray-600 mb-3">by {product.sellerName}</p>
              
              <Button
                size="sm"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2"
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
            </div>
          );
        })}
      </div>
    </section>
  );
}