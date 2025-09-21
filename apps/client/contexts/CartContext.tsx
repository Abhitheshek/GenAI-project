'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, cartService } from '../lib/cartService';
import { authService } from '../lib/authService';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  addToCart: (item: Omit<CartItem, 'id'>) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => {
    const finalPrice = item.price - (item.price * item.discount / 100);
    return sum + (finalPrice * item.quantity);
  }, 0);

  const refreshCart = async () => {
    const user = authService.getCurrentUser();
    if (user) {
      try {
        const cartItems = await cartService.getCart(user.uid);
        setItems(cartItems);
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
    setLoading(false);
  };

  const addToCart = async (item: Omit<CartItem, 'id'>) => {
    const user = authService.getCurrentUser();
    if (user) {
      try {
        await cartService.addToCart(user.uid, item);
        await refreshCart();
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    const user = authService.getCurrentUser();
    if (user) {
      try {
        await cartService.updateCartItem(user.uid, itemId, quantity);
        await refreshCart();
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    }
  };

  const removeItem = async (itemId: string) => {
    const user = authService.getCurrentUser();
    if (user) {
      try {
        await cartService.removeFromCart(user.uid, itemId);
        await refreshCart();
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    }
  };

  const clearCart = async () => {
    const user = authService.getCurrentUser();
    if (user) {
      try {
        await cartService.clearCart(user.uid);
        setItems([]);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{
      items,
      itemCount,
      totalAmount,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      refreshCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}