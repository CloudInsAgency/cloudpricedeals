'use client'
import { useState } from 'react'
import { LayoutGrid, List, TrendingDown, Shield, RefreshCw, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DealCard from '@/components/DealCard'
import EmailCapture from '@/components/EmailCapture'
import { DEALS, CATEGORIES } from '@/data/deals'

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const filtered = activeCategory === 'all' ? DEALS : DEALS.filter(function(d) { return d.category === activeCategory })
  const hotDeals = DEALS.filter(function(d) { return d.badge === 'hot' }).slice(0, 4)
  const totalSavings = DEALS.reduce(function(acc, d) { return acc + (d.originalPrice - d.price) }, 0)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', overflowX: 'hidden' }}>
      <Navbar />

      {/* TICKER */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '10px 0', overflow: 'hidden' }}>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[0,1].map(function(i) {
              return (
                <div key={i} style={{ display: 'flex' }}>
                  {DEALS.map(function(d) {
                    var pct = Math.round((d.originalPrice - d.price) / d.originalPrice * 100)
                    return (
                      <span key={d.id} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 500, color: 'var(--text-2)', whiteSpace: 'nowrap', padding: '0 28px', borderRight: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {d.shortName}
                        <span style={{ color: 'var(--green)', fontWeight: 700 }}>${d.price}</span>
                        <span style={{ color: 'var(--text-3)' }}>↓{pct}%</span>
                      </span>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* HERO */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="mobile-stack">
          <div>
            <div className="section-eyebrow fade-up" style={{ marginBottom: '20px' }}>
              <span className="live-dot" />
              Updated weekly · {DEALS.length} live deals
            </div>
            <h1 className="fade-up fade-up-1" style={{ fontSize: 'clamp(42px, 6vw, 76px)', marginBottom: '24px', letterSpacing: '-0.02em' }}>
              Never<br />
              <span style={{ color: 'var(--green)' }}>overpay</span><br />
              again.
            </h1>
            <p className="fade-up fade-up-2" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '36px', maxWidth: '440px' }}>
              We compare prices across Amazon, Best Buy, Walmart, Target and eBay every week — so you always buy at the lowest price.
            </p>
            <div className="fade-up fade-up-3" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/browse" className="btn-primary">Browse All Deals <ChevronRight size={16} /></Link>
              <Link href="/guides" className="btn-secondary">Buying Guides</Link>
            </div>

            <div className="fade-up fade-up-4" style={{ display: 'flex', gap: '32px', marginTop: '48px', flexWrap: 'wrap' }}>
              {[
                { value: DEALS.length + '+', label: 'Live Deals' },
                { value: '$' + totalSavings + '+', label: 'Total Savings' },
                { value: '5', label: 'Retailers Compared' },
              ].map(function(s) {
                return (
                  <div key={s.label}>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', color: 'var(--green)', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-3)', marginTop: '4px' }}>{s.label}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="hide-mobile fade-up fade-up-2">
            <div style={{ position: 'relative', padding: '20px' }}>
              <div style={{ background: 'linear-gradient(135deg, rgba(0,208,132,0.15) 0%, rgba(59,130,246,0.08) 100%)', borderRadius: '24px', padding: '32px', border: '1px solid rgba(0,208,132,0.2)' }}>
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '12px' }}>This week's top deal</p>
                  <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '16px', border: '1px solid var(--border)', display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ width: '56px', height: '56px', background: 'var(--surface2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                      <img src={DEALS[0].imageUrl} alt={DEALS[0].shortName} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }} onError={function(e) { e.target.parentNode.innerHTML = '<span style="font-size:24px">' + DEALS[0].emoji + '</span>' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{DEALS[0].shortName}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: 'var(--green)' }}>${DEALS[0].price}</span>
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-3)', textDecoration: 'line-through' }}>${DEALS[0].originalPrice}</span>
                      </div>
                    </div>
                    <span className="badge-green">Hot</span>
                  </div>
                  {DEALS.slice(1, 4).map(function(d) {
                    return (
                      <div key={d.id} style={{ background: 'var(--surface)', borderRadius: '10px', padding: '12px 14px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, marginRight: '12px' }}>{d.shortName}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                          <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '18px', color: 'var(--green)' }}>${d.price}</span>
                          <span className="badge-green">-{Math.round((d.originalPrice - d.price) / d.originalPrice * 100)}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <Link href="/browse" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                  See all {DEALS.length} deals <ChevronRight size={15} />
                </Link>
              </div>

              <div style={{ position: 'absolute', top: '-10px', right: '30px', background: 'var(--green)', color: '#0A0E1A', fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, padding: '6px 14px', borderRadius: '100px', letterSpacing: '0.06em' }}>
                LIVE PRICES
              </div>
            </div>
          </div>
        </div>

        <div className="fade-up fade-up-5" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '56px', paddingTop: '32px', borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Comparing at</span>
          {['Amazon','Best Buy','Walmart','Target','eBay'].map(function(r) {
            return (
              <span key={r} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: 'var(--text-2)', background: 'var(--surface)', border: '1px solid var(--border)', padding: '5px 14px', borderRadius: '100px' }}>{r}</span>
            )
          })}
        </div>
      </section>

      {/* TRUST STRIP */}
      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {[
            { icon: <RefreshCw size={18} />, text: 'Updated every week' },
            { icon: <TrendingDown size={18} />, text: 'Real price history tracked' },
            { icon: <Shield size={18} />, text: 'Honest affiliate disclosure' },
          ].map(function(t) {
            return (
              <div key={t.text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--green)' }}>{t.icon}</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 500, color: 'var(--text-2)' }}>{t.text}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* HOT DEALS */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p className="section-eyebrow" style={{ marginBottom: '10px' }}>
              <span className="live-dot" /> Hot this week
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>This week's best deals</h2>
          </div>
          <Link href="/browse" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--green)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }} className="grid-2-mobile">
          {hotDeals.map(function(deal, i) {
            return <DealCard key={deal.id} deal={deal} view="grid" delay={i} />
          })}
        </div>
      </section>

      {/* EMAIL */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 0' }}>
        <EmailCapture variant="banner" />
      </section>

      {/* ALL DEALS */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 96px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p className="section-eyebrow" style={{ marginBottom: '10px' }}>All deals</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>Browse & compare</h2>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={function() { setViewMode('grid') }} style={{ padding: '9px 12px', background: viewMode === 'grid' ? 'var(--green)' : 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', color: viewMode === 'grid' ? '#0A0E1A' : 'var(--text-2)', display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}>
              <LayoutGrid size={16} />
            </button>
            <button onClick={function() { setViewMode('list') }} style={{ padding: '9px 12px', background: viewMode === 'list' ? 'var(--green)' : 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', color: viewMode === 'list' ? '#0A0E1A' : 'var(--text-2)', display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}>
              <List size={16} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0', overflowX: 'auto', marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '0', WebkitOverflowScrolling: 'touch' }}>
          {CATEGORIES.map(function(cat) {
            var isActive = activeCategory === cat.id
            return (
              <button key={cat.id} onClick={function() { setActiveCategory(cat.id) }} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: isActive ? 600 : 400, padding: '12px 18px', whiteSpace: 'nowrap', border: 'none', background: 'transparent', cursor: 'pointer', color: isActive ? 'var(--green)' : 'var(--text-3)', borderBottom: isActive ? '2px solid var(--green)' : '2px solid transparent', marginBottom: '-1px', transition: 'all 0.15s', flexShrink: 0 }}>
                {cat.emoji} {cat.label}
              </button>
            )
          })}
        </div>

        {viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }} className="grid-2-mobile">
            {filtered.map(function(deal, i) {
              return <DealCard key={deal.id} deal={deal} view="grid" delay={i} />
            })}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filtered.map(function(deal, i) {
              return <DealCard key={deal.id} deal={deal} view="list" delay={i} />
            })}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
