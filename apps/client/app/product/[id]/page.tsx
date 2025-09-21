'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Product, productService } from '../../../lib/productService';
import { authService, AuthUser } from '../../../lib/authService';
import { useCart } from '../../../contexts/CartContext';
import { Button } from '@workspace/ui/components/button';
import BuyerHeader from '../../../components/buyer/BuyerHeader';
import SimilarProducts from '../../../components/buyer/SimilarProducts';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { addToCart } = useCart();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    loadProduct();
  }, [params.id, router]);

  const loadProduct = async () => {
    try {
      const products = await productService.getProducts();
      const foundProduct = products.find(p => p.id === params.id);
      setProduct(foundProduct || null);
      setAllProducts(products);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        productId: product.id!,
        name: product.name,
        price: product.price,
        discount: product.discount,
        image: product.image,
        quantity: quantity,
        sellerId: product.sellerId,
        sellerName: product.sellerName
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Product Not Found</h1>
          <Button onClick={() => router.push('/buyer')}>Back to Products</Button>
        </div>
      </div>
    );
  }

  const finalPrice = product.price - (product.price * product.discount / 100);
  const savings = product.price - finalPrice;
  const similarProducts = allProducts.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <BuyerHeader user={user} />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl"
              />
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                {product.category}
              </span>
              <h1 className="text-2xl font-bold text-black mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-black">₹{finalPrice.toFixed(2)}</span>
                {product.discount > 0 && (
                  <span className="text-lg text-gray-500 line-through">₹{product.price}</span>
                )}
              </div>
              {savings > 0 && (
                <p className="text-green-600 font-medium">You save ₹{savings.toFixed(2)}</p>
              )}
            </div>

            {/* Seller Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-black mb-2">Sold by</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {product.sellerName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-black">{product.sellerName}</p>
                  <p className="text-sm text-gray-600">Verified Seller</p>
                </div>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium text-black">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-black hover:bg-gray-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                    </svg>
                  </button>
                  <span className="px-4 text-black py-2 font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-black hover:bg-gray-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-medium"
                >
                  Add to Cart
                </Button>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
                  onClick={() => router.push('/cart')}
                >
                  Buy Now
                </Button>
              </div>

              <div className="flex justify-center gap-6 pt-4 border-t">
                <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  Wishlist
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <SimilarProducts products={similarProducts} />
      </div>
    </div>
  );
}