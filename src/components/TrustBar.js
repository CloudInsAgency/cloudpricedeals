// Compact 4-up trust strip (green circular icons) shown under the top-deals
// grid. Distinct from the longer TrustSection content block lower on the page.
import { Tag, ShieldCheck, Clock, Lock } from 'lucide-react'

const ITEMS = [
  { Icon: Tag,         title: 'Handpicked Deals', body: 'We find the deals others often miss.' },
  { Icon: ShieldCheck, title: 'Verified Prices',  body: 'Cross-checked across top retailers.' },
  { Icon: Clock,       title: 'Updated Weekly',   body: 'Fresh deals every week you can count on.' },
  { Icon: Lock,        title: 'Safe & Secure',    body: 'Your privacy and security always come first.' },
]

export default function TrustBar() {
  return (
    <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px 0' }}>
      <div style={{
        background: 'var(--bg-section)',
        border: '1px solid var(--border)',
        borderRadius: '18px',
        padding: '28px 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px',
      }}>
        {ITEMS.map(function(it) {
          var Icon = it.Icon
          return (
            <div key={it.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <span style={{
                width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
                background: 'var(--accent)', color: '#FFFFFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={20} strokeWidth={2} />
              </span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-dm-serif), sans-serif', fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-primary)', marginBottom: '3px' }}>
                  {it.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {it.body}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
