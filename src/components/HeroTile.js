// Large saturated color-blocked hero tile that puts the product image at center
// stage. Mirrors the Mochi & Oak product card layout — corner badge, dominant
// product imagery, serif product name, supporting line + CTA.
//
// IMPORTANT: This component is used in the homepage hero ONLY. Per Associates
// compliance we never render specific dollar prices in hero creative — only
// percentages or status labels (TRENDING, ENDS SOON, etc.).
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, ChevronRight } from 'lucide-react'
import { calculateSavings } from '@/lib/currency'

// Saturated tile palette (NOT pastels)
const VARIANTS = {
  sage:   { bg: '#7FA88A', text: '#1A1A1A', sub: 'rgba(26,26,26,0.72)', badgeBg: '#1F4E3D', badgeText: '#FFFFFF', imgBg: 'rgba(255,255,255,0.92)' },
  blush:  { bg: '#E8A88A', text: '#1A1A1A', sub: 'rgba(26,26,26,0.72)', badgeBg: '#7C2D12', badgeText: '#FFFFFF', imgBg: 'rgba(255,255,255,0.92)' },
  sienna: { bg: '#C2410C', text: '#FFFFFF', sub: 'rgba(255,255,255,0.86)', badgeBg: '#FFFFFF', badgeText: '#7C2D12', imgBg: 'rgba(255,255,255,0.96)' },
}

export default function HeroTile({ deal, variant, badgeLabel, priority }) {
  const v = VARIANTS[variant] || VARIANTS.sage
  const pct = calculateSavings(deal.originalPrice, deal.price).percent
  const isLocalImg = deal.imageUrl && deal.imageUrl.charAt(0) === '/'

  return (
    <Link href={'/product/' + deal.id} style={{ textDecoration: 'none', display: 'block' }} aria-label={'View deal: ' + deal.shortName}>
      <article
        style={{
          background: v.bg,
          borderRadius: '24px',
          padding: '28px 24px 24px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '420px',
          display: 'flex',
          flexDirection: 'column',
          color: v.text,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        className="hero-tile"
      >
        {/* Corner badge */}
        <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 2 }}>
          <span style={{
            display: 'inline-block',
            background: v.badgeBg,
            color: v.badgeText,
            fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            padding: '6px 12px',
            borderRadius: '100px',
          }}>
            {badgeLabel}
          </span>
        </div>

        {/* Product image dominant in the center area */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 12px 20px',
          minHeight: '220px',
        }}>
          <div style={{
            width: '100%',
            maxWidth: '240px',
            aspectRatio: '1 / 1',
            background: v.imgBg,
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {isLocalImg ? (
              <Image
                src={deal.imageUrl}
                alt={deal.shortName}
                width={240}
                height={240}
                sizes="(max-width: 768px) 80vw, 240px"
                priority={priority}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px' }}
              />
            ) : (
              <img
                src={deal.imageUrl}
                alt={deal.shortName}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px' }}
                onError={function(e) {
                  if (e.target && e.target.parentNode) {
                    e.target.parentNode.innerHTML = '<span style="font-size:72px">' + (deal.emoji || '🎁') + '</span>'
                  }
                }}
              />
            )}
          </div>
        </div>

        {/* Product name */}
        <h3 style={{
          fontFamily: 'var(--font-dm-serif), DM Serif Display, serif',
          fontSize: 'clamp(22px, 2.4vw, 28px)',
          color: v.text,
          lineHeight: 1.15,
          marginBottom: '10px',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          textOverflow: 'ellipsis',
        }}>
          {deal.shortName}
        </h3>

        {/* Supporting line: percentage + CTA (NO dollar prices in hero creative) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap',
        }}>
          <span style={{
            fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            color: v.sub,
            letterSpacing: '0.02em',
          }}>
            Save {pct}% today
          </span>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: v.text,
          }}>
            View deal <ChevronRight size={14} />
          </span>
        </div>
      </article>
    </Link>
  )
}
