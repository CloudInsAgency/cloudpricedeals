'use client'
import Link from 'next/link'

const guides = [
  {
    id: 'best-wireless-earbuds-under-100',
    title: 'Best Wireless Earbuds Under $100 in 2026',
    excerpt: 'We tested 12 pairs and compared prices across Amazon, Best Buy and Walmart. Here\'s what actually delivers the best sound for the money.',
    tag: 'Electronics',
    tagBg: 'rgba(99,102,241,0.15)',
    tagColor: '#818CF8',
    badge: 'Editor\'s Pick',
    badgeBg: 'rgba(16,185,129,0.15)',
    badgeColor: '#10B981',
    date: 'April 2026',
    readTime: '6 min read',
    img: null,
  },
  {
    id: 'air-fryer-buying-guide',
    title: 'Air Fryer Buying Guide: Best Models $50–$150',
    excerpt: 'Air fryers vary wildly in quality at this price range. We break down the top 8 models and where to buy each one cheapest.',
    tag: 'Kitchen',
    tagBg: 'rgba(245,158,11,0.15)',
    tagColor: '#F59E0B',
    badge: null,
    date: 'March 2026',
    readTime: '5 min read',
    img: null,
  },
  {
    id: 'smart-home-starter-kit',
    title: 'Smart Home Starter Kit: What to Buy First',
    excerpt: 'From smart plugs to video doorbells — which devices are actually worth it and which retailer has the best bundle deals.',
    tag: 'Home',
    tagBg: 'rgba(59,130,246,0.15)',
    tagColor: '#60A5FA',
    badge: 'Popular',
    badgeBg: 'rgba(239,68,68,0.15)',
    badgeColor: '#F87171',
    date: 'March 2026',
    readTime: '7 min read',
    img: null,
  },
  {
    id: 'fitness-tracker-comparison',
    title: 'Fitness Tracker Comparison: Fitbit vs Garmin vs Samsung',
    excerpt: 'We compared specs, prices and real-world accuracy across all major retailers. Find the best tracker for your budget.',
    tag: 'Fitness',
    tagBg: 'rgba(16,185,129,0.15)',
    tagColor: '#10B981',
    badge: null,
    date: 'February 2026',
    readTime: '8 min read',
    img: null,
  },
]

export default function GuidesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0F1A', color: 'white' }}>

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '32px', background: '#10B981', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>⚡</div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '18px' }}>
              <span style={{ color: 'white' }}>Cloud</span><span style={{ color: '#10B981' }}>Price</span><span style={{ color: 'white' }}>Deals</span>
            </span>
          </Link>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Link href="/deals" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Deals</Link>
            <Link href="/browse" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Browse</Link>
            <Link href="/guides" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#10B981', textDecoration: 'none', fontWeight: 600 }}>Guides</Link>
            <Link href="/wishlist" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Wishlists</Link>
            <Link href="/about" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>About</Link>
          </div>
          <Link href="/browse" style={{ background: '#10B981', color: 'white', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 700, padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            BROWSE DEALS
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #0A0F1A 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '64px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 700, color: '#10B981', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Buying Guides</span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>
            Shop smarter.<br />Buy once.
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
            Data-backed guides that show you exactly what to buy and where to buy it cheapest.
          </p>
        </div>
      </div>

      {/* Guides Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {guides.map(guide => (
            <Link key={guide.id} href={`/guides/${guide.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', overflow: 'hidden', transition: 'border-color 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(16,185,129,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}>
                {/* Card header */}
                <div style={{ height: '8px', background: 'linear-gradient(90deg, #10B981, #059669)' }} />
                <div style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', background: guide.tagBg, color: guide.tagColor, borderRadius: '100px' }}>{guide.tag}</span>
                    {guide.badge && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', background: guide.badgeBg, color: guide.badgeColor, borderRadius: '100px' }}>{guide.badge}</span>}
                  </div>
                  <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 700, color: 'white', lineHeight: 1.3, marginBottom: '12px' }}>{guide.title}</h2>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '20px' }}>{guide.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>📅 {guide.date}</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>⏱ {guide.readTime}</span>
                    </div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#10B981', fontWeight: 600 }}>Read →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
```

---

### Fix 2 — Ticker speed + top deal image

In `src/app/page.js`, find the ticker animation and the top deals image. Here are the two targeted changes:

**Ticker — slow it down:** Find this in your `page.js`:
```
@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); }
