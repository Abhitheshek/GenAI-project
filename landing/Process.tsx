'use client';

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Create Account',
      description: 'Sign up and complete verification to join our trusted marketplace community.'
    },
    {
      number: '02',
      title: 'List Products',
      description: 'Upload products and let AI enhance them with professional images and descriptions.'
    },
    {
      number: '03',
      title: 'Start Selling',
      description: 'Reach customers worldwide and grow your business with powerful marketing tools.'
    }
  ];

  return (
    <section className="py-40 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-24">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 border border-blue-100 mb-8 shadow-sm">
            <span className="text-sm font-medium text-blue-700">Simple Process</span>
          </div>
          <h2 className="text-6xl font-light text-black mb-8 tracking-tight">How It Works</h2>
          <p className="text-2xl text-blue-600 font-light">Three simple steps to success</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {steps.map((step, index) => (
            <div key={index} className="text-center group border-2 border-gray-200 p-10 rounded-3xl hover:shadow-lg transition-shadow">
              <div className="text-8xl font-light text-blue-600 mb-10 group-hover:scale-110 transition-transform duration-300">{step.number}</div>
              <h3 className="text-3xl font-medium text-black mb-8 tracking-tight">{step.title}</h3>
              <p className="text-blue-600 leading-relaxed font-light text-lg max-w-sm mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}