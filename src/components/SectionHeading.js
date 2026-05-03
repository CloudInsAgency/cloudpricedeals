import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

// Standardized eyebrow + serif H2 + optional subhead + optional CTA link.
// Replaces ~7 hand-built section heads on the homepage.
export default function SectionHeading({ eyebrow, title, subhead, linkHref, linkLabel }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {eyebrow ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>
              {eyebrow}
            </span>
          </div>
        ) : null}
        <h2 style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: 'clamp(30px, 4.5vw, 48px)', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: subhead ? '10px' : 0 }}>{title}</h2>
        {subhead ? (
          <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '560px' }}>{subhead}</p>
        ) : null}
      </div>
      {linkHref ? (
        <Link href={linkHref} style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '14px', fontWeight: 700, color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
          {linkLabel || 'View all'} <ChevronRight size={16} />
        </Link>
      ) : null}
    </div>
  )
}
