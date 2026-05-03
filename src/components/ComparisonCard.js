import Link from 'next/link'

export default function ComparisonCard({ comparison }) {
  var c = comparison
  return (
    <Link href={'/compare/' + c.slug} style={{ textDecoration: 'none' }}>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', height: '100%' }}>
        <div style={{ height: '6px', background: 'var(--accent)' }} />
        <div style={{ padding: '28px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {c.retailers.map(function(r) {
              return (
                <span key={r} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', background: 'var(--bg-section)', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderRadius: '100px' }}>{r}</span>
              )
            })}
          </div>
          <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '12px' }}>{c.title}</h3>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>{c.excerpt}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-muted)' }}>Updated {c.lastUpdated}</span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--accent)', fontWeight: 600 }}>Read comparison →</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
