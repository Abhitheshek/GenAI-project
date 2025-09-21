"use client";

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authService, AuthUser } from "../lib/authService"
import Header from "../components/landing/Header"
import Hero from "../components/landing/Hero"
import Features from "../components/landing/Features"
import Process from "../components/landing/Process"
import CTA from "../components/landing/CTA"
import Footer from "../components/landing/Footer"

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const handleProfile = () => {
    router.push('/profile');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-light">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header user={user} onProfile={handleProfile} />
      <Hero user={user} />
      <Features />
      <Process />
      <CTA />
      <Footer />
    </div>
  )
}