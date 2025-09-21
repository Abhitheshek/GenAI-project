'use client';

interface CategorySectionProps {
  onCategorySelect: (category: string) => void;
}

export default function CategorySection({ onCategorySelect }: CategorySectionProps) {
  const categories = [
    { name: 'Handicrafts', icon: '🎨', color: 'bg-purple-100 text-purple-700' },
    { name: 'Textiles', icon: '🧵', color: 'bg-pink-100 text-pink-700' },
    { name: 'Pottery', icon: '🏺', color: 'bg-orange-100 text-orange-700' },
    { name: 'Jewelry', icon: '💎', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Art', icon: '🖼️', color: 'bg-green-100 text-green-700' },
    { name: 'Food', icon: '🍯', color: 'bg-red-100 text-red-700' },
    { name: 'Furniture', icon: '🪑', color: 'bg-blue-100 text-blue-700' },
    { name: 'Decor', icon: '🕯️', color: 'bg-indigo-100 text-indigo-700' }
  ];

  return (
    <section className="bg-white py-6 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-black">Shop by Category</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All Categories
          </button>
        </div>
        
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => onCategorySelect(category.name)}
              className="flex flex-col items-center p-4 border-1 border-gray-300 rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                {category.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}