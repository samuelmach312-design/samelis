import React from 'react'

export const categoryMap = {
  'All': [],
  'Shoes': ['Shoes', 'Running', 'Lifestyle', 'Sneakers', 'Skate', 'Basketball', 'Casual'],
  'Boots': ['Boots'],
  'Slides': ['Slides'],
  'Accessories': ['Accessories'],
  'Shoe Care': ['Shoe Care'],
  'Hoods': ['Hoods'],
  'Polo Shirts': ['Polo Shirts']
}

const categories = [
  { name: 'All', icon: '◉' },
  { name: 'Shoes', icon: '👟' },
  { name: 'Boots', icon: '🥾' },
  { name: 'Slides', icon: '🩴' },
  { name: 'Accessories', icon: '🎒' },
  { name: 'Shoe Care', icon: '✨' },
  { name: 'Hoods', icon: '🧥' },
  { name: 'Polo Shirts', icon: '👔' }
]

export default function CategoryFilter({ activeCategory, onSelect }) {
  return (
    <div className="bg-white border-b border-gray-100 sticky top- md:top- z-20 backdrop-blur-xl bg-white/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-2.5 overflow-x-auto px-3 py-3.5 scrollbar-hide">
          {categories.map((cat) => {
            const active = activeCategory === cat.name
            return (
              <button
                key={cat.name}
                onClick={() => onSelect(cat.name)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                  active? 'bg-black text-white border-black shadow-lg scale-[1.02]' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-white hover:text-black'
                }`}
              >
                <span>{cat.icon}</span> {cat.name}
                {active && <span className="w-1.5 h-1.5 bg-orange-500 rounded-full ml-1 animate-pulse"></span>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}