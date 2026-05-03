'use client'
import { useState } from 'react'
import { LayoutGrid, List, ChevronRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DealCard from '@/components/DealCard'
import EmailCapture from '@/components/EmailCapture'
import SectionHeading from '@/components/SectionHeading'
import CategoryTile from '@/components/CategoryTile'
import TrustSection from '@/components/TrustSection'
import { DEALS, CATEGORIES } from '@/data/deals'
import { COMPARISONS } from '@/data/comparisons'
import ComparisonCard from '@/components/ComparisonCard'
import { InlineAffiliateDisclosure } from '@/components/AffiliateDisclosure'

const PICK_VARIANTS = ['color-block-sage', 'color-block-blush', 'color-block-slate']

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const filtered = activeCategory === 'all' ? DEALS : DEALS.filter(function(d) { return d.category === activeCategory })
  const totalSavings = Math.round(DEALS.reduce(function(acc, d) { return acc + (d.originalPrice - d.price) }, 0))

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

      {/* ── HERO ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '64px', alignItems: 'center' }} className="mobile-stack">

          {/* Left: copy */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span className="live-dot" />
              <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                Updated weekly · {DEALS.length} live deals
              </span>
            </div>
            <h1 className="fade-up fade-up-1" style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: 'clamp(40px, 7vw, 84px)', color: 'var(--text-primary)', marginBottom: '24px', letterSpacing: '-0.015em', lineHeight: 1.04 }}>
              Shop smarter.<br />
              <span style={{ color: 'var(--accent)' }}>Never overpay.</span>
            </h1>
            <p className="fade-up fade-up-2" style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '480px' }}>
              A curated set of expiring Amazon finds, cross-checked against Best Buy, Walmart, Target and eBay every week — so you only buy when the price is honest.
            </p>
            <div className="fade-up fade-up-3" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/browse" className="btn-primary">
                Browse all deals <ChevronRight size={16} />
              </Link>
              <Link href="/guides" className="btn-secondary">
                Buying guides
              </Link>
            </div>
            <div className="fade-up fade-up-4" style={{ display: 'flex', gap: '32px', marginTop: '44px', flexWrap: 'wrap' }}>
              {[
                { value: DEALS.length + '+', label: 'Live Deals' },
                { value: '$' + totalSavings + '+', label: 'Total Savings' },
                { value: '5', label: 'Retailers' },
              ].map(function(s) {
                return (
                  <div key={s.label}>
                    <div style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: 'clamp(26px, 5vw, 38px)', color: 'var(--accent)', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px', fontWeight: 500 }}>{s.label}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Editor's Picks (3 color-blocked tiles) */}
          <div className="fade-up fade-up-2">
            <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '14px' }}>Editor&rsquo;s picks</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {editorPicks.map(function(d, i) {
                var pct = Math.round((d.originalPrice - d.price) / d.originalPrice * 100)
                return (
                  <Link key={d.id} href={'/product/' + d.id} style={{ textDecoration: 'none', display: 'block' }}>
                    <div className={PICK_VARIANTS[i % PICK_VARIANTS.length]} style={{ borderRadius: '16px', padding: '14px', display: 'flex', gap: '14px', alignItems: 'center', border: '1px solid var(--border)' }}>
                      <div style={{ width: '88px', height: '88px', background: 'var(--bg-card)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                        {d.imageUrl && d.imageUrl.charAt(0) === '/' ? (
                          <Image
                            src={d.imageUrl}
                            alt={d.shortName}
                            width={88}
                            height={88}
                            sizes="88px"
                            priority={i === 0}
                            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
                          />
                        ) : (
                          <img
                            src={d.imageUrl}
                            alt={d.shortName}
                            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
                            onError={function(e) { e.target.parentNode.innerHTML = '<span style="font-size:36px">' + d.emoji + '</span>' }}
                          />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                          -{pct}% · Pick {String(i + 1).padStart(2, '0')}
                        </p>
                        <p style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: '17px', color: 'var(--text-primary)', marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.2 }}>{d.shortName}</p>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                          <span style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: '24px', color: 'var(--accent)' }}>${d.price}</span>
                          <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>${d.originalPrice}</span>
                        </div>
                      </div>
                      <a
                        href={d.affiliateUrl}
                        target="_blank"
                        rel="sponsored nofollow noopener"
                        onClick={function(e) { e.stopPropagation() }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--accent)', color: '#FFFFFF', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', padding: '8px 12px', borderRadius: '100px', textDecoration: 'none', flexShrink: 0, minHeight: '36px' }}
                      >
                        Buy <ExternalLink size={11} />
                      </a>
                    </div>
                  </Link>
                )
              })}
              <Link href="/browse" style={{ textAlign: 'center', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, color: 'var(--accent)', textDecoration: 'none', padding: '12px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                See all {DEALS.length} deals <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Retailer pills */}
        <div className="fade-up fade-up-5" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '56px', paddingTop: '32px', borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase' }}>Comparing at</span>
          {['Amazon','Best Buy','Walmart','Target','eBay'].map(function(r) {
            return (
              <span key={r} style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '6px 14px', borderRadius: '100px' }}>{r}</span>
            )
          })}
        </div>
      </section>

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
