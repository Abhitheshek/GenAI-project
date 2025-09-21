'use client';

import { Product } from '../lib/productService';
import { Button } from '@workspace/ui/components/button';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
  isSellerView?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

export default function ProductCard({ product, isSellerView, onEdit, onDelete }: ProductCardProps) {
  const router = useRouter();
  const discountedPrice = product.price - (product.price * product.discount / 100);

  const handleCardClick = () => {
    if (!isSellerView) {
      router.push(`/product/${product.id}`);
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
        !isSellerView ? 'cursor-pointer' : ''
      }`}
      onClick={handleCardClick}
    >
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-green-600">₹{discountedPrice.toFixed(2)}</span>
          {product.discount > 0 && (
            <>
              <span className="text-sm line-through text-gray-500">₹{product.price}</span>
              <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">{product.discount}% OFF</span>
            </>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-3">By {product.sellerName}</p>
        
        {isSellerView ? (
          <div className="flex gap-2">
            <Button  size="sm" onClick={() => onEdit?.(product)}>Edit</Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete?.(product.id!)}>Delete</Button>
          </div>
        ) : (
          <Button className="w-full">Add to Cart</Button>
        )}
      </div>
    </div>
  );
}