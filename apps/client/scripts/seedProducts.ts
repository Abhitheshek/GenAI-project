import { productService, Product } from '../lib/productService';

const seedProducts: Omit<Product, 'id' | 'createdAt'>[] = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 99.99,
    discount: 20,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    sellerId: "seller1",
    sellerName: "TechStore"
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt in various colors.",
    price: 29.99,
    discount: 15,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    sellerId: "seller2",
    sellerName: "EcoFashion"
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and smartphone connectivity.",
    price: 199.99,
    discount: 25,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    sellerId: "seller1",
    sellerName: "TechStore"
  },
  {
    name: "Ceramic Coffee Mug",
    description: "Handcrafted ceramic mug perfect for your morning coffee or tea.",
    price: 14.99,
    discount: 0,
    category: "Home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400",
    sellerId: "seller3",
    sellerName: "HomeGoods"
  },
  {
    name: "Leather Wallet",
    description: "Premium genuine leather wallet with multiple card slots and RFID protection.",
    price: 49.99,
    discount: 10,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
    sellerId: "seller2",
    sellerName: "EcoFashion"
  },
  {
    name: "Portable Phone Charger",
    description: "Compact 10,000mAh power bank with fast charging and multiple USB ports.",
    price: 24.99,
    discount: 30,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400",
    sellerId: "seller1",
    sellerName: "TechStore"
  }
];

async function seedDatabase() {
  try {
    console.log('Starting to seed database...');
    
    for (const product of seedProducts) {
      const id = await productService.createProduct(product);
      console.log(`Created product: ${product.name} with ID: ${id}`);
    }
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();