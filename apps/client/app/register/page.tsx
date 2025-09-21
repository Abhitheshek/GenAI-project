'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../lib/authService';
import { Button } from '@workspace/ui/components/button';
import SuccessPopup from '../../components/SuccessPopup';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'buyer' as 'artisan' | 'buyer',
    preferredLanguage: 'en'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.register(formData);
      setShowSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)',
        colorScheme: 'light'
      }}
    >
      <div className="w-full max-w-md">
        <div 
          className="rounded-3xl shadow-xl border p-8"
          style={{ 
            backgroundColor: '#ffffff',
            borderColor: '#f3f4f6'
          }}
        >
          <div className="text-center mb-8">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
              }}
            >
              <svg className="w-10 h-10" style={{ color: '#ffffff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#000000' }}>Create Account</h1>
            <p style={{ color: '#6b7280' }}>Join the ArtisanLux community</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div 
                className="px-4 py-3 rounded-xl text-sm border"
                style={{ 
                  backgroundColor: '#fef2f2',
                  borderColor: '#fecaca',
                  color: '#dc2626'
                }}
              >
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#000000' }}>
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                style={{ 
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: '1px solid #e5e7eb',
                  boxShadow: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Enter your full name"
                autoComplete="off"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#000000' }}>
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                style={{ 
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: '1px solid #e5e7eb',
                  boxShadow: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Enter your email"
                autoComplete="off"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#000000' }}>
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                style={{ 
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: '1px solid #e5e7eb',
                  boxShadow: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Create a password"
                autoComplete="off"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#000000' }}>
                Account Type
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value as 'artisan' | 'buyer'})}
                className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                style={{ 
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: '1px solid #e5e7eb',
                  boxShadow: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="buyer">Buyer - Browse and purchase products</option>
                <option value="artisan">Artisan - Sell your handcrafted products</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#000000' }}>
                Preferred Language
              </label>
              <select
                value={formData.preferredLanguage}
                onChange={(e) => setFormData({...formData, preferredLanguage: e.target.value})}
                className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                style={{ 
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: '1px solid #e5e7eb',
                  boxShadow: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="bn">Bengali</option>
                <option value="te">Telugu</option>
                <option value="mr">Marathi</option>
                <option value="ta">Tamil</option>
              </select>
            </div>
            
            <Button 
              type="submit" 
              className="w-full py-4 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              style={{ 
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                color: '#ffffff'
              }}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div 
                    className="animate-spin rounded-full h-5 w-5 border-b-2"
                    style={{ borderColor: '#ffffff' }}
                  ></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
            
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="font-medium transition-colors"
                style={{ color: '#2563eb' }}
                onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                onMouseLeave={(e) => e.target.style.color = '#2563eb'}
              >
                Already have an account? <span className="underline">Sign in</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <SuccessPopup
        isOpen={showSuccess}
        title="Registration Successful!"
        message="Your account has been created. Please login with your credentials."
        onClose={() => {
          setShowSuccess(false);
          router.push('/login');
        }}
      />
    </div>
  );
}