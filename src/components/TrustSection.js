// "Why shoppers trust CloudPriceDeals" — the 4th FTC disclosure surface.
// Bullet 3 contains the verbatim "As an Amazon Associate, [we] earn from
// qualifying purchases" copy required by the Associates Operating Agreement.
// Do not soften, abbreviate, or move that bullet. The component is a pure
// content block — no client interactivity, no state.
const BULLETS = [
  {
    title: 'We review every deal before it goes live.',
    body: 'Each price gets cross-checked against the retailer’s own listing the day we publish it. If it isn’t actually the lowest price we’ve seen this week, it doesn’t make the grid.',
  },
  {
    title: 'Our recommendation is the same whether you buy or not.',
    body: 'We don’t get paid more for some deals than others. The percentage we earn is set by the retailer, not by us, and it’s the same across the products we feature.',
  },
  {
    title: 'As an Amazon Associate, we earn from qualifying purchases.',
    body: 'That commission comes out of Amazon’s margin, never out of your price. You pay exactly the same as if you’d typed amazon.com directly.',
  },
  {
    title: 'We compare prices across five retailers, not just one.',
    body: 'Every product page shows you Amazon, Best Buy, Walmart, Target and eBay side by side. If Amazon isn’t actually cheapest, we say so.',
  },
  {
    title: 'We update the catalog every week.',
    body: 'Stale deals get removed. Sold-out items get pulled. The "Updated weekly" badge in the announcement bar isn’t decoration — that’s the whole product.',
  },
  {
    title: 'Real prices, real history.',
    body: 'No "Was $999, now $99" theatrics. The strikethrough price is the recent street price, not a manufacturer’s suggested retail you’d never actually pay.',
  },
]

export default function TrustSection() {
  return (
    <section
      aria-labelledby="trust-heading"
      style={{ background: 'var(--bg-section)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ maxWidth: '720px', marginBottom: '48px' }}>
          <p className="section-eyebrow" style={{ marginBottom: '14px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            Why shoppers trust us
          </p>
          <h2
            id="trust-heading"
            style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '14px' }}
          >
            Why shoppers trust CloudPriceDeals
          </h2>
          <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            No bait, no fake countdowns, no inflated original prices. Here&rsquo;s how we work.
          </p>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }} className="grid-1-mobile">
          {BULLETS.map(function(b, i) {
            return (
              <li
                key={b.title}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px 22px' }}
              >
                <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '10px' }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: '20px', color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '8px' }}>
                  {b.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {b.body}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
