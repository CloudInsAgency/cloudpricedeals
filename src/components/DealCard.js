'use client'
import Link from 'next/link'
import { Heart } from 'lucide-react'
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
        saved.push({ id: deal.id, name: deal.name, emoji: deal.emoji, price: deal.price, originalPrice: deal.originalPrice, retailer: deal.retailer })
        localStorage.setItem('cpd-wishlist', JSON.stringify(saved))
        alert('Added ' + deal.shortName + ' to your wishlist!')
      } else {
        alert(deal.shortName + ' is already in your wishlist.')
      }
    } catch(err) {
      console.error(err)
    }
  }

  function handleImgError(e) {
    e.target.style.display = 'none'
    var el = document.createElement('div')
    el.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:64px'
    el.textContent = deal.emoji
    e.target.parentNode.appendChild(el)
  }

  function handleImgErrorSmall(e) {
    e.target.style.display = 'none'
    e.target.parentNode.innerHTML = '<div style="font-size:32px;display:flex;align-items:center;justify-content:center;width:100%;height:100%">' + deal.emoji + '</div>'
  }

  if (viewMode === 'list') {
    return (
      <div className="fade-up" style={{ animationDelay: d * 0.06 + 's', background: 'white', borderBottom: '1px solid rgba(26,26,26,0.08)', padding: '20px 0', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ width: '80px', height: '80px', background: '#F5F0E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
          <img src={deal.imageUrl} alt={deal.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} onError={handleImgErrorSmall} />
        </div>
        <div style={{ flex: 1, minWidth: '160px' }}>
          <Link href={'/product/' + deal.id} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 400, color: '#1A1A1A', textDecoration: 'none', display: 'block', lineHeight: 1.3 }}>
            {deal.name}
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <RetailerBadge retailer={deal.retailer} />
            <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#888', fontWeight: 300 }}>{deal.rating} stars</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 400, color: '#185FA5', lineHeight: 1 }}>${deal.price}</div>
          <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#888', textDecoration: 'line-through', fontWeight: 300 }}>${deal.originalPrice}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
          <a href={amazonLink} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'white', background: '#185FA5', padding: '8px 14px', textDecoration: 'none', whiteSpace: 'nowrap', textAlign: 'center', display: 'block' }}>
            Buy on Amazon
          </a>
          <Link href={'/product/' + deal.id} style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#185FA5', border: '1px solid #185FA5', padding: '7px 14px', textDecoration: 'none', whiteSpace: 'nowrap', textAlign: 'center', display: 'block' }}>
            Compare stores
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-up" style={{ animationDelay: d * 0.06 + 's', background: 'white', cursor: 'pointer', transition: 'transform 0.25s ease', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={function(e) { e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={function(e) { e.currentTarget.style.transform = 'translateY(0)' }}>
      <div style={{ aspectRatio: '4/3', background: '#F5F0E8', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <img src={deal.imageUrl} alt={deal.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '12px' }} onError={handleImgError} />
        {deal.badge === 'hot' && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#185FA5', color: 'white', fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', zIndex: 2 }}>
            Hot deal
          </div>
        )}
        <button onClick={handleWishlist} title="Add to wishlist" style={{ position: 'absolute', top: '12px', right: '12px', background: 'white', border: 'none', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#185FA5', zIndex: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <Heart size={15} />
        </button>
      </div>
      <div style={{ padding: '16px 16px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ marginBottom: '6px' }}>
          <RetailerBadge retailer={deal.retailer} />
        </div>
        <Link href={'/product/' + deal.id} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 400, color: '#1A1A1A', textDecoration: 'none', display: 'block', lineHeight: '1.3', marginBottom: '10px' }}>
          {deal.name}
        </Link>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '34px', fontWeight: 400, color: '#185FA5', lineHeight: 1 }}>${deal.price}</span>
          <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#888', textDecoration: 'line-through', fontWeight: 300 }}>${deal.originalPrice}</span>
          <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', fontWeight: 500, color: '#185FA5', marginLeft: 'auto' }}>-{pct}%</span>
        </div>
        <a href={amazonLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#185FA5', color: 'white', textDecoration: 'none', padding: '12px 16px', fontFamily: 'Jost, sans-serif', fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
          Buy on Amazon
        </a>
        <Link href={'/product/' + deal.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', textDecoration: 'none', borderTop: '1px solid rgba(26,26,26,0.06)', paddingTop: '8px' }}>
          Compare all stores
        </Link>
      </div>
    </div>
  )
}
