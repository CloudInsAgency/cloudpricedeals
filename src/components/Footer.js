import Link from 'next/link'
import { Zap, Heart } from 'lucide-react'

export default function Footer() {
  var currentYear = new Date().getFullYear()

  var categories = [
    { label: 'Electronics', href: '/browse?cat=electronics' },
    { label: 'Kitchen',     href: '/browse?cat=kitchen' },
    { label: 'Fitness',     href: '/browse?cat=fitness' },
    { label: 'Home',        href: '/browse?cat=home' },
    { label: 'Gaming',      href: '/browse?cat=gaming' },
    { label: 'Style',       href: '/browse?cat=style' },
  ]
  var company = [
    { label: 'About',          href: '/about' },
    { label: 'Buying Guides',  href: '/guides' },
    { label: 'Browse Deals',   href: '/browse' },
    { label: 'My Wishlists',   href: '/wishlist' },
    { label: 'Privacy Policy', href: '/privacy' },
  ]
  var retailers = ['Amazon', 'Best Buy', 'Walmart', 'Target', 'eBay']

  return (
    <footer style={{ background: 'var(--bg-section)', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
      <style>{`
        .footer-link { color: var(--text-secondary) !important; text-decoration: none; font-family: 'DM Sans', sans-serif; font-size: 14px; display: block; transition: color 0.15s; }
        .footer-link:hover { color: var(--accent) !important; }
      `}</style>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 24px 40px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px', marginBottom: '48px' }}>

          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '28px', height: '28px', background: 'var(--accent)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={15} color="#FFFFFF" fill="#FFFFFF" />
              </div>
              <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', color: 'var(--text-primary)' }}>
                Cloud<span style={{ color: 'var(--accent)' }}>Price</span>Deals
              </span>
            </Link>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px', maxWidth: '240px' }}>
              We compare prices across 5 major retailers every week so you always buy at the lowest price.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--accent)', fontWeight: 600 }}>Updated weekly</span>
            </div>
          </div>

          <div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>Categories</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {categories.map(function(c) {
                return <Link key={c.href} href={c.href} className="footer-link">{c.label}</Link>
              })}
            </div>
          </div>

          <div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>Company</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {company.map(function(c) {
                return <Link key={c.href} href={c.href} className="footer-link">{c.label}</Link>
              })}
            </div>
          </div>

          <div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>We Compare</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {retailers.map(function(r) {
                return <span key={r} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>{r}</span>
              })}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '28px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '560px' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Affiliate Disclosure:</strong> CloudPriceDeals earns a commission when you purchase through links on this site. This never affects the price you pay or our editorial recommendations. We are a participant in the Amazon Associates Program.
          </p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-muted)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
            © {currentYear} CloudPriceDeals · Made with
            <Heart size={12} style={{ color: 'var(--hot)', display: 'inline', verticalAlign: 'middle' }} />
            by Cloud Design Studio LLC
          </p>
        </div>
      </div>
    </footer>
  )
}
