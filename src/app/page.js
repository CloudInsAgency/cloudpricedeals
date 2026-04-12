'use client'
import { useState } from 'react'
import { LayoutGrid, List, TrendingDown, Shield, RefreshCw, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DealCard from '@/components/DealCard'
import EmailCapture from '@/components/EmailCapture'
import { DEALS, CATEGORIES } from '@/data/deals'

var btnPrimary = { background: '#00D084', color: '#0A0E1A', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '13px 28px', borderRadius: '8px', border: 'none', cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }
var btnSecondary = { background: 'transparent', color: '#F0F4FF', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '12px 28px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.14)', cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }
var badgeGreen = { background: 'rgba(0,208,132,0.12)', color: '#00D084', border: '1px solid rgba(0,208,132,0.25)', fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '100px', display: 'inline-flex', alignItems: 'center', gap: '4px' }
var eyebrow = { fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#00D084', display: 'flex', alignItems: 'center', gap: '8px' }

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const filtered = activeCategory === 'all' ? DEALS : DEALS.filter(function(d) { return d.category === activeCategory })
  const hotDeals = DEALS.filter(function(d) { return d.badge === 'hot' }).slice(0, 4)
  const totalSavings = DEALS.reduce(function(acc, d) { return acc + (d.originalPrice - d.price) }, 0)

  return (
    <div style={{ minHeight: '100vh', background: '#0A0E1A', overflowX: 'hidden', width: '100%' }}>
      <Navbar />

      {/* TICKER */}
      <div style={{ background: '#111827', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '10px 0', overflow: 'hidden' }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ animation: 'marquee 35s linear infinite', display: 'flex', width: 'max-content' }}>
            {[0,1].map(function(i) {
              return (
                <div key={i} style={{ display: 'flex' }}>
                  {DEALS.map(function(d) {
                    var pct = Math.round((d.originalPrice - d.price) / d.originalPrice * 100)
                    return (
                      <span key={d.id} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 500, color: '#94A3B8', whiteSpace: 'nowrap', padding: '0 28px', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        {d.shortName}
                        <span style={{ color: '#00D084', fontWeight: 700 }}>${d.price}</span>
                        <span style={{ color: '#475569' }}>↓{pct}%</span>
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
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 64px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '64px', alignItems: 'center' }} className="cpd-hero-grid">
          <div>
            <div style={{ ...eyebrow, marginBottom: '20px' }} className="fade-up">
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00D084', display: 'inline-block', flexShrink: 0 }} />
              Updated weekly · {DEALS.length} live deals
            </div>

            <h1 className="fade-up" style={{ fontSize: 'clamp(42px, 6vw, 76px)', marginBottom: '24px', letterSpacing: '-0.02em', fontFamily: 'DM Serif Display, serif', color: '#F0F4FF', lineHeight: 1.1 }}>
              Never<br />
              <span style={{ color: '#00D084' }}>overpay</span><br />
              again.
            </h1>

            <p className="fade-up" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: '#94A3B8', lineHeight: 1.7, marginBottom: '36px', maxWidth: '440px' }}>
              We compare prices across Amazon, Best Buy, Walmart, Target and eBay every week — so you always buy at the lowest price.
            </p>

            <div className="fade-up" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/browse" style={btnPrimary}>Browse All Deals <ChevronRight size={16} /></Link>
              <Link href="/guides" style={btnSecondary}>Buying Guides</Link>
            </div>

            <div className="fade-up" style={{ display: 'flex', gap: '32px', marginTop: '48px', flexWrap: 'wrap' }}>
              {[
                { value: DEALS.length + '+', label: 'Live Deals' },
                { value: '$' + totalSavings + '+', label: 'Total Savings' },
                { value: '5', label: 'Retailers Compared' },
              ].map(function(s) {
                return (
                  <div key={s.label}>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', color: '#00D084', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#475569', marginTop: '4px' }}>{s.label}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* HERO CARD — hidden on mobile */}
          <div className="cpd-hero-card fade-up">
            <div style={{ position: 'relative', padding: '20px' }}>
              <div style={{ background: 'linear-gradient(135deg, rgba(0,208,132,0.12) 0%, rgba(59,130,246,0.06) 100%)', borderRadius: '24px', padding: '28px', border: '1px solid rgba(0,208,132,0.2)' }}>

                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#475569', marginBottom: '14px' }}>This week's top deal</p>

                <div style={{ background: '#111827', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ width: '56px', height: '56px', background: '#1A2235', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                    <img src={DEALS[0].imageUrl} alt={DEALS[0].shortName} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }}
                      onError={function(e) { e.target.parentNode.innerHTML = '<span style="font-size:24px">' + DEALS[0].emoji + '</span>' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#F0F4FF', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{DEALS[0].shortName}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: '#00D084' }}>${DEALS[0].price}</span>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#475569', textDecoration: 'line-through' }}>${DEALS[0].originalPrice}</span>
                    </div>
                  </div>
                  <span style={badgeGreen}>Hot</span>
                </div>

                {DEALS.slice(1, 4).map(function(d) {
                  var pct = Math.round((d.originalPrice - d.price) / d.originalPrice * 100)
                  return (
                    <div key={d.id} style={{ background: '#111827', borderRadius: '10px', padding: '12px 14px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, marginRight: '12px' }}>{d.shortName}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '18px', color: '#00D084' }}>${d.price}</span>
                        <span style={badgeGreen}>-{pct}%</span>
                      </div>
                    </div>
                  )
                })}

                <Link href="/browse" style={{ ...btnPrimary, width: '100%', justifyContent: 'center', padding: '12px', marginTop: '8px', boxSizing: 'border-box' }}>
                  See all {DEALS.length} deals <ChevronRight size={15} />
                </Link>
              </div>

              <div style={{ position: 'absolute', top: '8px', right: '38px', background: '#00D084', color: '#0A0E1A', fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '100px', letterSpacing: '0.06em' }}>
                LIVE PRICES
              </div>
            </div>
          </div>
        </div>

        {/* RETAILER BADGES */}
        <div className="fade-up" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#475569', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Comparing at</span>
          {['Amazon','Best Buy','Walmart','Target','eBay'].map(function(r) {
            return (
              <span key={r} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#94A3B8', background: '#111827', border: '1px solid rgba(255,255,255,0.08)', padding: '5px 14px', borderRadius: '100px' }}>{r}</span>
            )
          })}
        </div>
      </section>

      {/* TRUST STRIP */}
      <div style={{ background: '#111827', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          {[
            { icon: <RefreshCw size={17} color="#00D084" />, text: 'Updated every week' },
            { icon: <TrendingDown size={17} color="#00D084" />, text: 'Real price history tracked' },
            { icon: <Shield size={17} color="#00D084" />, text: 'Honest affiliate disclosure' },
          ].map(function(t) {
            return (
              <div key={t.text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {t.icon}
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 500, color: '#94A3B8' }}>{t.text}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* HOT DEALS */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 0', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: '10px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00D084', display: 'inline-block' }} />
              Hot this week
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px, 4vw, 42px)', color: '#F0F4FF' }}>This week's best deals</h2>
          </div>
          <Link href="/browse" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: '#00D084', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {hotDeals.map(function(deal, i) {
            return <DealCard key={deal.id} deal={deal} view="grid" delay={i} />
          })}
        </div>
      </section>

      {/* EMAIL */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 0', width: '100%', boxSizing: 'border-box' }}>
        <EmailCapture variant="banner" />
      </section>

      {/* ALL DEALS */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 96px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ ...eyebrow, marginBottom: '10px' }}>All deals</div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px, 4vw, 42px)', color: '#F0F4FF' }}>Browse & compare</h2>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={function() { setViewMode('grid') }} style={{ padding: '9px 12px', background: viewMode === 'grid' ? '#00D084' : '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', cursor: 'pointer', color: viewMode === 'grid' ? '#0A0E1A' : '#94A3B8', display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}>
              <LayoutGrid size={16} />
            </button>
            <button onClick={function() { setViewMode('list') }} style={{ padding: '9px 12px', background: viewMode === 'list' ? '#00D084' : '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', cursor: 'pointer', color: viewMode === 'list' ? '#0A0E1A' : '#94A3B8', display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}>
              <List size={16} />
            </button>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div style={{ display: 'flex', gap: '0', overflowX: 'auto', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.08)', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
          {CATEGORIES.map(function(cat) {
            var isActive = activeCategory === cat.id
            return (
              <button key={cat.id} onClick={function() { setActiveCategory(cat.id) }} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: isActive ? 600 : 400, padding: '12px 18px', whiteSpace: 'nowrap', border: 'none', background: 'transparent', cursor: 'pointer', color: isActive ? '#00D084' : '#475569', borderBottom: isActive ? '2px solid #00D084' : '2px solid transparent', marginBottom: '-1px', transition: 'all 0.15s', flexShrink: 0 }}>
                {cat.emoji} {cat.label}
              </button>
            )
          })}
        </div>

        {viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
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

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .fade-up { animation: fadeUp 0.6s ease both; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cpd-hero-grid { grid-template-columns: minmax(0,1fr) minmax(0,1fr); }
        .cpd-hero-card { display: block; }
        @media (max-width: 768px) {
          .cpd-hero-grid { grid-template-columns: 1fr !important; }
          .cpd-hero-card { display: none !important; }
        }
      `}</style>
    </div>
  )
}
