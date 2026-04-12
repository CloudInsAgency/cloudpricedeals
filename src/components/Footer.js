import Link from 'next/link'
import { Zap, Heart } from 'lucide-react'

export default function Footer() {
  var currentYear = new Date().getFullYear()

  var retailers = ['Amazon', 'Best Buy', 'Walmart', 'Target', 'eBay']
  var categories = [
    { label: 'Electronics', href: '/browse?cat=electronics' },
    { label: 'Kitchen',     href: '/browse?cat=kitchen' },
    { label: 'Fitness',     href: '/browse?cat=fitness' },
    { label: 'Home',        href: '/browse?cat=home' },
    { label: 'Gaming',      href: '/browse?cat=gaming' },
    { label: 'Style',       href: '/browse?cat=style' },
  ]
  var company = [
    { label: 'About',       href: '/about' },
    { label: 'Buying Guides', href: '/guides' },
    { label: 'Browse Deals', href: '/browse' },
    { label: 'My Wishlists', href: '/wishlist' },
    { label: 'Privacy Policy', href: '/privacy' },
  ]

  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>

          <div style={{ gridColumn: 'span 1' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '28px', height: '28px', background: 'var(--green)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={15} color="#0A0E1A" fill="#0A0E1A" />
              </div>
              <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', color: 'var(--text)' }}>
                Cloud<span style={{ color: 'var(--green)' }}>Price</span>Deals
              </span>
            </Link>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '20px', maxWidth: '260px' }}>
              We compare prices across 5 major retailers every week so you always buy at the lowest price.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="live-dot" />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--green)', fontWeight: 600 }}>Updated weekly</span>
            </div>
          </div>

          <div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '16px' }}>Categories</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {categories.map(function(c) {
                return (
                  <Link key={c.href} href={c.href} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={function(e) { e.target.style.color = 'var(--green)' }}
                    onMouseLeave={function(e) { e.target.style.color = 'var(--text-2)' }}>
                    {c.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '16px' }}>Company</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {company.map(function(c) {
                return (
                  <Link key={c.href} href={c.href} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={function(e) { e.target.style.color = 'var(--green)' }}
                    onMouseLeave={function(e) { e.target.style.color = 'var(--text-2)' }}>
                    {c.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '16px' }}>We Compare</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {retailers.map(function(r) {
                return (
                  <span key={r} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-2)' }}>{r}</span>
                )
              })}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '28px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.6, maxWidth: '560px' }}>
              <strong style={{ color: 'var(--text-2)' }}>Affiliate Disclosure:</strong> CloudPriceDeals earns a commission when you purchase through links on this site. This never affects the price you pay or our editorial recommendations. We are a participant in the Amazon Associates Program.
            </p>
          </div>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-3)', whiteSpace: 'nowrap', flexShrink: 0 }}>
            © {currentYear} CloudPriceDeals · Made with <Heart size={12} style={{ display: 'inline', verticalAlign: 'middle', color: '#FF4757' }} /> by Cloud Design Studio LLC
          </p>
        </div>
      </div>
    </footer>
  )
}
