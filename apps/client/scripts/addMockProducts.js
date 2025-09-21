const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBvOyeRxIlMfhyqOpAsAhzpMsmdBBWGzdc",
  authDomain: "e-commerce-e84cb.firebaseapp.com",
  projectId: "e-commerce-e84cb",
  storageBucket: "e-commerce-e84cb.firebasestorage.app",
  messagingSenderId: "779656890625",
  appId: "1:779656890625:web:9181f5ac89f7e821b1b5dc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const mockProducts = [
  {
    name: "Handwoven Silk Scarf",
    description: "Beautiful handwoven silk scarf with traditional patterns",
    price: 2500,
    discount: 15,
    category: "Textiles",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
    sellerId: "mock-seller-1",
    sellerName: "Artisan Crafts"
  },
  {
    name: "Ceramic Tea Set",
    description: "Handcrafted ceramic tea set with intricate designs",
    price: 3200,
    discount: 20,
    category: "Pottery",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    sellerId: "mock-seller-2",
    sellerName: "Clay Masters"
  },
  {
    name: "Silver Pendant Necklace",
    description: "Elegant silver pendant with traditional motifs",
    price: 4500,
    discount: 10,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    sellerId: "mock-seller-3",
    sellerName: "Silver Craft Co"
  },
  {
    name: "Wooden Wall Art",
    description: "Intricately carved wooden wall art piece",
    price: 5500,
    discount: 25,
    category: "Art",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
    sellerId: "mock-seller-1",
    sellerName: "Artisan Crafts"
  },
  {
    name: "Embroidered Cushion Cover",
    description: "Hand-embroidered cushion cover with floral patterns",
    price: 1200,
    discount: 5,
    category: "Textiles",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    sellerId: "mock-seller-4",
    sellerName: "Textile Traditions"
  },
  {
    name: "Brass Decorative Bowl",
    description: "Traditional brass bowl with engraved patterns",
    price: 2800,
    discount: 12,
    category: "Handicrafts",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop",
    sellerId: "mock-seller-2",
    sellerName: "Clay Masters"
  },
  {
    name: "Leather Handbag",
    description: "Handcrafted leather handbag with vintage design",
    price: 6500,
    discount: 18,
    category: "Handicrafts",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    sellerId: "mock-seller-5",
    sellerName: "Leather Works"
  },
  {
    name: "Bamboo Wind Chimes",
    description: "Eco-friendly bamboo wind chimes with soothing sounds",
    price: 1800,
    discount: 8,
    category: "Decor",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
    sellerId: "mock-seller-6",
    sellerName: "Eco Crafts"
  },
  {
    name: "Handmade Soap Set",
    description: "Natural handmade soap set with essential oils",
    price: 950,
    discount: 15,
    category: "Food",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    sellerId: "mock-seller-7",
    sellerName: "Natural Beauty"
  },
  {
    name: "Wooden Dining Table",
    description: "Solid wood dining table with traditional craftsmanship",
    price: 25000,
    discount: 30,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    sellerId: "mock-seller-8",
    sellerName: "Wood Craft Studio"
  },
  {
    name: "Terracotta Planters",
    description: "Set of handmade terracotta planters for indoor plants",
    price: 1500,
    discount: 10,
    category: "Pottery",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    sellerId: "mock-seller-2",
    sellerName: "Clay Masters"
  },
  {
    name: "Silk Saree",
    description: "Pure silk saree with gold thread work",
    price: 8500,
    discount: 22,
    category: "Textiles",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop",
    sellerId: "mock-seller-4",
    sellerName: "Textile Traditions"
  },
  {
    name: "Copper Water Bottle",
    description: "Handcrafted copper water bottle with health benefits",
    price: 2200,
    discount: 12,
    category: "Handicrafts",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop",
    sellerId: "mock-seller-9",
    sellerName: "Metal Craft"
  },
  {
    name: "Jute Shopping Bag",
    description: "Eco-friendly jute shopping bag with printed design",
    price: 650,
    discount: 5,
    category: "Textiles",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    sellerId: "mock-seller-6",
    sellerName: "Eco Crafts"
  },
  {
    name: "Stone Sculpture",
    description: "Hand-carved stone sculpture with artistic details",
    price: 12000,
    discount: 28,
    category: "Art",
    image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&h=400&fit=crop",
    sellerId: "mock-seller-10",
    sellerName: "Stone Art Studio"
  },
  {
    name: "Beaded Bracelet Set",
    description: "Colorful beaded bracelet set with natural stones",
    price: 1800,
    discount: 15,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
    sellerId: "mock-seller-3",
    sellerName: "Silver Craft Co"
  },
  {
    name: "Handwoven Basket",
    description: "Traditional handwoven basket for storage",
    price: 2100,
    discount: 18,
    category: "Handicrafts",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    sellerId: "mock-seller-11",
    sellerName: "Basket Weavers"
  },
  {
    name: "Organic Honey",
    description: "Pure organic honey from local beekeepers",
    price: 850,
    discount: 8,
    category: "Food",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
    sellerId: "mock-seller-7",
    sellerName: "Natural Beauty"
  },
  {
    name: "Wooden Bookshelf",
    description: "Handcrafted wooden bookshelf with multiple compartments",
    price: 15000,
    discount: 25,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    sellerId: "mock-seller-8",
    sellerName: "Wood Craft Studio"
  },
  {
    name: "Ceramic Vase",
    description: "Elegant ceramic vase with hand-painted designs",
    price: 3500,
    discount: 20,
    category: "Pottery",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop",
    sellerId: "mock-seller-2",
    sellerName: "Clay Masters"
  }
];

async function addMockProducts() {
  try {
    console.log('Adding mock products to Firebase...');
    
    for (let i = 0; i < mockProducts.length; i++) {
      const product = mockProducts[i];
      const docRef = await addDoc(collection(db, 'products'), {
        ...product,
        createdAt: new Date()
      });
      console.log(`Product ${i + 1}/20 added with ID: ${docRef.id}`);
    }
    
    console.log('All 20 mock products added successfully!');
  } catch (error) {
    console.error('Error adding mock products:', error);
  }
}

addMockProducts();