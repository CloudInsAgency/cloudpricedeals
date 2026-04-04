'use client'
import { useState } from 'react'
import { Flame, TrendingUp, LayoutGrid, List, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DealCard from '@/components/DealCard'
import EmailCapture from '@/components/EmailCapture'
import { DEALS, CATEGORIES, RETAILERS } from '@/data/deals'

const RETAILERS_LIST = ['amazon','bestbuy','walmart','target','ebay']

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const filtered = activeCategory === 'all' ? DEALS : DEALS.filter(d => d.category === activeCategory)
  const hotDeals = DEALS.filter(d => d.badge === 'hot').slice(0, 4)

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <Navbar />

      {/* Ticker */}
      <div style={{ background: '#0D1B2A', padding: '10px 0', overflow: 'hidden' }}>
        <div className="marquee-wrap">
          <div className="marquee-track" style={{ gap: '0' }}>
            {[...Array(2)].map((_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                {DEALS.map(d => (
                  <span key={d.id} style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', fontWeight: 300, color: '#7B93A8', whiteSpace: 'nowrap', padding: '0 32px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                    {d.shortName} <span style={{ color: '#2B7CD3', fontWeight: 500 }}>${d.price}</span>
                    <span style={{ color: '#3D5166' }}> · save {Math.round((d.originalPrice-d.price)/d.originalPrice*100)}%</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div>
            <p className="section-label fade-up" style={{ marginBottom: '20px' }}>Updated weekly · 8 new deals this week</p>
            <h1 className="fade-up fade-up-1" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 500, color: '#0D1B2A', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '24px' }}>
              Real deals.<br />
              <em style={{ color: '#185FA5' }}>All stores<br />compared.</em>
            </h1>
            <p className="fade-up fade-up-2" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '17px', fontWeight: 300, color: '#3D5166', lineHeight: '1.7', marginBottom: '36px', maxWidth: '420px' }}>
              $50–$150 deals across Amazon, Best Buy, Walmart, Target & eBay — curated weekly so you always get the best price.
            </p>
            <div className="fade-up fade-up-3" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/browse" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#185FA5', color: 'white', textDecoration: 'none', padding: '14px 28px', borderRadius: '100px', fontFamily: 'Outfit, sans-serif', fontSize: '14px', fontWeight: 500 }}>
                Browse all deals <ArrowRight size={15} />
              </Link>
              <Link href="/wishlist" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: '#185FA5', textDecoration: 'none', padding: '13px 28px', borderRadius: '100px', fontFamily: 'Outfit, sans-serif', fontSize: '14px', fontWeight: 500, border: '1.5px solid #185FA5' }}>
                My wishlists
              </Link>
            </div>
          </div>

          {/* Hero stats */}
          <div className="fade-up fade-up-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { num: '5', label: 'Major retailers', sub: 'Amazon · Best Buy · Walmart · Target · eBay' },
              { num: '$50–$150', label: 'Sweet spot', sub: 'Real purchases, real savings' },
              { num: 'Weekly', label: 'Deal refresh', sub: 'Fresh deals every Monday' },
              { num: '100%', label: 'Free to use', sub: 'No subscription, ever' },
            ].map((s, i) => (
              <div key={s.label} className={`fade-up fade-up-${i+2}`} style={{ background: i === 0 ? '#0D1B2A' : '#EBF3FC', borderRadius: '16px', padding: '24px', border: i === 0 ? 'none' : '1px solid rgba(24,95,165,0.1)' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 600, color: i === 0 ? '#85B7EB' : '#185FA5', lineHeight: 1, marginBottom: '6px' }}>{s.num}</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', fontWeight: 500, color: i === 0 ? 'white' : '#0D1B2A', marginBottom: '4px' }}>{s.label}</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '11px', fontWeight: 300, color: i === 0 ? '#7B93A8' : '#7B93A8', lineHeight: '1.5' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retailer logos strip */}
      <div style={{ borderTop: '1px solid rgba(24,95,165,0.08)', borderBottom: '1px solid rgba(24,95,165,0.08)', padding: '18px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7B93A8', marginRight: '8px' }}>Comparing prices at</span>
          {[
            { name: 'Amazon', bg: '#FFF3E0', color: '#7A4100' },
            { name: 'Best Buy', bg: '#E6F1FB', color: '#0C447C' },
            { name: 'Walmart', bg: '#EAF3DE', color: '#27500A' },
            { name: 'Target', bg: '#FAECE7', color: '#712B13' },
            { name: 'eBay', bg: '#EEEDFE', color: '#26215C' },
          ].map(r => (
            <span key={r.name} style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', fontWeight: 700, padding: '5px 14px', borderRadius: '8px', background: r.bg, color: r.color, letterSpacing: '0.02em' }}>{r.name}</span>
          ))}
        </div>
      </div>

      {/* Hot deals */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <p className="section-label" style={{ marginBottom: '6px' }}>🔥 Hot today</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '42px', fontWeight: 500, color: '#0D1B2A', letterSpacing: '-0.02em' }}>This week's best</h2>
          </div>
          <Link href="/browse" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', fontWeight: 500, color: '#185FA5', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
            View all <ArrowRight size={13} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
          {hotDeals.map((deal, i) => <DealCard key={deal.id} deal={deal} view="grid" delay={i} />)}
        </div>
      </section>

      {/* Email capture */}
      <section style={{ maxWidth: '1200px', margin: '64px auto 0', padding: '0 24px' }}>
        <EmailCapture variant="banner" />
      </section>

      {/* All deals */}
      <section style={{ maxWidth: '1200px', margin: '64px auto 0', padding: '0 24px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p className="section-label" style={{ marginBottom: '6px' }}>All deals</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '42px', fontWeight: 500, color: '#0D1B2A', letterSpacing: '-0.02em' }}>Browse & compare</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={() => setViewMode('grid')} style={{ padding: '8px', borderRadius: '10px', background: viewMode === 'grid' ? '#EBF3FC' : 'transparent', border: 'none', cursor: 'pointer', color: viewMode === 'grid' ? '#185FA5' : '#7B93A8', display: 'flex', alignItems: 'center' }}>
              <LayoutGrid size={16} />
            </button>
            <button onClick={() => setViewMode('list')} style={{ padding: '8px', borderRadius: '10px', background: viewMode === 'list' ? '#EBF3FC' : 'transparent', border: 'none', cursor: 'pointer', color: viewMode === 'list' ? '#185FA5' : '#7B93A8', display: 'flex', alignItems: 'center' }}>
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '32px' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontFamily: 'Outfit, sans-serif', fontSize: '13px', fontWeight: activeCategory === cat.id ? 500 : 300,
              padding: '8px 18px', borderRadius: '100px', whiteSpace: 'nowrap', border: 'none', cursor: 'pointer',
              background: activeCategory === cat.id ? '#185FA5' : 'white',
              color: activeCategory === cat.id ? 'white' : '#3D5166',
              boxShadow: activeCategory === cat.id ? 'none' : '0 0 0 1px rgba(24,95,165,0.15)',
              transition: 'all 0.15s ease',
            }}>
              <span style={{ fontSize: '13px' }}>{cat.emoji}</span> {cat.label}
            </button>
          ))}
        </div>

        {viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {filtered.map((deal, i) => <DealCard key={deal.id} deal={deal} view="grid" delay={i} />)}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filtered.map((deal, i) => <DealCard key={deal.id} deal={deal} view="list" delay={i} />)}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
