'use client';

import { useState } from 'react';
import { Product } from '../lib/productService';
import { Button } from '@workspace/ui/components/button';
import WorkflowSimulation from './WorkflowSimulation';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Omit<Product, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    discount: product?.discount || 0,
    category: product?.category || '',
    image: product?.image || '',
  });

  const [imageOption, setImageOption] = useState<'url' | 'upload'>('url');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(product?.image || '');
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Handicrafts', 'Textiles', 'Pottery', 'Jewelry', 'Art', 'Food', 'Furniture', 'Decor'];

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToS3 = async (file: File): Promise<string> => {
    setUploading(true);
    try {
      // Simulate S3 upload - In real implementation, you would:
      // 1. Get presigned URL from your backend
      // 2. Upload file to S3
      // 3. Return the S3 URL
      
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate upload time
      
      // For demo, return a placeholder URL
      const timestamp = Date.now();
      const fileName = `products/${timestamp}-${file.name}`;
      return `https://artisanlux-bucket.s3.amazonaws.com/${fileName}`;
    } finally {
      setUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (formData.discount < 0 || formData.discount > 100) newErrors.discount = 'Discount must be between 0-100%';
    
    if (imageOption === 'url' && !formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    } else if (imageOption === 'upload' && !imageFile && !product?.image) {
      newErrors.image = 'Please select an image file';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      let imageUrl = formData.image;

      // Handle image upload if file is selected
      if (imageOption === 'upload' && imageFile) {
        imageUrl = await uploadToS3(imageFile);
      }

      // Only show AI workflow simulation for new products, not edits
      if (!product) {
        await new Promise(resolve => setTimeout(resolve, 11000));
      }

      onSubmit({
        name: formData.name,
        description: formData.description,
        price: formData.price,
        discount: formData.discount,
        category: formData.category,
        image: imageUrl,
        sellerId: '',
        sellerName: ''
      });
    } catch (error) {
      console.error('Error submitting product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-8 space-y-8">
        <div>
          <h3 className="text-2xl font-semibold text-black mb-2">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <p className="text-gray-600">Fill in the details to create your product listing</p>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-black mb-2">
              Product Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={`w-full p-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter product name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className={`w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Price (₹) *
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
              className={`w-full p-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder=""
              min=""
              step="0.01"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              value={formData.discount}
              onChange={(e) => setFormData({...formData, discount: Number(e.target.value)})}
              className={`w-full p-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.discount ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0"
              min="0"
              max="100"
            />
            {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount}</p>}
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-black mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className={`w-full p-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe your product..."
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
        </div>

        {/* Image Section */}
        <div>
          <label className="block text-sm font-medium text-black mb-4">
            Product Image *
          </label>
          
          {/* Image Option Toggle */}
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => setImageOption('url')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                imageOption === 'url'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Image URL
            </button>
            <button
              type="button"
              onClick={() => setImageOption('upload')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                imageOption === 'upload'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upload Image
            </button>
          </div>

          {/* URL Input */}
          {imageOption === 'url' && (
            <div>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => {
                  setFormData({...formData, image: e.target.value});
                  setImagePreview(e.target.value);
                }}
                className={`w-full p-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.image ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            </div>
          )}

          {/* File Upload */}
          {imageOption === 'upload' && (
            <div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="text-gray-600 mb-2">Click to upload image</p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </label>
              </div>
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            </div>
          )}

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-black mb-2">Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border"
                onError={() => setImagePreview('')}
              />
            </div>
          )}

          {uploading && (
            <div className="mt-4 flex items-center gap-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm">Uploading image...</span>
            </div>
          )}
        </div>

        {/* Price Preview */}
        {formData.price > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Price Preview</h4>
            <div className="flex items-center gap-4">
              <div>
                <span className="text-2xl font-bold text-blue-900">
                  ₹{(formData.price - (formData.price * formData.discount / 100)).toFixed(2)}
                </span>
                {formData.discount > 0 && (
                  <span className="text-gray-500 line-through ml-2">₹{formData.price}</span>
                )}
              </div>
              {formData.discount > 0 && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                  {formData.discount}% OFF
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || uploading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                AI Processing...
              </div>
            ) : (
              product ? 'Update Product' : 'Create Product'
            )}
          </Button>
        </div>
      </form>

      {/* AI Workflow Simulation - Only for new products */}
      {isSubmitting && !product && <WorkflowSimulation productName={formData.name} />}
    </div>
  );
}