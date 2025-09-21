'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService, AuthUser } from '../../lib/authService';
import { Button } from '@workspace/ui/components/button';
import BuyerHeader from '../../components/buyer/BuyerHeader';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
  }, [router]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BuyerHeader user={user} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-black mb-1">{user.name}</h2>
              <p className="text-gray-600 mb-4">{user.email}</p>
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {user.role === 'artisan' ? 'Artisan Seller' : 'Buyer'}
              </span>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-black">{user.name}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-black">{user.email}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-black capitalize">{user.role}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-black">{user.preferredLanguage === 'en' ? 'English' : user.preferredLanguage}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black mb-4">Account Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-black">Change Password</p>
                      <p className="text-sm text-gray-600">Update your account password</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-black">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Add extra security to your account</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM11 19H6a2 2 0 01-2-2V7a2 2 0 012-2h5m5 0v5"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-black">Notifications</p>
                      <p className="text-sm text-gray-600">Manage your notification preferences</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-200">
              <h3 className="text-lg font-semibold text-red-900 mb-4">Account Actions</h3>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-red-900 mb-1">Sign Out</h4>
                    <p className="text-sm text-red-700">Sign out of your account on this device</p>
                  </div>
                  <Button 
                    onClick={handleLogout}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Signing Out...
                      </div>
                    ) : (
                      'Sign Out'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}