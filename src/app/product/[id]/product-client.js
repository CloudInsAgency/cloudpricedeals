'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ExternalLink, Heart, ArrowLeft, TrendingDown, Star, Truck, ChevronRight, Shield } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RetailerBadge from '@/components/RetailerBadge'
import EmailCapture from '@/components/EmailCapture'
import DealCard from '@/components/DealCard'
import { InlineAffiliateDisclosure } from '@/components/AffiliateDisclosure'
import { DEALS, RETAILERS } from '@/data/deals'

export default function ProductClient({ id }) {
  const deal = DEALS.find(function(d) { return d.id === id })

  // Hooks must run unconditionally (before any early return).
  const [isSaved, setIsSaved] = useState(false)
  useEffect(function() {
    if (!deal) return
    try {
      var list = JSON.parse(localStorage.getItem('cpd-wishlist') || '[]')
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === deal.id) { setIsSaved(true); return }
      }
    } catch(e) {}
  }, [deal])

  if (!deal) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)' }}>
      <Navbar />
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>Deal not found</h1>
        <p style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--text-secondary)', marginBottom: '24px' }}>This deal may have expired or been removed.</p>
        <Link href="/" style={{ background: 'var(--accent)', color: '#FFFFFF', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, padding: '13px 28px', borderRadius: '8px', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Back to deals</Link>
      </div>
      <Footer />
    </div>
  )

  const bestPrice = deal.comparePrices.reduce(function(min, p) { return p.price < min.price ? p : min }, deal.comparePrices[0])
  const related = DEALS.filter(function(d) { return d.category === deal.category && d.id !== deal.id }).slice(0, 4)
  const savingsPct = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)
  const savings = deal.originalPrice - deal.price

  function notify(text) {
    if (typeof window !== 'undefined' && typeof window.cpdToast === 'function') {
      window.cpdToast(text)
    }
  }

  function handleWishlist() {
    try {
      var list = JSON.parse(localStorage.getItem('cpd-wishlist') || '[]')
      var exists = list.find(function(s) { return s.id === deal.id })
      if (!exists) {
        list.push({
          id: deal.id, name: deal.name, shortName: deal.shortName,
          emoji: deal.emoji, imageUrl: deal.imageUrl, price: deal.price,
          originalPrice: deal.originalPrice, retailer: deal.retailer,
          affiliateUrl: deal.affiliateUrl,
        })
        localStorage.setItem('cpd-wishlist', JSON.stringify(list))
        setIsSaved(true)
        notify('Added ' + deal.shortName + ' to your wishlist')
      } else {
        notify(deal.shortName + ' is already in your wishlist')
      }
    } catch(e) { console.error(e) }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', overflowX: 'hidden' }}>
      <Navbar />

      <style>{`
        .product-layout {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 24px;
          align-items: start;
        }
        .compare-panel {
          position: sticky;
          top: 88px;
        }
        @media (max-width: 768px) {
          .product-layout {
            grid-template-columns: 1fr !important;
          }
          .compare-panel {
            position: static !important;
          }
        }
      `}</style>

      <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', padding: '12px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none' }}>Deals</Link>
          <ChevronRight size={12} color="var(--text-muted)" />
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{deal.category}</span>
          <ChevronRight size={12} color="var(--text-muted)" />
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)' }}>{deal.shortName}</span>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 80px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '28px' }}>
          <ArrowLeft size={14} /> Back to deals
        </Link>

        <div className="product-layout">

          {/* LEFT COLUMN */}
          <div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ height: '280px', background: 'var(--bg-section)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                {deal.imageUrl ? (
                  deal.imageUrl.charAt(0) === '/' ? (
                    <Image
                      src={deal.imageUrl}
                      alt={deal.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 660px"
                      priority
                      style={{ objectFit: 'contain', padding: '24px' }}
                    />
                  ) : (
                    <img src={deal.imageUrl} alt={deal.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '24px' }}
                      onError={function(e) {
                        e.target.style.display = 'none'
                        var fb = document.createElement('div')
                        fb.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:80px'
                        fb.textContent = deal.emoji
                        e.target.parentNode.appendChild(fb)
                      }} />
                  )
                ) : (
                  <div style={{ fontSize: '80px' }}>{deal.emoji}</div>
                )}
                <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '6px' }}>
                  {deal.badge === 'hot' && <span style={{ background: 'var(--hot-bg)', color: 'var(--hot)', border: '1px solid var(--hot-border)', fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '100px' }}>🔥 Hot Deal</span>}
                  <span style={{ background: 'var(--accent-bg)', color: 'var(--accent)', border: '1px solid var(--border-accent)', fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '100px' }}>-{savingsPct}%</span>
                </div>
              </div>

              <div style={{ padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
                  <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px, 3vw, 30px)', color: 'var(--text-primary)', lineHeight: 1.2, flex: 1 }}>{deal.name}</h1>
                  <button onClick={handleWishlist} aria-pressed={isSaved} title={isSaved ? 'Saved to wishlist' : 'Save to wishlist'} style={{ flexShrink: 0, padding: '10px', background: isSaved ? 'rgba(255,71,87,0.15)' : 'var(--bg-section)', border: '1px solid ' + (isSaved ? 'var(--red)' : 'var(--border)'), borderRadius: '10px', cursor: 'pointer', color: isSaved ? 'var(--red)' : 'var(--text-secondary)' }}>
                    <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                  <RetailerBadge retailer={deal.retailer} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={13} style={{ fill: '#F59E0B', color: '#F59E0B' }} />
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{deal.rating}</span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>· {deal.reviews.toLocaleString()} reviews</span>
                  </div>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-muted)' }}>Updated {deal.updatedAt}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '52px', color: 'var(--accent)', lineHeight: 1 }}>${deal.price}</span>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '20px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>${deal.originalPrice}</span>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--accent)', background: 'var(--accent-bg)', border: '1px solid var(--border-accent)', padding: '5px 14px', borderRadius: '100px' }}>
                    You save ${savings} ({savingsPct}% off)
                  </span>
                </div>

                <InlineAffiliateDisclosure />
                <a href={deal.affiliateUrl} target="_blank" rel="sponsored nofollow noopener"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', background: 'var(--accent)', color: '#FFFFFF', padding: '15px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '10px', marginBottom: '10px' }}>
                  Buy on Amazon <ExternalLink size={15} />
                </a>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
                  <Truck size={13} /> {deal.shipping}
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '10px' }}>About this deal</p>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>{deal.description}</p>
                </div>
              </div>
            </div>

            {/* PRICE HISTORY */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <TrendingDown size={16} color="var(--accent)" />
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Price history</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {[
                  { label: 'All-time low', value: '$' + deal.priceHistory.allTimeLow, good: true },
                  { label: '30-day avg',   value: '$' + deal.priceHistory.thirtyDayAvg, good: false },
                  { label: 'vs avg',       value: deal.priceHistory.vsAvgPct + '%', good: true },
                ].map(function(s) {
                  return (
                    <div key={s.label} style={{ background: 'var(--bg-section)', borderRadius: '10px', padding: '16px', textAlign: 'center', border: '1px solid var(--border)' }}>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</p>
                      <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '26px', color: s.good ? 'var(--accent)' : 'var(--text-primary)' }}>{s.value}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <EmailCapture variant="inline" />
          </div>

          {/* RIGHT COLUMN — COMPARE PRICES */}
          <div className="compare-panel">
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>Compare prices</p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>Updated weekly · Tap to buy</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {deal.comparePrices.slice().sort(function(a, b) { return a.price - b.price })
                  .map(function(cp, i) {
                    var r = RETAILERS[cp.retailer]
                    var isBest = cp.retailer === bestPrice.retailer
                    var diff = cp.price - bestPrice.price
                    return (
                      <a key={cp.retailer} href={cp.url} target="_blank" rel="noopener sponsored"
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', border: isBest ? '1px solid var(--border-accent)' : '1px solid var(--border)', background: isBest ? 'var(--accent-bg)' : 'var(--bg-section)', borderRadius: '10px', textDecoration: 'none' }}>
                        <div style={{ width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, flexShrink: 0, background: i === 0 ? 'var(--accent)' : 'var(--bg-card)', color: i === 0 ? '#FFFFFF' : 'var(--text-muted)', border: i !== 0 ? '1px solid var(--border)' : 'none' }}>
                          {i + 1}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <RetailerBadge retailer={cp.retailer} />
                          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>{cp.shipping}</p>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '24px', color: isBest ? 'var(--accent)' : 'var(--text-primary)', lineHeight: 1 }}>${cp.price}</p>
                          {!isBest && <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-muted)' }}>+${diff}</p>}
                          {isBest && <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, color: 'var(--accent)' }}>Best price</p>}
                        </div>
                        <ExternalLink size={13} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                      </a>
                    )
                  })}
              </div>

              <div style={{ marginTop: '20px', padding: '14px', background: 'var(--bg-section)', borderRadius: '10px', border: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Shield size={14} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  CloudPriceDeals earns a commission on purchases. This never affects the price you pay.
                </p>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>More like this</p>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(24px, 3vw, 34px)', color: 'var(--text-primary)' }}>Related {deal.category} deals</h2>
              </div>
              <Link href="/browse" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View all <ChevronRight size={15} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
              {related.map(function(d, i) { return <DealCard key={d.id} deal={d} view="grid" delay={i} /> })}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
