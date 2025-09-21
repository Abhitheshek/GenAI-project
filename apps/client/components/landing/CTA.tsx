'use client';

import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

export default function CTA() {
  return (
    <section className="relative py-40 bg-blue-600 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(138, 180, 248, 0.1) 1px, transparent 55px),
            linear-gradient(90deg, rgba(138, 180, 248, 0.1) 1px, transparent 55px)
          `,
          backgroundSize: '50px 50px'
        }}
      ></div>
      <div className="relative max-w-5xl mx-auto px-8 text-center">
        <h2 className="text-6xl font-light text-white mb-12 tracking-tight">Ready to Transform?</h2>
        <p className="text-2xl text-gray-800 mb-20 font-light leading-relaxed max-w-3xl mx-auto">
          Join thousands of successful artisans who have transformed their craft into thriving businesses.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/register">
            <Button size="lg" className="bg-black text-white px-12 py-5 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              Get Started Free
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="border-2 border-white text-black bg-white px-12 py-5 text-lg font-medium rounded-xl transition-all duration-200">
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}