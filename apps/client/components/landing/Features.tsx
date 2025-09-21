'use client';

export default function Features() {
  const features = [
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'AI-Powered Automation',
      description: 'Automatically generate product images, social media content, and marketing materials using advanced AI technology.'
    },
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'Verified Marketplace',
      description: 'Every artisan is thoroughly verified to ensure authenticity and quality through our comprehensive verification system.'
    },
    {
      icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
      title: 'Analytics & Insights',
      description: 'Track performance, understand customer behavior, and optimize your business with comprehensive analytics.'
    }
  ];

  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-light text-black mb-6">Enterprise Platform</h2>
          <p className="text-xl text-gray-500 font-light">
            Built for scale with enterprise security and performance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center border-gray-400 border-2 p-10 rounded-3xl bg-white hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={feature.icon}></path>
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-black mb-6">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed font-light text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}