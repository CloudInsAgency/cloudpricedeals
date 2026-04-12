'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink, Heart, ArrowLeft, TrendingDown, Star, Truck, ChevronRight, Shield } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RetailerBadge from '@/components/RetailerBadge'
import EmailCapture from '@/components/EmailCapture'
import DealCard from '@/components/DealCard'
import { DEALS, RETAILERS } from '@/data/deals'

export default function ProductPage() {
  const params = useParams()
  const deal = DEALS.find(function(d) { return d.id === params.id })

  if (!deal) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>Deal not found</h1>
        <p style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--text-2)', marginBottom: '24px' }}>This deal may have expired or been removed.</p>
        <Link href="/" className="btn-primary">Back to deals</Link>
      </div>
      <Footer />
    </div>
  )

  const bestPrice = deal.comparePrices.reduce(function(min, p) { return p.price < min.price ? p : min }, deal.comparePrices[0])
  const related = DEALS.filter(function(d) { return d.category === deal.category && d.id !== deal.id }).slice(0, 4)
  const savingsPct = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)
  const savings = deal.originalPrice - deal.price

  function handleWishlist() {
    try {
      var saved = JSON.parse(localStorage.getItem('cpd-wishlist') || '[]')
      var exists = saved.find(function(s) { return s.id === deal.id })
      if (!exists) {
        saved.push({
          id: deal.id, name: deal.name, shortName: deal.shortName,
          emoji: deal.emoji, imageUrl: deal.imageUrl, price: deal.price,
          originalPrice: deal.originalPrice, retailer: deal.retailer,
          affiliateUrl: deal.affiliateUrl,
        })
        localStorage.setItem('cpd-wishlist', JSON.stringify(saved))
        alert('Added ' + deal.shortName + ' to your wishlist!')
      } else {
        alert(deal.shortName + ' is already in your wishlist.')
      }
    } catch(e) { console.error(e) }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', overflowX: 'hidden' }}>
      <Navbar />

      {/* BREADCRUMB */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '12px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-3)', textDecoration: 'none' }}>Deals</Link>
          <ChevronRight size={12} color="var(--text-3)" />
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-3)', textTransform: 'capitalize' }}>{deal.category}</span>
          <ChevronRight size={12} color="var(--text-3)" />
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-2)' }}>{deal.shortName}</span>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 80px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-3)', textDecoration: 'none', marginBottom: '28px', transition: 'color 0.15s' }}
          onMouseEnter={function(e) { e.currentTarget.style.color = 'var(--green)' }}
          onMouseLeave={function(e) { e.currentTarget.style.color = 'var(--text-3)' }}>
          <ArrowLeft size={14} /> Back to deals
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px', alignItems: 'start' }} className="mobile-stack">

          {/* LEFT COLUMN */}
          <div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ height: '280px', background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                {deal.imageUrl ? (
                  <img src={deal.imageUrl} alt={deal.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '24px' }}
                    onError={function(e) {
                      e.target.style.display = 'none'
                      var fb = document.createElement('div')
                      fb.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:80px'
                      fb.textContent = deal.emoji
                      e.target.parentNode.appendChild(fb)
                    }} />
                ) : (
                  <div style={{ fontSize: '80px' }}>{deal.emoji}</div>
                )}
                <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '6px' }}>
                  {deal.badge === 'hot' && <span className="badge-hot">🔥 Hot Deal</span>}
                  <span className="badge-green">-{savingsPct}%</span>
                </div>
              </div>

              <div style={{ padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
                  <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', lineHeight: 1.2, flex: 1 }}>{deal.name}</h1>
                  <button onClick={handleWishlist} style={{ flexShrink: 0, padding: '10px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '10px', cursor: 'pointer', color: 'var(--text-2)', transition: 'all 0.15s' }}
                    onMouseEnter={function(e) { e.currentTarget.style.borderColor = '#FF4757'; e.currentTarget.style.color = '#FF4757' }}
                    onMouseLeave={function(e) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)' }}>
                    <Heart size={18} />
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                  <RetailerBadge retailer={deal.retailer} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={13} style={{ fill: 'var(--amber)', color: 'var(--amber)' }} />
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-2)', fontWeight: 500 }}>{deal.rating}</span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-3)' }}>· {deal.reviews.toLocaleString()} reviews</span>
                  </div>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-3)' }}>Updated {deal.updatedAt}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '52px', color: 'var(--green)', lineHeight: 1 }}>${deal.price}</span>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '20px', color: 'var(--text-3)', textDecoration: 'line-through' }}>${deal.originalPrice}</span>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--green)', background: 'rgba(0,208,132,0.1)', border: '1px solid rgba(0,208,132,0.2)', padding: '5px 14px', borderRadius: '100px' }}>
                    You save ${savings} ({savingsPct}% off)
                  </span>
                </div>

                <a href={deal.affiliateUrl} target="_blank" rel="noopener sponsored" className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: '14px', marginBottom: '10px' }}>
                  Buy on Amazon <ExternalLink size={15} />
                </a>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-3)', marginBottom: '24px' }}>
                  <Truck size={13} /> {deal.shipping}
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '10px' }}>About this deal</p>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.8 }}>{deal.description}</p>
                </div>
              </div>
            </div>

            {/* PRICE HISTORY */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <TrendingDown size={16} color="var(--green)" />
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>Price history</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {[
                  { label: 'All-time low', value: '$' + deal.priceHistory.allTimeLow, good: true },
                  { label: '30-day avg',   value: '$' + deal.priceHistory.thirtyDayAvg, good: false },
                  { label: 'vs avg',       value: deal.priceHistory.vsAvgPct + '%', good: true },
                ].map(function(s) {
                  return (
                    <div key={s.label} style={{ background: 'var(--surface2)', borderRadius: '10px', padding: '16px', textAlign: 'center', border: '1px solid var(--border)' }}>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 500, color: 'var(--text-3)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</p>
                      <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '26px', color: s.good ? 'var(--green)' : 'var(--text)' }}>{s.value}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <EmailCapture variant="inline" />
          </div>

          {/* RIGHT COLUMN — COMPARE */}
          <div style={{ position: 'sticky', top: '88px' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '4px' }}>Compare prices</p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-3)', marginBottom: '20px' }}>Updated weekly · Tap to buy</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {deal.comparePrices.slice().sort(function(a, b) { return a.price - b.price })
                  .map(function(cp, i) {
                    var r = RETAILERS[cp.retailer]
                    var isBest = cp.retailer === bestPrice.retailer
                    var diff = cp.price - bestPrice.price
                    return (
                      <a key={cp.retailer} href={cp.url} target="_blank" rel="noopener sponsored"
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', border: isBest ? '1px solid rgba(0,208,132,0.4)' : '1px solid var(--border)', background: isBest ? 'rgba(0,208,132,0.06)' : 'var(--surface2)', borderRadius: '10px', textDecoration: 'none', transition: 'all 0.15s' }}
                        onMouseEnter={function(e) { e.currentTarget.style.borderColor = isBest ? 'rgba(0,208,132,0.6)' : 'var(--border2)' }}
                        onMouseLeave={function(e) { e.currentTarget.style.borderColor = isBest ? 'rgba(0,208,132,0.4)' : 'var(--border)' }}>
                        <div style={{ width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, flexShrink: 0, background: i === 0 ? 'var(--green)' : 'var(--surface)', color: i === 0 ? '#0A0E1A' : 'var(--text-3)', border: i !== 0 ? '1px solid var(--border)' : 'none' }}>
                          {i + 1}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <RetailerBadge retailer={cp.retailer} />
                          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-3)', marginTop: '3px' }}>{cp.shipping}</p>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '24px', color: isBest ? 'var(--green)' : 'var(--text)', lineHeight: 1 }}>${cp.price}</p>
                          {!isBest && <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-3)' }}>+${diff}</p>}
                          {isBest && <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, color: 'var(--green)' }}>Best price</p>}
                        </div>
                        <ExternalLink size={13} color="var(--text-3)" style={{ flexShrink: 0 }} />
                      </a>
                    )
                  })}
              </div>

              <div style={{ marginTop: '20px', padding: '14px', background: 'var(--surface2)', borderRadius: '10px', border: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Shield size={14} color="var(--text-3)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-3)', lineHeight: 1.5 }}>
                  CloudPriceDeals earns a commission on purchases. This never affects the price you pay.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED DEALS */}
        {related.length > 0 && (
          <div style={{ marginTop: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <p className="section-eyebrow" style={{ marginBottom: '8px' }}>More like this</p>
                <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)' }}>Related {deal.category} deals</h2>
              </div>
              <Link href="/browse" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--green)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View all <ChevronRight size={15} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }} className="grid-2-mobile">
              {related.map(function(d, i) { return <DealCard key={d.id} deal={d} view="grid" delay={i} /> })}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
