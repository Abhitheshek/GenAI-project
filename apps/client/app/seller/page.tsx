'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product, productService } from '../../lib/productService';
import { authService, AuthUser } from '../../lib/authService';
import ProductForm from '../../components/ProductForm';
import { Button } from '@workspace/ui/components/button';

export default function SellerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    loadProducts(currentUser.uid);
  }, [router]);

  const loadProducts = async (sellerId: string) => {
    try {
      const sellerProducts = await productService.getSellerProducts(sellerId);
      setProducts(sellerProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (productData: Omit<Product, 'id' | 'createdAt'>) => {
    if (!user) return;
    try {
      const productWithSeller = {
        ...productData,
        sellerId: user.uid,
        sellerName: user.name
      };
      await productService.createProduct(productWithSeller);
      setShowForm(false);
      loadProducts(user.uid);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleUpdateProduct = async (productData: Omit<Product, 'id' | 'createdAt'>) => {
    if (!editingProduct?.id || !user) return;
    try {
      await productService.updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
      setShowForm(false);
      loadProducts(user.uid);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?') || !user) return;
    try {
      await productService.deleteProduct(id);
      loadProducts(user.uid);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
    setActiveTab('products');
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalRevenue = products.reduce((sum, product) => {
    const finalPrice = product.price - (product.price * product.discount / 100);
    return sum + finalPrice;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-blue-600">ArtisanLux</h1>
              <span className="text-sm text-gray-600">Seller Dashboard</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">Hi, {user?.name}</span>
              <Button 
                onClick={handleAddProduct}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add Product
              </Button>
              <Button 
                variant="outline"
                onClick={handleLogout}
                className="text-red-600 bg-white border-red-200 hover:bg-red-500"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'products', label: 'Products' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-black">{products.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Value</p>
                    <p className="text-2xl font-bold text-black">₹{totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Products</p>
                    <p className="text-2xl font-bold text-black">{products.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Categories</p>
                    <p className="text-2xl font-bold text-black">{new Set(products.map(p => p.category)).size}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Products */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black mb-4">Recent Products</h3>
              {products.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No products yet. Add your first product to get started!</p>
                  <Button 
                    onClick={handleAddProduct}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Add Product
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {products.slice(0, 5).map((product) => {
                    const finalPrice = product.price - (product.price * product.discount / 100);
                    return (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium text-black">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-black">₹{finalPrice.toFixed(2)}</p>
                          {product.discount > 0 && (
                            <p className="text-sm text-green-600">{product.discount}% off</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {showForm && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-black mb-6">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <ProductForm
                  product={editingProduct || undefined}
                  onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
                  onCancel={handleCancel}
                />
              </div>
            )}

            {!showForm && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-black">Your Products</h3>
                  <Button 
                    onClick={handleAddProduct}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Add Product
                  </Button>
                </div>

                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No products yet</p>
                    <Button 
                      onClick={handleAddProduct}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Add Your First Product
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => {
                      const finalPrice = product.price - (product.price * product.discount / 100);
                      return (
                        <div key={product.id} className="border border-gray-200 rounded-xl p-4">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                          <h4 className="font-semibold text-black mb-2">{product.name}</h4>
                          <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <span className="text-lg font-bold text-black">₹{finalPrice.toFixed(2)}</span>
                              {product.discount > 0 && (
                                <span className="text-sm text-gray-500 line-through ml-2">₹{product.price}</span>
                              )}
                            </div>
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                              {product.category}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(product)}
                              className="flex-1"
                            >
                              Edit
                            </Button>
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteProduct(product.id!)}
                              className="flex-1 bg-red-600  text-white border-red-200 hover:bg-white hover:text-black"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}