'use client'
import Link from 'next/link'
import { Heart, ExternalLink } from 'lucide-react'
import RetailerBadge from './RetailerBadge'

export default function DealCard({ deal, view = 'grid', delay = 0 }) {
  const pct = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)

  if (view === 'list') {
    return (
      <div className="card card-hover fade-up" style={{ animationDelay: `${delay * 0.06}s`, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '56px', height: '56px', background: '#EBF3FC', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>
          {deal.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Link href={`/product/${deal.id}`} style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', fontWeight: 500, color: '#0D1B2A', textDecoration: 'none', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {deal.name}
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <RetailerBadge retailer={deal.retailer} />
            <span style={{ fontSize: '12px', color: '#7B93A8' }}>{deal.rating}★ · {deal.reviews.toLocaleString()} reviews</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: 600, color: '#185FA5' }}>${deal.price}</div>
          <div style={{ fontSize: '12px', color: '#7B93A8', textDecoration: 'line-through' }}>${deal.originalPrice}</div>
        </div>
        <Link href={deal.affiliateUrl} target="_blank" rel="noopener sponsored" style={{ flexShrink: 0, padding: '8px', borderRadius: '10px', background: '#EBF3FC', color: '#185FA5', display: 'flex', alignItems: 'center' }}>
          <ExternalLink size={14} />
        </Link>
      </div>
    )
  }

  return (
    <div className="card card-hover fade-up" style={{ animationDelay: `${delay * 0.06}s` }}>
      <div style={{ padding: '16px' }}>
        <div style={{ height: '90px', background: '#EBF3FC', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', marginBottom: '14px', transition: 'transform 0.2s ease' }}>
          {deal.emoji}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '6px', marginBottom: '8px' }}>
          <Link href={`/product/${deal.id}`} style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', fontWeight: 500, color: '#0D1B2A', textDecoration: 'none', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>
            {deal.name}
          </Link>
          <button style={{ flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', color: '#C4DCFA', padding: '2px' }}>
            <Heart size={13} />
          </button>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <RetailerBadge retailer={deal.retailer} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '10px' }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: '#185FA5', lineHeight: 1 }}>${deal.price}</span>
          <span style={{ fontSize: '12px', color: '#7B93A8', textDecoration: 'line-through' }}>${deal.originalPrice}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.04em', padding: '3px 10px', borderRadius: '100px', background: deal.badge === 'hot' ? '#FFF0E6' : '#EBF3FC', color: deal.badge === 'hot' ? '#B94A00' : '#185FA5' }}>
            {deal.badge === 'hot' ? '🔥 ' : ''}{pct}% off
          </span>
          <Link href={`/product/${deal.id}`} style={{ fontSize: '12px', fontWeight: 500, color: '#185FA5', textDecoration: 'none' }}>
            Compare →
          </Link>
        </div>
      </div>
    </div>
  )
}
