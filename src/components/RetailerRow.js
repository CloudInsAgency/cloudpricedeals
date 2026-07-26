// "Shop by Retailer" — a full-width dark-green band with the retailer names as
// clean white wordmarks. We deliberately do NOT render the retailers' real
// logos (Amazon's mark is restricted under Associates terms; the others are
// trademarks) — these are plain styled text links. Each links to
// /browse?retailer=<id>, wired up in browse-client.js.
import Link from 'next/link'

const RETAILERS = [
  { id: 'amazon',  label: 'amazon',   weight: 700, spacing: '-0.02em', transform: 'lowercase' },
  { id: 'bestbuy', label: 'BEST BUY', weight: 800, spacing: '0.02em',  transform: 'uppercase' },
  { id: 'walmart', label: 'Walmart',  weight: 800, spacing: '-0.01em', transform: 'none' },
  { id: 'target',  label: 'target',   weight: 700, spacing: '0.01em',  transform: 'lowercase' },
  { id: 'ebay',    label: 'ebay',     weight: 800, spacing: '-0.02em', transform: 'lowercase' },
]

export default function RetailerRow() {
  return (
    <section aria-labelledby="shop-by-retailer-heading" style={{ padding: '40px 24px 8px' }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        background: 'var(--accent)', borderRadius: '18px',
        padding: '26px 36px',
        display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap',
      }}>
        <h2 id="shop-by-retailer-heading" style={{
          fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
          fontSize: '12px', fontWeight: 700, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.3, margin: 0, flexShrink: 0,
        }}>
          Shop by<br />Retailer
        </h2>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '20px', flexWrap: 'wrap' }}>
          {RETAILERS.map(function(r) {
            return (
              <Link key={r.id} href={'/browse?retailer=' + r.id} className="retailer-wordmark"
                style={{
                  fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                  fontSize: 'clamp(20px, 2.2vw, 28px)',
                  fontWeight: r.weight, letterSpacing: r.spacing, textTransform: r.transform,
                  color: '#FFFFFF', textDecoration: 'none', opacity: 0.92,
                  transition: 'opacity 0.15s, transform 0.15s',
                }}>
                {r.label}
              </Link>
            )
          })}
        </div>
      </div>
      <style>{`
        .retailer-wordmark:hover { opacity: 1 !important; transform: translateY(-1px); }
      `}</style>
    </section>
  )
}
