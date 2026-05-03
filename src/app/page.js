'use client'
import { useState } from 'react'
import { LayoutGrid, List, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DealCard from '@/components/DealCard'
import EmailCapture from '@/components/EmailCapture'
import SectionHeading from '@/components/SectionHeading'
import CategoryTile from '@/components/CategoryTile'
import TrustSection from '@/components/TrustSection'
import HeroTile from '@/components/HeroTile'
import RetailerRow from '@/components/RetailerRow'
import { DEALS, CATEGORIES } from '@/data/deals'
import { COMPARISONS } from '@/data/comparisons'
import ComparisonCard from '@/components/ComparisonCard'
import { InlineAffiliateDisclosure } from '@/components/AffiliateDisclosure'

// Saturated tile palette + distinct corner badges for the homepage hero.
const HERO_TILE_CONFIG = [
  { variant: 'sage',   badgeLabel: 'Up to 60% Off' },
  { variant: 'blush',  badgeLabel: 'Trending' },
  { variant: 'sienna', badgeLabel: 'Ends Soon' },
]

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const filtered = activeCategory === 'all' ? DEALS : DEALS.filter(function(d) { return d.category === activeCategory })

  // Editor's picks: top 3 hot deals (or top 3 by discount % if fewer than 3 are flagged hot)
  const editorPicks = (function() {
    var hot = DEALS.filter(function(d) { return d.badge === 'hot' })
    if (hot.length >= 3) return hot.slice(0, 3)
    var byDiscount = DEALS.slice().sort(function(a, b) {
      return (b.originalPrice - b.price) / b.originalPrice - (a.originalPrice - a.price) / a.originalPrice
    })
    return byDiscount.slice(0, 3)
  })()

  // Top deals grid: 4 cards, biggest savings first
  const topDeals = DEALS.slice().sort(function(a, b) {
    return (b.originalPrice - b.price) / b.originalPrice - (a.originalPrice - a.price) / a.originalPrice
  }).slice(0, 4)

  // Trending: hot-flagged or 30%+ off, capped at 6
  const trending = DEALS.filter(function(d) {
    var pct = (d.originalPrice - d.price) / d.originalPrice
    return d.badge === 'hot' || pct >= 0.30
  }).slice(0, 6)

  // Last chance: deals updated longest ago (proxy for "been live the longest")
  const lastChance = DEALS.slice().sort(function(a, b) {
    return String(a.updatedAt || '').localeCompare(String(b.updatedAt || ''))
  }).slice(0, 3)

  // Counts per category for the Shop-by-Category tiles (excluding 'all')
  const categoryCounts = (function() {
    var map = {}
    for (var i = 0; i < DEALS.length; i++) {
      var c = DEALS[i].category
      map[c] = (map[c] || 0) + 1
    }
    return map
  })()

  const tileVariants = ['sage', 'blush', 'slate', 'sand', 'sage', 'blush']

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
                      <span key={d.id} style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap', padding: '0 28px', borderRight: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
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

      {/* ── HERO: massive wordmark + 3 large product tiles ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px 16px' }}>

        {/* Massive centered wordmark — the brand statement at the top of the page. */}
        <h1
          className="fade-up fade-up-1 hero-wordmark"
          style={{
            fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
            color: '#1F4E3D',
            textAlign: 'center',
            letterSpacing: '-0.025em',
            lineHeight: 0.95,
            margin: '0 auto 28px',
            fontSize: 'clamp(56px, 12vw, 128px)',
          }}
        >
          CloudPriceDeals
        </h1>

        {/* Tight subtitle — supports the products, doesn't lead. */}
        <div className="fade-up fade-up-2" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="live-dot" />
            <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>
              Updated weekly · {DEALS.length} live deals
            </span>
          </div>
          <p style={{
            fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
            fontSize: 'clamp(15px, 1.6vw, 18px)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '620px',
            margin: '0 auto',
          }}>
            Curated, expiring Amazon finds most shoppers never see — cross-checked against Best Buy, Walmart, Target and eBay each week.
          </p>
        </div>

        {/* 3 LARGE color-blocked product tiles in a horizontal row */}
        <div
          className="hero-tile-grid fade-up fade-up-3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '18px',
          }}
        >
          {editorPicks.map(function(d, i) {
            var cfg = HERO_TILE_CONFIG[i % HERO_TILE_CONFIG.length]
            return (
              <HeroTile
                key={d.id}
                deal={d}
                variant={cfg.variant}
                badgeLabel={cfg.badgeLabel}
                priority={i === 0}
              />
            )
          })}
        </div>

        {/* Inline FTC affiliate disclosure stays under the hero tiles */}
        <div style={{ marginTop: '24px' }}>
          <InlineAffiliateDisclosure />
        </div>
      </section>

      {/* ── SHOP BY RETAILER (icon-row navigation under the hero) ── */}
      <RetailerRow />

      <style>{`
        .hero-tile { box-shadow: 0 6px 24px rgba(26,26,26,0.06); }
        .hero-tile:hover { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(26,26,26,0.12); }
        @media (max-width: 900px) {
          .hero-tile-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── TODAY'S TOP DEALS ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px 0' }}>
        <SectionHeading
          eyebrow="Today's top deals"
          title="The four biggest savings right now"
          subhead="Cross-checked against the retailer's own listing today. If a price slips, the deal comes off the grid."
          linkHref="/browse"
          linkLabel="View all"
        />
        <InlineAffiliateDisclosure />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }} className="grid-2-mobile">
          {topDeals.map(function(deal, i) {
            return <DealCard key={deal.id} deal={deal} view="grid" delay={i} />
          })}
        </div>
      </section>

      {/* ── SHOP BY CATEGORY ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px 0' }}>
        <SectionHeading
          eyebrow="Shop by category"
          title="Pick a room. We'll show the deals."
          subhead="Filtered to the categories shoppers actually use the most. Each link drops you straight onto a pre-filtered grid."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }} className="grid-2-mobile">
          {CATEGORIES.filter(function(c) { return c.id !== 'all' }).map(function(cat, i) {
            return (
              <CategoryTile
                key={cat.id}
                category={cat}
                count={categoryCounts[cat.id] || 0}
                variant={tileVariants[i % tileVariants.length]}
              />
            )
          })}
        </div>
      </section>

      {/* ── TRENDING NOW ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px 0' }}>
        <SectionHeading
          eyebrow="Trending now"
          title="Moving fastest this week"
          subhead="Hot-flagged picks and steep discounts that have caught shopper attention since Monday."
          linkHref="/browse"
          linkLabel="View all"
        />
        <InlineAffiliateDisclosure />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }} className="grid-2-mobile">
          {trending.map(function(deal, i) {
            return <DealCard key={deal.id} deal={deal} view="grid" delay={i} />
          })}
        </div>
      </section>

      {/* ── RETAILER COMPARISONS ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px 0' }}>
        <SectionHeading
          eyebrow="Retailer comparisons"
          title="Which retailer is actually cheaper?"
          subhead="We tracked daily prices to find out where each store wins."
          linkHref="/compare"
          linkLabel="View all"
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }} className="grid-2-mobile">
          {COMPARISONS.map(function(c) {
            return <ComparisonCard key={c.slug} comparison={c} />
          })}
        </div>
      </section>

      {/* ── TRUST SECTION (4th FTC disclosure surface) ── */}
      <div style={{ marginTop: '80px' }}>
        <TrustSection />
      </div>

      {/* ── LAST CHANCE ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px 0' }}>
        <SectionHeading
          eyebrow="Last chance"
          title="These have been live the longest"
          subhead="We don't fake countdowns. These are simply the picks that have been on the grid the longest — they tend to flip first."
        />
        <InlineAffiliateDisclosure />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }} className="grid-2-mobile">
          {lastChance.map(function(deal, i) {
            return <DealCard key={deal.id} deal={deal} view="grid" delay={i} />
          })}
        </div>
      </section>

      {/* ── EMAIL CAPTURE ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px 0' }}>
        <EmailCapture variant="banner" />
      </section>

      {/* ── BROWSE & COMPARE (full grid) ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px 96px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>All deals</p>
            <h2 style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: 'clamp(30px, 4.5vw, 48px)', color: 'var(--text-primary)' }}>Browse &amp; compare</h2>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={function() { setViewMode('grid') }} aria-label="Grid view" style={{ width: '44px', height: '44px', background: viewMode === 'grid' ? 'var(--accent)' : 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', cursor: 'pointer', color: viewMode === 'grid' ? '#FFFFFF' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
              <LayoutGrid size={16} />
            </button>
            <button onClick={function() { setViewMode('list') }} aria-label="List view" style={{ width: '44px', height: '44px', background: viewMode === 'list' ? 'var(--accent)' : 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', cursor: 'pointer', color: viewMode === 'list' ? '#FFFFFF' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
              <List size={16} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', overflowX: 'auto', marginBottom: '32px', borderBottom: '1px solid var(--border)', WebkitOverflowScrolling: 'touch' }}>
          {CATEGORIES.map(function(cat) {
            var isActive = activeCategory === cat.id
            return (
              <button key={cat.id} onClick={function() { setActiveCategory(cat.id) }} style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '13px', fontWeight: isActive ? 700 : 500, padding: '14px 18px', whiteSpace: 'nowrap', border: 'none', background: 'transparent', cursor: 'pointer', color: isActive ? 'var(--accent)' : 'var(--text-secondary)', borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent', marginBottom: '-1px', transition: 'all 0.15s', flexShrink: 0, minHeight: '44px' }}>
                {cat.emoji} {cat.label}
              </button>
            )
          })}
        </div>

        {viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }} className="grid-2-mobile">
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
