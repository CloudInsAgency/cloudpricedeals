'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DealCard from '@/components/DealCard'
import { DEALS, CATEGORIES, RETAILERS } from '@/data/deals'

export default function BrowsePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeRetailer, setActiveRetailer] = useState('all')
  const [sortBy, setSortBy] = useState('savings')

  const filtered = DEALS
    .filter(d => activeCategory === 'all' || d.category === activeCategory)
    .filter(d => activeRetailer === 'all' || d.retailer === activeRetailer)
    .sort((a, b) => {
      if (sortBy === 'savings') return (b.originalPrice - b.price) / b.originalPrice - (a.originalPrice - a.price) / a.originalPrice
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="font-display font-bold text-3xl text-ink mb-1">Browse deals</h1>
          <p className="text-gray-400 text-sm">{filtered.length} deals across {Object.keys(RETAILERS).length} retailers</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">

          <div className="md:w-52 shrink-0">
            <div className="card p-4 mb-3">
              <p className="section-label">Category</p>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm text-left transition-colors ${
                      activeCategory === cat.id ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span style={{ fontSize: '13px' }}>{cat.emoji}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="card p-4 mb-3">
              <p className="section-label">Retailer</p>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setActiveRetailer('all')}
                  className={`px-2.5 py-1.5 rounded-lg text-sm text-left transition-colors ${activeRetailer === 'all' ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  All retailers
                </button>
                {Object.entries(RETAILERS).map(([key, r]) => (
                  <button
                    key={key}
                    onClick={() => setActiveRetailer(key)}
                    className={`px-2.5 py-1.5 rounded-lg text-sm text-left transition-colors ${activeRetailer === key ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="card p-4">
              <p className="section-label">Sort by</p>
              <div className="flex flex-col gap-1">
                {[
                  { id: 'savings',    label: 'Biggest savings' },
                  { id: 'price-low',  label: 'Price: low to high' },
                  { id: 'price-high', label: 'Price: high to low' },
                  { id: 'rating',     label: 'Highest rated' },
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSortBy(s.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-sm text-left transition-colors ${sortBy === s.id ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="card p-12 text-center">
                <p className="text-gray-400 text-sm">No deals match these filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {filtered.map((deal, i) => (
                  <DealCard key={deal.id} deal={deal} view="grid" delay={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
