import Link from 'next/link'
import { ArrowUpRight, Laptop, CookingPot, Sparkles, Dumbbell, Home, Gamepad2, Tag } from 'lucide-react'

const VARIANT_CLASS = {
  sand:  'color-block-sand',
  sage:  'color-block-sage',
  blush: 'color-block-blush',
  slate: 'color-block-slate',
}

// Clean line-icon per category (replaces emoji for the fintech look)
const CATEGORY_ICON = {
  electronics: Laptop,
  kitchen:     CookingPot,
  beauty:      Sparkles,
  fitness:     Dumbbell,
  home:        Home,
  gaming:      Gamepad2,
}

// Color-blocked category tile for the homepage "Shop by category" section.
// Always links to /browse?cat=ID (the audit-shipped query param). Renders
// large, tappable, and visually distinct so the homepage scans like a shop.
export default function CategoryTile({ category, count, variant }) {
  var v = VARIANT_CLASS[variant] || VARIANT_CLASS.sand
  var Icon = CATEGORY_ICON[category.id] || Tag
  return (
    <Link
      href={category.id === 'all' ? '/browse' : '/browse?cat=' + category.id}
      className={v}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '24px',
        padding: '28px 24px',
        borderRadius: '18px',
        border: '1px solid var(--border)',
        textDecoration: 'none',
        minHeight: '180px',
        transition: 'transform 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'var(--accent-bg)', border: '1px solid var(--border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
          <Icon size={22} strokeWidth={2} />
        </span>
        <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.6)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
          <ArrowUpRight size={16} />
        </span>
      </div>
      <div>
        <h3 style={{ fontFamily: 'var(--font-dm-serif), sans-serif', fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '6px' }}>{category.label}</h3>
        <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)' }}>
          {count} {count === 1 ? 'deal' : 'deals'}
        </p>
      </div>
    </Link>
  )
}
