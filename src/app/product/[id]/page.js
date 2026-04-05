'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink, Heart, ArrowLeft, TrendingDown, Star, Truck } from 'lucide-react'
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
    <div style={{ minHeight: '100vh', background: '#F5F0E8' }}>
      <Navbar />
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '80px 40px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Jost, sans-serif', color: '#888' }}>Deal not found.</p>
        <Link href="/" style={{ display: 'inline-block', marginTop: '16px', background: '#185FA5', color: 'white', padding: '12px 24px', textDecoration: 'none', fontFamily: 'Jost, sans-serif', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Back to deals</Link>
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
        saved.push({ id: deal.id, name: deal.name, emoji: deal.emoji, price: deal.price, originalPrice: deal.originalPrice, retailer: deal.retailer })
        localStorage.setItem('cpd-wishlist', JSON.stringify(saved))
        alert('Added ' + deal.shortName + ' to your wishlist!')
      } else {
        alert(deal.shortName + ' is already in your wishlist.')
      }
    } catch(e) { console.error(e) }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F5F0E8' }}>
      <Navbar />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 40px 80px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'Jost, sans-serif', fontSize: '14px', fontWeight: 400, color: '#888', textDecoration: 'none', marginBottom: '32px', letterSpacing: '0.04em' }}>
          <ArrowLeft size={14} /> Back to deals
        </Link>

        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px', alignItems: 'start' }}>

          <div>
            <div style={{ background: 'white', padding: '32px', marginBottom: '16px' }}>
              <div style={{ height: '220px', background: '#F5F0E8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px', overflow: 'hidden', position: 'relative' }}>
                {deal.imageUrl ? (
                  <img
                    src={deal.imageUrl}
                    alt={deal.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px' }}
                    onError={function(e) {
                      e.target.style.display = 'none'
                      var fb = document.createElement('div')
                      fb.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:80px'
                      fb.textContent = deal.emoji
                      e.target.parentNode.appendChild(fb)
                    }}
                  />
                ) : (
                  <div style={{ fontSize: '80px' }}>{deal.emoji}</div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.2 }}>{deal.name}</h1>
                <button onClick={handleWishlist} style={{ flexShrink: 0, padding: '10px', background: 'none', border: '1px solid rgba(26,26,26,0.12)', cursor: 'pointer', color: '#185FA5' }}>
                  <Heart size={16} />
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <RetailerBadge retailer={deal.retailer} />
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#888', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={12} style={{ fill: '#F59E0B', color: '#F59E0B' }} />
                  {deal.rating} · {deal.reviews.toLocaleString()} reviews
                </span>
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#aaa' }}>·</span>
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#888', fontWeight: 400 }}>Updated {deal.updatedAt}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px' }}>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '52px', fontWeight: 400, color: '#185FA5', lineHeight: 1 }}>${deal.price}</span>
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '18px', color: '#bbb', textDecoration: 'line-through', fontWeight: 300 }}>${deal.originalPrice}</span>
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 600, color: '#185FA5', background: '#D6E8F7', padding: '4px 12px' }}>
                  Save ${savings} ({savingsPct}% off)
                </span>
              </div>

              <a href={deal.affiliateUrl} target="_blank" rel="noopener sponsored"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', background: '#185FA5', color: 'white', padding: '16px', fontFamily: 'Jost, sans-serif', fontSize: '15px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: '12px' }}>
                Buy on Amazon <ExternalLink size={15} />
              </a>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#888', marginBottom: '24px', fontWeight: 400 }}>
                <Truck size={13} /> {deal.shipping}
              </div>

              <div style={{ borderTop: '1px solid rgba(26,26,26,0.08)', paddingTop: '20px' }}>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#185FA5', marginBottom: '10px' }}>About this deal</p>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '15px', color: '#4A4A4A', lineHeight: 1.8, fontWeight: 400 }}>{deal.description}</p>
              </div>
            </div>

            <div style={{ background: 'white', padding: '28px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <TrendingDown size={16} color="#185FA5" />
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', fontWeight: 600, color: '#1A1A1A', letterSpacing: '0.04em' }}>Price history</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {[
                  { label: 'All-time low', value: '$' + deal.priceHistory.allTimeLow, color: '#185FA5' },
                  { label: '30-day avg',   value: '$' + deal.priceHistory.thirtyDayAvg, color: '#1A1A1A' },
                  { label: 'vs avg',       value: deal.priceHistory.vsAvgPct + '%', color: '#185FA5' },
                ].map(function(s) {
                  return (
                    <div key={s.label} style={{ background: '#F5F0E8', padding: '16px', textAlign: 'center' }}>
                      <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', fontWeight: 400, color: '#888', marginBottom: '6px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</p>
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 400, color: s.color }}>{s.value}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <EmailCapture variant="inline" />
          </div>

          <div className="compare-sticky" style={{ position: 'sticky', top: '96px' }}>
            <div style={{ background: 'white', padding: '28px' }}>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#185FA5', marginBottom: '6px' }}>Compare prices</p>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#888', fontWeight: 400, marginBottom: '20px' }}>Updated weekly · Tap to buy</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {deal.comparePrices
                  .slice().sort(function(a, b) { return a.price - b.price })
                  .map(function(cp, i) {
                    var r = RETAILERS[cp.retailer]
                    var isBest = cp.retailer === bestPrice.retailer
                    var diff = cp.price - bestPrice.price
                    return (
                      <a key={cp.retailer} href={cp.url} target="_blank" rel="noopener sponsored"
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', border: isBest ? '1px solid #185FA5' : '1px solid rgba(26,26,26,0.08)', background: isBest ? '#EDF4FB' : 'white', textDecoration: 'none', transition: 'all 0.15s' }}>
                        <div style={{ width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontFamily: 'Jost, sans-serif', fontWeight: 700, flexShrink: 0, background: i === 0 ? '#185FA5' : i === 1 ? '#D6E8F7' : '#F5F0E8', color: i === 0 ? 'white' : i === 1 ? '#0C447C' : '#888' }}>
                          {i + 1}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '2px 8px', background: r ? r.bg : '#F5F0E8', color: r ? r.text : '#888' }}>{r ? r.label : cp.retailer}</span>
                          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#888', marginTop: '3px', fontWeight: 400 }}>{cp.shipping}</p>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', fontWeight: 400, color: isBest ? '#185FA5' : '#1A1A1A', lineHeight: 1 }}>${cp.price}</p>
                          {!isBest && <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#aaa', fontWeight: 400 }}>+${diff}</p>}
                          {isBest && <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', fontWeight: 600, color: '#185FA5' }}>Best price</p>}
                        </div>
                        <ExternalLink size={13} color="#ccc" style={{ flexShrink: 0 }} />
                      </a>
                    )
                  })}
              </div>

              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#bbb', marginTop: '20px', textAlign: 'center', lineHeight: 1.6, fontWeight: 400 }}>
                CloudPriceDeals earns a commission on purchases. This never affects the price you pay.
              </p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: '64px' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px', fontWeight: 400, color: '#1A1A1A', marginBottom: '24px' }}>More {deal.category} deals</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1px', background: '#EDE8DF' }}>
              {related.map(function(d, i) { return <DealCard key={d.id} deal={d} view="grid" delay={i} /> })}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
