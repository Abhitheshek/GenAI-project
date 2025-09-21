'use client';

interface MetricsCardsProps {
  totalProducts: number;
  totalRevenue: number;
  totalOrders: number;
  averageRating: number;
}

export default function MetricsCards({ totalProducts, totalRevenue, totalOrders, averageRating }: MetricsCardsProps) {
  const metrics = [
    {
      title: 'Total Products',
      value: totalProducts,
      change: '+12% from last month',
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      change: '+8% from last month',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      change: '+15% from last month',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Avg. Rating',
      value: averageRating,
      change: (
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          ))}
        </div>
      ),
      icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{metric.title}</p>
              <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
              <div className="text-sm text-green-600 font-medium">
                {typeof metric.change === 'string' ? metric.change : metric.change}
              </div>
            </div>
            <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center`}>
              <svg className={`w-6 h-6 ${metric.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={metric.icon}></path>
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}