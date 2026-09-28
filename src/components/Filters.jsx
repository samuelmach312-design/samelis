import React from 'react'

const field =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100'

export default function Filters({
  search, setSearch,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  selectedBrands, toggleBrand, allBrands,
  resetFilters, onClose,
}) {
  return (
    <div className="flex h-fit flex-col gap-6 rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Filters</h3>
        {onClose && (
          <button onClick={onClose} aria-label="Close filters" className="rounded-full px-2.5 py-1 text-lg leading-none text-slate-500 hover:bg-slate-100 lg:hidden">
            &times;
          </button>
        )}
      </div>

      <div>
        <label htmlFor="filter-search" className="mb-2 block text-sm font-medium text-slate-700">Search</label>
        <input id="filter-search" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Product name" className={field} />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Price (KES)</p>
        <div className="flex items-center gap-2">
          <input type="number" min="0" inputMode="numeric" aria-label="Minimum price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min" className={field} />
          <span className="text-sm text-slate-400">to</span>
          <input type="number" min="0" inputMode="numeric" aria-label="Maximum price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max" className={field} />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700">Brand</p>
          {selectedBrands.length > 0 && <span className="text-xs font-medium text-blue-600">{selectedBrands.length} selected</span>}
        </div>
        <div className="max-h-64 space-y-1 overflow-y-auto">
          {allBrands.map((brand) => (
            <label key={brand} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-slate-50">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="h-4 w-4 rounded border-slate-300 accent-blue-600"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <button onClick={resetFilters} className="w-full rounded-lg border border-slate-300 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
        Clear filters
      </button>
    </div>
  )
}
