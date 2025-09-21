import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from './firebase';

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  image: string;
  sellerId: string;
  sellerName: string;
  createdAt: Date;
}

export const productService = {
  async createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'products'), {
      ...product,
      createdAt: new Date()
    });
    return docRef.id;
  },

  async getProducts(): Promise<Product[]> {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
  },

  async getSellerProducts(sellerId: string): Promise<Product[]> {
    const q = query(collection(db, 'products'), where('sellerId', '==', sellerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<void> {
    await updateDoc(doc(db, 'products', id), updates);
  },

  async deleteProduct(id: string): Promise<void> {
    await deleteDoc(doc(db, 'products', id));
  }
};