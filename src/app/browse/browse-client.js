'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DealCard from '@/components/DealCard'
import { InlineAffiliateDisclosure } from '@/components/AffiliateDisclosure'
import { DEALS, CATEGORIES, RETAILERS } from '@/data/deals'

const CHIP_VARIANTS = ['color-block-sand', 'color-block-sage', 'color-block-blush', 'color-block-slate']
function chipVariant(id) {
  var hash = 0
  for (var i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  return CHIP_VARIANTS[hash % CHIP_VARIANTS.length]
}

export default function BrowsePage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialCat = (function() {
    const c = searchParams.get('cat')
    if (!c) return 'all'
    const valid = CATEGORIES.some(function(x) { return x.id === c })
    return valid ? c : 'all'
  })()

  const initialRetailer = (function() {
    const r = searchParams.get('retailer')
    if (!r) return 'all'
    return RETAILERS[r] ? r : 'all'
  })()

  const [activeCategory, setActiveCategory] = useState(initialCat)
  const [activeRetailer, setActiveRetailer] = useState(initialRetailer)
  const [sortBy, setSortBy] = useState('savings')

  // Keep state in sync if user uses browser back/forward.
  useEffect(function() {
    const c = searchParams.get('cat')
    if (c && CATEGORIES.some(function(x) { return x.id === c })) {
      setActiveCategory(c)
    } else if (!c) {
      setActiveCategory('all')
    }
    const r = searchParams.get('retailer')
    if (r && RETAILERS[r]) {
      setActiveRetailer(r)
    } else if (!r) {
      setActiveRetailer('all')
    }
  }, [searchParams])

  function selectCategory(catId) {
    setActiveCategory(catId)
    const params = new URLSearchParams(searchParams.toString())
    if (catId === 'all') params.delete('cat')
    else params.set('cat', catId)
    const qs = params.toString()
    router.replace(qs ? pathname + '?' + qs : pathname, { scroll: false })
  }

  function selectRetailer(retailerId) {
    setActiveRetailer(retailerId)
    const params = new URLSearchParams(searchParams.toString())
    if (retailerId === 'all') params.delete('retailer')
    else params.set('retailer', retailerId)
    const qs = params.toString()
    router.replace(qs ? pathname + '?' + qs : pathname, { scroll: false })
  }

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

  const activeCatLabel = (function() {
    var c = CATEGORIES.find(function(x) { return x.id === activeCategory })
    return c ? c.label : 'All deals'
  })()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)' }}>
      <Navbar />

      {/* Hero band */}
      <div style={{ background: 'var(--bg-section)', borderBottom: '1px solid var(--border)', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>
            Browse the catalog
          </p>
          <h1 style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: 'clamp(36px, 6vw, 64px)', color: 'var(--text-primary)', lineHeight: 1.05, marginBottom: '14px' }}>
            {activeCategory === 'all' ? 'All ' + DEALS.length + ' deals' : activeCatLabel + ' deals'}
          </h1>
          <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', maxWidth: '640px' }}>
            {filtered.length} live · Amazon prices verified weekly.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 24px 0' }}>
        <Link href="/compare" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '16px 22px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', textDecoration: 'none', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', padding: '4px 10px', background: 'var(--accent)', color: '#FFFFFF', borderRadius: '100px' }}>New</span>
            <span style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: '18px', color: 'var(--text-primary)' }}>Compare prices across retailers</span>
            <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)' }}>See which store is actually cheaper, by category.</span>
          </div>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, color: 'var(--accent)', whiteSpace: 'nowrap' }}>
            View comparisons <ChevronRight size={14} />
          </span>
        </Link>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px 96px' }}>

        {/* Category chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {CATEGORIES.map(function(cat) {
            var isActive = activeCategory === cat.id
            var variant = chipVariant(cat.id)
            return (
              <button
                key={cat.id}
                onClick={function() { selectCategory(cat.id) }}
                className={isActive ? '' : variant}
                style={{
                  fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 500,
                  padding: '10px 18px',
                  minHeight: '44px',
                  border: '1px solid ' + (isActive ? 'var(--accent)' : 'var(--border)'),
                  borderRadius: '100px',
                  cursor: 'pointer',
                  color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                  background: isActive ? 'var(--accent)' : undefined,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s',
                }}
              >
                <span aria-hidden="true">{cat.emoji}</span> {cat.label}
              </button>
            )
          })}
        </div>

        {/* Retailer + sort row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginRight: '6px' }}>Retailer</span>
            <button onClick={function() { selectRetailer('all') }} style={pillStyle(activeRetailer === 'all')}>All</button>
            {Object.entries(RETAILERS).map(function(entry) {
              var key = entry[0]
              var r = entry[1]
              return (
                <button key={key} onClick={function() { selectRetailer(key) }} style={pillStyle(activeRetailer === key)}>{r.label}</button>
              )
            })}
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <label htmlFor="sort" style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Sort</label>
            <select
              id="sort"
              value={sortBy}
              onChange={function(e) { setSortBy(e.target.value) }}
              style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 14px', cursor: 'pointer', minHeight: '44px' }}
            >
              <option value="savings">Biggest savings</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="rating">Highest rated</option>
            </select>
          </div>
        </div>

        <InlineAffiliateDisclosure />

        {filtered.length === 0 ? (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '64px 24px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: '24px', color: 'var(--text-primary)', marginBottom: '8px' }}>No deals match these filters</p>
            <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>Try a broader category or clear the retailer filter.</p>
            <button onClick={function() { selectCategory('all'); selectRetailer('all') }} className="btn-secondary">Reset filters</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }} className="grid-2-mobile">
            {filtered.map((deal, i) => (
              <DealCard key={deal.id} deal={deal} view="grid" delay={i} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

function pillStyle(active) {
  return {
    fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
    fontSize: '13px',
    fontWeight: active ? 700 : 500,
    padding: '8px 16px',
    minHeight: '36px',
    border: '1px solid ' + (active ? 'var(--accent)' : 'var(--border)'),
    borderRadius: '100px',
    cursor: 'pointer',
    color: active ? '#FFFFFF' : 'var(--text-secondary)',
    background: active ? 'var(--accent)' : 'var(--bg-card)',
    transition: 'all 0.15s',
  }
}
