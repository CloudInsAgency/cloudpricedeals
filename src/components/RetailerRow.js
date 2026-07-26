// "Shop by Retailer" — full-width dark-green band with a white logo chip per
// retailer (simplified marks via RetailerMark, not licensed brand logos). Each
// links to /browse?retailer=<id>, wired up in browse-client.js.
import Link from 'next/link'
import RetailerMark, { RETAILER_IDS } from './RetailerMark'

const LABELS = { amazon: 'Amazon', bestbuy: 'Best Buy', walmart: 'Walmart', target: 'Target', ebay: 'eBay' }

export default function RetailerRow() {
  return (
    <section aria-labelledby="shop-by-retailer-heading" style={{ padding: '40px 24px 8px' }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        background: 'var(--accent)', borderRadius: '18px',
        padding: '24px 32px',
        display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap',
      }}>
        <h2 id="shop-by-retailer-heading" style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '12px', fontWeight: 700, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.3, margin: 0, flexShrink: 0,
        }}>
          Shop by<br />Retailer
        </h2>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '16px', flexWrap: 'wrap' }}>
          {RETAILER_IDS.map(function(id) {
            return (
              <Link key={id} href={'/browse?retailer=' + id} className="retailer-chip"
                aria-label={'Shop ' + LABELS[id] + ' deals'}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  background: '#FFFFFF', borderRadius: '12px',
                  padding: '9px 16px 9px 10px', textDecoration: 'none',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}>
                <span style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <RetailerMark id={id} />
                </span>
                <span style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                  {LABELS[id]}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
      <style>{`
        .retailer-chip:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.18); }
      `}</style>
    </section>
  )
}
