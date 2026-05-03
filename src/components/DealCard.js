'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Heart, ExternalLink } from 'lucide-react'
import RetailerBadge from './RetailerBadge'
import { formatCurrency, calculateSavings } from '@/lib/currency'

function isLocalImage(src) {
  return typeof src === 'string' && src.length > 0 && src.charAt(0) === '/'
}

function notify(text) {
  if (typeof window !== 'undefined' && typeof window.cpdToast === 'function') {
    window.cpdToast(text)
  }
}

// Deterministic color-block tile per category — same product always lands the
// same surround color across the site so the visual system feels stable.
const TILE_PALETTE = ['color-block-sand', 'color-block-sage', 'color-block-blush', 'color-block-slate']
function tileClassFor(deal) {
  var key = (deal && (deal.category || deal.id)) || ''
  var hash = 0
  for (var i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  }
  return TILE_PALETTE[hash % TILE_PALETTE.length]
}

export default function DealCard({ deal, view, delay }) {
  var viewMode = view || 'grid'
  var d = delay || 0
  var savings = calculateSavings(deal.originalPrice, deal.price)
  var pct = savings.percent
  var amazonLink = deal.affiliateUrl
  if (deal.comparePrices) {
    for (var i = 0; i < deal.comparePrices.length; i++) {
      if (deal.comparePrices[i].retailer === 'amazon') {
        amazonLink = deal.comparePrices[i].url
        break
      }
    }
  }

  const [saved, setSaved] = useState(false)
  useEffect(function() {
    try {
      var list = JSON.parse(localStorage.getItem('cpd-wishlist') || '[]')
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === deal.id) { setSaved(true); return }
      }
    } catch(e) {}
  }, [deal.id])

  function handleWishlist(e) {
    e.preventDefault()
    e.stopPropagation()
    try {
      var list = JSON.parse(localStorage.getItem('cpd-wishlist') || '[]')
      var exists = false
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === deal.id) { exists = true; break }
      }
      if (!exists) {
        list.push({
          id: deal.id, name: deal.name, shortName: deal.shortName,
          emoji: deal.emoji, imageUrl: deal.imageUrl, price: deal.price,
          originalPrice: deal.originalPrice, retailer: deal.retailer,
          affiliateUrl: deal.affiliateUrl,
        })
        localStorage.setItem('cpd-wishlist', JSON.stringify(list))
        setSaved(true)
        notify('Added ' + deal.shortName + ' to your wishlist')
      } else {
        notify(deal.shortName + ' is already in your wishlist')
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

  var tileClass = tileClassFor(deal)

  if (viewMode === 'list') {
    return (
      <div className="fade-up" style={{ animationDelay: d * 0.05 + 's', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '8px', transition: 'border-color 0.2s' }}
        onMouseEnter={function(e) { e.currentTarget.style.borderColor = 'var(--border-accent)' }}
        onMouseLeave={function(e) { e.currentTarget.style.borderColor = 'var(--border)' }}>
        <div className={tileClass} style={{ width: '80px', height: '80px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
          {isLocalImage(deal.imageUrl) ? (
            <Image src={deal.imageUrl} alt={deal.name} width={80} height={80} sizes="80px" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />
          ) : (
            <img src={deal.imageUrl} alt={deal.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
              onError={function(e) { e.target.style.display='none'; e.target.parentNode.innerHTML='<span style="font-size:28px;display:flex;align-items:center;justify-content:center;width:100%;height:100%">' + deal.emoji + '</span>' }} />
          )}
        </div>
        <div style={{ flex: 1, minWidth: '140px' }}>
          <Link href={'/product/' + deal.id} style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: '18px', color: 'var(--text-primary)', textDecoration: 'none', display: 'block', lineHeight: 1.3, marginBottom: '6px' }}>
            {deal.name}
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <RetailerBadge retailer={deal.retailer} />
            <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 400 }}>★ {deal.rating} · {deal.reviews.toLocaleString()} reviews</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: '30px', color: 'var(--accent)', lineHeight: 1 }}>{formatCurrency(deal.price)}</div>
          <div style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'line-through', marginTop: '2px' }}>{formatCurrency(deal.originalPrice)}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
          <a href={amazonLink} target="_blank" rel="sponsored nofollow noopener noreferrer" className="btn-primary" style={{ padding: '10px 18px', fontSize: '11px', gap: '6px' }}>
            Buy on Amazon <ExternalLink size={12} />
          </a>
          <Link href={'/product/' + deal.id} className="btn-secondary" style={{ padding: '9px 18px', fontSize: '11px', justifyContent: 'center' }}>
            Compare stores
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="deal-card fade-up" style={{ animationDelay: d * 0.05 + 's' }}>
      <div className={tileClass} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        {isLocalImage(deal.imageUrl) ? (
          <Image
            src={deal.imageUrl}
            alt={deal.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 320px"
            style={{ objectFit: 'contain', padding: '20px', transition: 'transform 0.3s ease' }}
          />
        ) : (
          <img
            src={deal.imageUrl}
            alt={deal.name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '20px', transition: 'transform 0.3s ease' }}
            onError={handleImgError}
            onMouseEnter={function(e) { e.target.style.transform = 'scale(1.05)' }}
            onMouseLeave={function(e) { e.target.style.transform = 'scale(1)' }}
          />
        )}

        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {deal.badge === 'hot' && (
            <span className="badge-hot">Hot Deal</span>
          )}
          <span className="badge-green">-{pct}%</span>
        </div>

        <button
          onClick={handleWishlist}
          title={saved ? 'Saved to wishlist' : 'Save to wishlist'}
          aria-pressed={saved}
          style={{ position: 'absolute', top: '8px', right: '8px', background: saved ? 'var(--hot-bg)' : 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', border: '1px solid ' + (saved ? 'var(--hot)' : 'var(--border)'), width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: saved ? 'var(--hot)' : 'var(--text-secondary)', transition: 'all 0.15s', zIndex: 2 }}
          onMouseEnter={function(e) { if (!saved) { e.currentTarget.style.background = 'var(--hot-bg)'; e.currentTarget.style.color = 'var(--hot)'; e.currentTarget.style.borderColor = 'var(--hot)' } }}
          onMouseLeave={function(e) { if (!saved) { e.currentTarget.style.background = 'rgba(255,255,255,0.92)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)' } }}>
          <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <RetailerBadge retailer={deal.retailer} />
          <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-muted)' }}>★ {deal.rating}</span>
        </div>

        <Link href={'/product/' + deal.id} style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: '20px', fontWeight: 400, color: 'var(--text-primary)', textDecoration: 'none', lineHeight: 1.3, display: 'block', flex: 1 }}
          onMouseEnter={function(e) { e.target.style.color = 'var(--accent)' }}
          onMouseLeave={function(e) { e.target.style.color = 'var(--text-primary)' }}>
          {deal.name}
        </Link>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: '34px', color: 'var(--accent)', lineHeight: 1 }}>{formatCurrency(deal.price)}</span>
          <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>{formatCurrency(deal.originalPrice)}</span>
          <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-secondary)', marginLeft: 'auto', fontWeight: 500 }}>Save {formatCurrency(savings.amount)}</span>
        </div>

        <a href={amazonLink} target="_blank" rel="sponsored nofollow noopener noreferrer" className="btn-primary" style={{ justifyContent: 'center', padding: '12px 16px', fontSize: '12px' }}>
          Buy on Amazon <ExternalLink size={13} />
        </a>

        <Link href={'/product/' + deal.id} style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)', textDecoration: 'none', textAlign: 'center', paddingTop: '4px', transition: 'color 0.15s' }}
          onMouseEnter={function(e) { e.target.style.color = 'var(--accent)' }}
          onMouseLeave={function(e) { e.target.style.color = 'var(--text-muted)' }}>
          Compare all stores →
        </Link>
      </div>
    </div>
  )
}
