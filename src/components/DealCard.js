'use client'
import Link from 'next/link'
import { Heart, ExternalLink } from 'lucide-react'
import RetailerBadge from './RetailerBadge'

export default function DealCard({ deal, view, delay }) {
  var viewMode = view || 'grid'
  var d = delay || 0
  var pct = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)
  var amazonLink = deal.affiliateUrl
  if (deal.comparePrices) {
    for (var i = 0; i < deal.comparePrices.length; i++) {
      if (deal.comparePrices[i].retailer === 'amazon') {
        amazonLink = deal.comparePrices[i].url
        break
      }
    }
  }

  function handleWishlist(e) {
    e.preventDefault()
    e.stopPropagation()
    try {
      var saved = JSON.parse(localStorage.getItem('cpd-wishlist') || '[]')
      var exists = false
      for (var i = 0; i < saved.length; i++) {
        if (saved[i].id === deal.id) { exists = true; break }
      }
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
    } catch(err) { console.error(err) }
  }

  function handleImgError(e) {
    e.target.style.display = 'none'
    var el = document.createElement('div')
    el.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:56px;'
    el.textContent = deal.emoji
    e.target.parentNode.appendChild(el)
  }

  if (viewMode === 'list') {
    return (
      <div className="fade-up" style={{ animationDelay: d * 0.05 + 's', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '8px', transition: 'border-color 0.2s' }}
        onMouseEnter={function(e) { e.currentTarget.style.borderColor = 'var(--border-accent)' }}
        onMouseLeave={function(e) { e.currentTarget.style.borderColor = 'var(--border)' }}>
        <div style={{ width: '72px', height: '72px', background: 'var(--surface2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
          <img src={deal.imageUrl} alt={deal.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
            onError={function(e) { e.target.style.display='none'; e.target.parentNode.innerHTML='<span style="font-size:28px;display:flex;align-items:center;justify-content:center;width:100%;height:100%">' + deal.emoji + '</span>' }} />
        </div>
        <div style={{ flex: 1, minWidth: '140px' }}>
          <Link href={'/product/' + deal.id} style={{ fontFamily: 'DM Serif Display, serif', fontSize: '17px', color: 'var(--text)', textDecoration: 'none', display: 'block', lineHeight: 1.3, marginBottom: '6px' }}>
            {deal.name}
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <RetailerBadge retailer={deal.retailer} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-3)', fontWeight: 400 }}>★ {deal.rating} · {deal.reviews.toLocaleString()} reviews</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '28px', color: 'var(--green)', lineHeight: 1 }}>${deal.price}</div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-3)', textDecoration: 'line-through', marginTop: '2px' }}>${deal.originalPrice}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
          <a href={amazonLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '9px 18px', fontSize: '11px', gap: '6px' }}>
            Buy on Amazon <ExternalLink size={12} />
          </a>
          <Link href={'/product/' + deal.id} className="btn-secondary" style={{ padding: '8px 18px', fontSize: '11px', justifyContent: 'center' }}>
            Compare stores
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="deal-card fade-up" style={{ animationDelay: d * 0.05 + 's' }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', background: 'var(--surface2)', overflow: 'hidden' }}>
        <img
          src={deal.imageUrl}
          alt={deal.name}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px', transition: 'transform 0.3s ease' }}
          onError={handleImgError}
          onMouseEnter={function(e) { e.target.style.transform = 'scale(1.05)' }}
          onMouseLeave={function(e) { e.target.style.transform = 'scale(1)' }}
        />

        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {deal.badge === 'hot' && (
            <span className="badge-hot">🔥 Hot Deal</span>
          )}
          <span className="badge-green">-{pct}%</span>
        </div>

        <button
          onClick={handleWishlist}
          title="Save to wishlist"
          style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', border: '1px solid var(--border2)', width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-2)', transition: 'all 0.15s', zIndex: 2 }}
          onMouseEnter={function(e) { e.currentTarget.style.background = 'rgba(255,71,87,0.15)'; e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.borderColor = 'var(--red)' }}
          onMouseLeave={function(e) { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.borderColor = 'var(--border2)' }}>
          <Heart size={14} />
        </button>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <RetailerBadge retailer={deal.retailer} />
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-3)' }}>★ {deal.rating}</span>
        </div>

        <Link href={'/product/' + deal.id} style={{ fontFamily: 'DM Serif Display, serif', fontSize: '18px', fontWeight: 400, color: 'var(--text)', textDecoration: 'none', lineHeight: 1.3, display: 'block', flex: 1 }}
          onMouseEnter={function(e) { e.target.style.color = 'var(--green)' }}
          onMouseLeave={function(e) { e.target.style.color = 'var(--text)' }}>
          {deal.name}
        </Link>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', color: 'var(--green)', lineHeight: 1 }}>${deal.price}</span>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-3)', textDecoration: 'line-through' }}>${deal.originalPrice}</span>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-2)', marginLeft: 'auto' }}>Save ${deal.originalPrice - deal.price}</span>
        </div>

        <a href={amazonLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ justifyContent: 'center', padding: '11px 16px', fontSize: '12px' }}>
          Buy on Amazon <ExternalLink size={13} />
        </a>

        <Link href={'/product/' + deal.id} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 500, color: 'var(--text-3)', textDecoration: 'none', textAlign: 'center', paddingTop: '4px', transition: 'color 0.15s' }}
          onMouseEnter={function(e) { e.target.style.color = 'var(--green)' }}
          onMouseLeave={function(e) { e.target.style.color = 'var(--text-3)' }}>
          Compare all stores →
        </Link>
      </div>
    </div>
  )
}
