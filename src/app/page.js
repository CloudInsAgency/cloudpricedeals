'use client'
import { useState } from 'react'
import { LayoutGrid, List, TrendingDown, Shield, RefreshCw, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DealCard from '@/components/DealCard'
import EmailCapture from '@/components/EmailCapture'
import { DEALS, CATEGORIES } from '@/data/deals'
import { COMPARISONS } from '@/data/comparisons'
import ComparisonCard from '@/components/ComparisonCard'

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const filtered = activeCategory === 'all' ? DEALS : DEALS.filter(function(d) { return d.category === activeCategory })
  const hotDeals = DEALS.filter(function(d) { return d.badge === 'hot' }).slice(0, 4)
  const totalSavings = Math.round(DEALS.reduce(function(acc, d) { return acc + (d.originalPrice - d.price) }, 0))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', overflowX: 'hidden' }}>
      <Navbar />

      {/* ── TICKER ── */}
      <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', padding: '10px 0', overflow: 'hidden' }}>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[0,1].map(function(i) {
              return (
                <div key={i} style={{ display: 'flex' }}>
                  {DEALS.map(function(d) {
                    var pct = Math.round((d.originalPrice - d.price) / d.originalPrice * 100)
                    return (
                      <span key={d.id} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap', padding: '0 28px', borderRight: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {d.shortName}
                        <span style={{ color: 'var(--accent)', fontWeight: 700 }}>${d.price}</span>
                        <span style={{ color: 'var(--text-muted)' }}>↓{pct}%</span>
                      </span>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="mobile-stack">

          {/* Left: copy */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                Updated weekly · {DEALS.length} live deals
              </span>
            </div>
            <h1 className="fade-up fade-up-1" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(42px, 6vw, 76px)', color: 'var(--text-primary)', marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              Never<br />
              <span style={{ color: 'var(--accent)' }}>overpay</span><br />
              again.
            </h1>
            <p className="fade-up fade-up-2" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '36px', maxWidth: '440px' }}>
              We compare prices across Amazon, Best Buy, Walmart, Target and eBay every week — so you always buy at the lowest price.
            </p>
            <div className="fade-up fade-up-3" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/browse" style={{ background: 'var(--accent)', color: '#FFFFFF', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '13px 28px', borderRadius: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Browse All Deals <ChevronRight size={16} />
              </Link>
              <Link href="/guides" style={{ background: 'transparent', color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '12px 28px', borderRadius: '8px', border: '1px solid var(--border)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Buying Guides
              </Link>
            </div>
            <div className="fade-up fade-up-4" style={{ display: 'flex', gap: '32px', marginTop: '48px', flexWrap: 'wrap' }}>
              {[
                { value: DEALS.length + '+', label: 'Live Deals' },
                { value: '$' + totalSavings + '+', label: 'Total Savings' },
                { value: '5', label: 'Retailers' },
              ].map(function(s) {
                return (
                  <div key={s.label}>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', color: 'var(--accent)', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{s.label}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: top deals box */}
          <div className="hide-mobile fade-up fade-up-2">
            <div style={{ background: 'var(--accent-bg)', borderRadius: '20px', padding: '28px', border: '1px solid var(--border-accent)' }}>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>This week's top deals</p>

              {/* ── FEATURED deal — image 104x104 (doubled from 52) ── */}
              <div style={{ background: 'var(--bg-card)', borderRadius: '10px', padding: '16px', border: '1px solid var(--border)', display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ width: '104px', height: '104px', background: 'var(--bg-section)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                  <img
                    src={DEALS[0].imageUrl}
                    alt={DEALS[0].shortName}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
                    onError={function(e) { e.target.parentNode.innerHTML = '<span style="font-size:40px">' + DEALS[0].emoji + '</span>' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{DEALS[0].shortName}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: 'var(--accent)' }}>${DEALS[0].price}</span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>${DEALS[0].originalPrice}</span>
                  </div>
                </div>
                <span style={{ background: 'var(--accent-bg)', color: 'var(--accent)', border: '1px solid var(--border-accent)', fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '100px', flexShrink: 0 }}>
                  Hot
                </span>
              </div>

              {/* Other deals */}
              {DEALS.slice(1, 5).map(function(d) {
                return (
                  <div key={d.id} style={{ background: 'var(--bg-card)', borderRadius: '8px', padding: '10px 14px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, marginRight: '12px' }}>{d.shortName}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '18px', color: 'var(--accent)' }}>${d.price}</span>
                      <span style={{ background: 'var(--accent-bg)', color: 'var(--accent)', border: '1px solid var(--border-accent)', fontFamily: 'DM Sans, sans-serif', fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '100px' }}>
                        -{Math.round((d.originalPrice - d.price) / d.originalPrice * 100)}%
                      </span>
                    </div>
                  </div>
                )
              })}

              <Link href="/browse" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'var(--accent)', color: '#FFFFFF', textDecoration: 'none', padding: '12px', borderRadius: '8px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '4px' }}>
                See all {DEALS.length} deals <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Retailer pills */}
        <div className="fade-up fade-up-5" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '56px', paddingTop: '32px', borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Comparing at</span>
          {['Amazon','Best Buy','Walmart','Target','eBay'].map(function(r) {
            return (
              <span key={r} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '5px 14px', borderRadius: '100px' }}>{r}</span>
            )
          })}
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {[
            { icon: <RefreshCw size={16} />, text: 'Updated every week' },
            { icon: <TrendingDown size={16} />, text: 'Real price history tracked' },
            { icon: <Shield size={16} />, text: 'Honest affiliate disclosure' },
          ].map(function(t) {
            return (
              <div key={t.text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--accent)' }}>{t.icon}</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>{t.text}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── HOT DEALS ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>Hot this week</span>
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--text-primary)' }}>This week's best deals</h2>
          </div>
          <Link href="/browse" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }} className="grid-2-mobile">
          {hotDeals.map(function(deal, i) {
            return <DealCard key={deal.id} deal={deal} view="grid" delay={i} />
          })}
        </div>
      </section>

      {/* ── RETAILER COMPARISONS ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>Retailer Comparisons</span>
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--text-primary)', marginBottom: '8px' }}>Which retailer is actually cheaper?</h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: 'var(--text-secondary)' }}>We tracked daily prices to find out where each store wins.</p>
          </div>
          <Link href="/compare" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }} className="grid-2-mobile">
          {COMPARISONS.map(function(c) {
            return <ComparisonCard key={c.slug} comparison={c} />
          })}
        </div>
      </section>

      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 0' }}>
        <EmailCapture variant="banner" />
      </section>

      {/* ── BROWSE & COMPARE ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 96px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '10px' }}>All deals</p>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--text-primary)' }}>Browse & compare</h2>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={function() { setViewMode('grid') }} style={{ padding: '9px 12px', background: viewMode === 'grid' ? 'var(--accent)' : 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', color: viewMode === 'grid' ? '#FFFFFF' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}>
              <LayoutGrid size={16} />
            </button>
            <button onClick={function() { setViewMode('list') }} style={{ padding: '9px 12px', background: viewMode === 'list' ? 'var(--accent)' : 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', color: viewMode === 'list' ? '#FFFFFF' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}>
              <List size={16} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', overflowX: 'auto', marginBottom: '32px', borderBottom: '1px solid var(--border)', WebkitOverflowScrolling: 'touch' }}>
          {CATEGORIES.map(function(cat) {
            var isActive = activeCategory === cat.id
            return (
              <button key={cat.id} onClick={function() { setActiveCategory(cat.id) }} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: isActive ? 600 : 400, padding: '12px 18px', whiteSpace: 'nowrap', border: 'none', background: 'transparent', cursor: 'pointer', color: isActive ? 'var(--accent)' : 'var(--text-muted)', borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent', marginBottom: '-1px', transition: 'all 0.15s', flexShrink: 0 }}>
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
