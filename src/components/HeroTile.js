// Large product tile for the homepage hero. Light tinted card, colored corner
// badge, dominant product image, a small "available at" retailer row, product
// name, savings line, and a full-width themed CTA button.
//
// IMPORTANT: This component is used in the homepage hero ONLY. Per Associates
// compliance we never render specific dollar prices in hero creative — only
// percentages or status labels (TRENDING, ENDS SOON, etc.) — and we use simple
// brand-colored initial chips, not the retailers' actual logos.
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { calculateSavings } from '@/lib/currency'

// Per-tile color theme (badge + button + card tint)
const THEMES = {
  green:  { badgeBg: '#1F4E3D', tint: '#F1F6F2', btn: '#1F4E3D' },
  blue:   { badgeBg: '#2563EB', tint: '#F1F5FD', btn: '#2563EB' },
  purple: { badgeBg: '#6D28D9', tint: '#F5F1FC', btn: '#6D28D9' },
}
const VARIANT_THEME = { sage: 'green', blush: 'blue', sienna: 'purple' }

// "Available at" chips — brand-colored initials (not logos, for compliance)
const RETAILER_CHIPS = [
  { k: 'a', bg: '#FF9900' },
  { k: 'BB', bg: '#0046BE' },
  { k: 'W', bg: '#0071CE' },
  { k: 'T', bg: '#CC0000' },
  { k: 'e', bg: '#E53238' },
]

export default function HeroTile({ deal, variant, badgeLabel, priority }) {
  const theme = THEMES[VARIANT_THEME[variant] || 'green']
  const pct = calculateSavings(deal.originalPrice, deal.price).percent
  const isLocalImg = deal.imageUrl && deal.imageUrl.charAt(0) === '/'

  return (
    <article
      className="hero-tile"
      style={{
        background: theme.tint,
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {/* Corner badge */}
      <span style={{
        alignSelf: 'flex-start',
        background: theme.badgeBg,
        color: '#FFFFFF',
        fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        padding: '6px 12px',
        borderRadius: '100px',
        zIndex: 2,
      }}>
        {badgeLabel}
      </span>

      {/* Product image */}
      <Link href={'/product/' + deal.id} aria-label={'View deal: ' + deal.shortName}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '18px 8px 12px', minHeight: '200px' }}>
        <div style={{ width: '100%', maxWidth: '230px', aspectRatio: '1 / 1', position: 'relative' }}>
          {isLocalImg ? (
            <Image src={deal.imageUrl} alt={deal.shortName} fill sizes="(max-width: 900px) 80vw, 230px" priority={priority}
              style={{ objectFit: 'contain' }} />
          ) : (
            <img src={deal.imageUrl} alt={deal.shortName}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={function(e) {
                if (e.target && e.target.parentNode) {
                  e.target.parentNode.innerHTML = '<span style="font-size:64px">' + (deal.emoji || '🎁') + '</span>'
                }
              }} />
          )}
        </div>
      </Link>

      {/* Available-at retailer chips */}
      <div style={{ display: 'flex', gap: '7px', marginBottom: '14px' }} aria-label="Available at Amazon, Best Buy, Walmart, Target and eBay">
        {RETAILER_CHIPS.map(function(r) {
          return (
            <span key={r.k} aria-hidden="true" style={{
              width: '30px', height: '30px', borderRadius: '8px',
              background: '#FFFFFF', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
              fontSize: '11px', fontWeight: 800, color: r.bg, letterSpacing: '-0.02em',
            }}>{r.k}</span>
          )
        })}
      </div>

      {/* Product name */}
      <h3 style={{
        fontFamily: 'var(--font-dm-serif), sans-serif',
        fontSize: '19px', fontWeight: 700, letterSpacing: '-0.02em',
        color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: '4px',
      }}>
        {deal.shortName}
      </h3>
      <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
        Save {pct}% today
      </p>

      {/* Themed CTA */}
      <Link href={'/product/' + deal.id} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        background: theme.btn, color: '#FFFFFF',
        fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
        fontSize: '14px', fontWeight: 700, letterSpacing: '0.01em',
        padding: '13px 16px', borderRadius: '10px', textDecoration: 'none',
        marginTop: 'auto',
      }}>
        View Deal <ArrowRight size={16} />
      </Link>
    </article>
  )
}
