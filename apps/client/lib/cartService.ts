import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  discount: number;
  image: string;
  quantity: number;
  sellerId: string;
  sellerName: string;
}

export interface Order {
  id?: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  paymentMethod: string;
  shippingAddress: string;
  createdAt: Date;
}

export const cartService = {
  async addToCart(userId: string, item: Omit<CartItem, 'id'>): Promise<void> {
    const cartRef = doc(db, 'carts', userId);
    const cartDoc = await getDoc(cartRef);
    
    if (cartDoc.exists()) {
      const cartData = cartDoc.data();
      const existingItems = cartData.items || [];
      const existingItemIndex = existingItems.findIndex((i: CartItem) => i.productId === item.productId);
      
      if (existingItemIndex >= 0) {
        existingItems[existingItemIndex].quantity += item.quantity;
      } else {
        existingItems.push({ ...item, id: Date.now().toString() });
      }
      
      await updateDoc(cartRef, { items: existingItems });
    } else {
      await setDoc(cartRef, {
        userId,
        items: [{ ...item, id: Date.now().toString() }],
        createdAt: new Date()
      });
    }
  },

  async getCart(userId: string): Promise<CartItem[]> {
    const cartRef = doc(db, 'carts', userId);
    const cartDoc = await getDoc(cartRef);
    
    if (cartDoc.exists()) {
      return cartDoc.data().items || [];
    }
    return [];
  },

  async updateCartItem(userId: string, itemId: string, quantity: number): Promise<void> {
    const cartRef = doc(db, 'carts', userId);
    const cartDoc = await getDoc(cartRef);
    
    if (cartDoc.exists()) {
      const cartData = cartDoc.data();
      const items = cartData.items || [];
      const itemIndex = items.findIndex((i: CartItem) => i.id === itemId);
      
      if (itemIndex >= 0) {
        if (quantity <= 0) {
          items.splice(itemIndex, 1);
        } else {
          items[itemIndex].quantity = quantity;
        }
        await updateDoc(cartRef, { items });
      }
    }
  },

  async removeFromCart(userId: string, itemId: string): Promise<void> {
    await this.updateCartItem(userId, itemId, 0);
  },

  async clearCart(userId: string): Promise<void> {
    const cartRef = doc(db, 'carts', userId);
    await updateDoc(cartRef, { items: [] });
  },

  async createOrder(orderData: Omit<Order, 'id'>): Promise<string> {
    const orderRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: new Date()
    });
    
    // Clear cart after order
    await this.clearCart(orderData.userId);
    
    return orderRef.id;
  },

  async getOrders(userId: string): Promise<Order[]> {
    // This would need a query in a real implementation
    // For now, return empty array as placeholder
    return [];
  }
};