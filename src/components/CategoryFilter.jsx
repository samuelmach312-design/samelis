import React from 'react'

// Keep this export: other files import it to map a category to product types.
export const categoryMap = {
  'All': [],
  'Shoes': ['Shoes', 'Running', 'Lifestyle', 'Sneakers', 'Skate', 'Basketball', 'Casual'],
  'Boots': ['Boots'],
  'Slides': ['Slides'],
  'Accessories': ['Accessories'],
  'Shoe Care': ['Shoe Care'],
  'Hoods': ['Hoods'],
  'Polo Shirts': ['Polo Shirts'],
}

const categories = Object.keys(categoryMap)

export default function CategoryFilter({ activeCategory, onSelect }) {
  return (
    <nav aria-label="Product categories" className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3">
        {categories.map((name) => {
          const active = activeCategory === name
          return (
            <button
              key={name}
              onClick={() => onSelect(name)}
              aria-pressed={active}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'
              }`}
            >
              {name}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
