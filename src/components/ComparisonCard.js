import Link from 'next/link'

// Sand surface, no gradient stripe. Color-blocked variant per slug so a
// row of comparisons reads like a curated set, not a repeating template.
const VARIANTS = ['color-block-sand', 'color-block-sage', 'color-block-blush', 'color-block-slate']
function variantFor(slug) {
  var s = slug || ''
  var hash = 0
  for (var i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0
  return VARIANTS[hash % VARIANTS.length]
}

export default function ComparisonCard({ comparison }) {
  var c = comparison
  var variant = variantFor(c.slug)
  return (
    <Link href={'/compare/' + c.slug} style={{ textDecoration: 'none' }}>
      <div className={variant} style={{ border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', height: '100%' }}>
        <div style={{ padding: '32px 28px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {c.retailers.map(function(r) {
              return (
                <span key={r} style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', background: 'rgba(255,255,255,0.7)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: '100px' }}>{r}</span>
              )
            })}
          </div>
          <h3 style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: '24px', color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: '14px' }}>{c.title}</h3>
          <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>{c.excerpt}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-secondary)' }}>Updated {c.lastUpdated}</span>
            <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '13px', color: 'var(--accent)', fontWeight: 700 }}>Read comparison →</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
