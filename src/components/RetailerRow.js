// "Shop by Retailer" — small section title with a horizontal row of clean
// text-based pills. We deliberately do NOT render real retailer logos here
// (Amazon's mark is restricted under Associates terms; the others are
// trademarks). Each pill links to /browse?retailer=<id> which is wired up
// in browse-client.js.
import Link from 'next/link'

const RETAILERS = [
  { id: 'amazon',  label: 'Amazon' },
  { id: 'bestbuy', label: 'Best Buy' },
  { id: 'walmart', label: 'Walmart' },
  { id: 'target',  label: 'Target' },
  { id: 'ebay',    label: 'eBay' },
]

export default function RetailerRow() {
  return (
    <section
      aria-labelledby="shop-by-retailer-heading"
      style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 24px 0' }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '20px',
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span aria-hidden="true" style={{
            width: '28px', height: '2px', background: 'var(--accent)', borderRadius: '2px',
          }} />
          <h2 id="shop-by-retailer-heading" style={{
            fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            margin: 0,
          }}>
            Shop by Retailer
          </h2>
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
      }}>
        {RETAILERS.map(function(r) {
          return (
            <Link
              key={r.id}
              href={'/browse?retailer=' + r.id}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '120px',
                minHeight: '48px',
                padding: '10px 22px',
                fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '100px',
                textDecoration: 'none',
                transition: 'border-color 0.15s, transform 0.15s, background 0.15s',
              }}
              className="retailer-pill"
            >
              {r.label}
            </Link>
          )
        })}
      </div>
      <style>{`
        .retailer-pill:hover {
          border-color: var(--accent);
          background: var(--accent-bg);
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  )
}
