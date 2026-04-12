import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Buying Guides — Amazon vs Best Buy vs Walmart Price Comparisons',
  description: 'Data-backed buying guides comparing prices at Amazon, Best Buy, Walmart, Target and eBay. Find out which retailer is actually cheaper before you buy.',
  alternates: { canonical: 'https://cloudpricedeals.com/guides' },
  openGraph: {
    title: 'Buying Guides — Which Retailer is Actually Cheaper?',
    description: 'Data-backed price comparisons across Amazon, Best Buy, Walmart, Target and eBay.',
    url: 'https://cloudpricedeals.com/guides',
  },
}

const GUIDES = [
  {
    id: 'amazon-vs-bestbuy-electronics',
    tag: 'Price Comparison',
    tagColor: '#3B82F6',
    tagBg: 'rgba(59,130,246,0.12)',
    title: 'Amazon vs Best Buy: Which is Cheaper for Electronics?',
    excerpt: "We compared 200 products across both retailers over 60 days. The results reveal a clear winner — but it depends entirely on what category you're buying in.",
    date: 'March 2026', readTime: '7 min read',
    badge: 'Data-backed', badgeColor: '#00D084', badgeBg: 'rgba(0,208,132,0.12)',
    status: 'published',
  },
  {
    id: 'best-time-to-buy-electronics',
    tag: 'Shopping Strategy',
    tagColor: '#F59E0B',
    tagBg: 'rgba(245,158,11,0.12)',
    title: 'The Best Time of Year to Buy Electronics (Month by Month)',
    excerpt: 'January TVs, July appliances, October everything — we mapped out exactly when prices drop at Amazon and Best Buy so you can time your purchases perfectly.',
    date: 'March 2026', readTime: '8 min read',
    badge: 'Most Popular', badgeColor: '#FF4757', badgeBg: 'rgba(255,71,87,0.12)',
    status: 'published',
  },
  {
    id: 'headphones-under-150-guide',
    tag: 'Buying Guide',
    tagColor: '#3B82F6',
    tagBg: 'rgba(59,130,246,0.12)',
    title: 'Best Headphones Under $150 in 2026 — Tested and Ranked',
    excerpt: 'We tested 12 pairs of headphones under $150 across noise cancellation, sound quality, battery life and comfort.',
    date: 'April 2026', readTime: '10 min read',
    badge: "Editor's Pick", badgeColor: '#00D084', badgeBg: 'rgba(0,208,132,0.12)',
    status: 'published',
  },
  {
    id: 'robot-vacuum-buying-guide',
    tag: 'Buying Guide',
    tagColor: '#3B82F6',
    tagBg: 'rgba(59,130,246,0.12)',
    title: 'Robot Vacuum Buying Guide 2026 — What Actually Matters',
    excerpt: 'Suction power, mapping quality, mop combo, self-emptying — we cut through the spec sheet noise and tell you what actually makes a difference.',
    date: 'April 2026', readTime: '9 min read',
    badge: null, status: 'published',
  },
  {
    id: 'amazon-vs-walmart-prices',
    tag: 'Coming Soon', tagColor: '#94A3B8', tagBg: 'rgba(148,163,184,0.12)',
    title: 'Amazon vs Walmart: Who Really Has Lower Prices?',
    excerpt: '60 days of tracking 150 products across both retailers. Coming soon with full breakdown by category.',
    date: 'April 2026', readTime: '6 min read',
    badge: null, status: 'coming-soon',
  },
  {
    id: 'bestbuy-vs-ebay-open-box',
    tag: 'Coming Soon', tagColor: '#94A3B8', tagBg: 'rgba(148,163,184,0.12)',
    title: 'Best Buy Open-Box vs eBay Certified Refurbished — Which Wins?',
    excerpt: 'Best Buy open-box vs eBay certified refurbished — we test both on price, condition, and warranty coverage.',
    date: 'April 2026', readTime: '5 min read',
    badge: null, status: 'coming-soon',
  },
]

export default function GuidesPage() {
  var published = GUIDES.filter(function(g) { return g.status === 'published' })
  var comingSoon = GUIDES.filter(function(g) { return g.status === 'coming-soon' })
  var featured = GUIDES[0]

  return (
    <div style={{ minHeight: '100vh', background: '#0A0E1A', overflowX: 'hidden' }}>
      <Navbar />
      <style>{`
        .guide-card { transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s; }
        .guide-card:hover { transform: translateY(-3px) !important; border-color: rgba(0,208,132,0.3) !important; box-shadow: 0 8px 32px rgba(0,208,132,0.08) !important; }
      `}</style>

      <div style={{ background: 'linear-gradient(180deg, #111827 0%, #0A0E1A 100%)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '64px 24px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Link href="/" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#475569', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#475569' }}>/</span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#94A3B8' }}>Buying Guides</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00D084', display: 'inline-block' }} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#00D084' }}>Data-backed research</span>
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(36px, 6vw, 64px)', color: '#F0F4FF', lineHeight: 1.1, marginBottom: '20px' }}>Buying Guides</h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: '#94A3B8', maxWidth: '560px', lineHeight: 1.7 }}>
            Data-backed guides comparing prices across Amazon, Best Buy, Walmart, Target and eBay. Find out who is actually cheaper before you buy.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '56px 24px 96px' }}>

        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#00D084', marginBottom: '20px' }}>Featured Guide</p>
          <div style={{ background: '#111827', border: '1px solid rgba(0,208,132,0.2)', borderRadius: '16px', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ padding: '40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', background: featured.tagBg, color: featured.tagColor, borderRadius: '100px' }}>{featured.tag}</span>
                  {featured.badge && <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', background: featured.badgeBg, color: featured.badgeColor, borderRadius: '100px' }}>{featured.badge}</span>}
                </div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px, 3vw, 32px)', color: '#F0F4FF', lineHeight: 1.2, marginBottom: '16px' }}>{featured.title}</h2>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#94A3B8', lineHeight: 1.7 }}>{featured.excerpt}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
                <Link href={'/guides/' + featured.id} style={{ background: '#00D084', color: '#0A0E1A', textDecoration: 'none', padding: '12px 28px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: '8px' }}>
                  Read Guide →
                </Link>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#475569' }}>{featured.date} · {featured.readTime}</span>
              </div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, rgba(0,208,132,0.12) 0%, rgba(59,130,246,0.08) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px', minHeight: '240px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '28px', color: '#F0F4FF', lineHeight: 1.2 }}>Amazon<br />vs<br />Best Buy</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#00D084', marginTop: '12px', fontWeight: 600 }}>200 products · 60 days</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#00D084', marginBottom: '24px' }}>All Guides</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {published.map(function(guide) {
              return (
                <Link key={guide.id} href={'/guides/' + guide.id} style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="guide-card" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '28px', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', background: guide.tagBg, color: guide.tagColor, borderRadius: '100px' }}>{guide.tag}</span>
                      {guide.badge && <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', background: guide.badgeBg, color: guide.badgeColor, borderRadius: '100px' }}>{guide.badge}</span>}
                    </div>
                    <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', color: '#F0F4FF', lineHeight: 1.25, marginBottom: '12px' }}>{guide.title}</h3>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#94A3B8', lineHeight: 1.7, marginBottom: '20px' }}>{guide.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#475569' }}>{guide.date} · {guide.readTime}</span>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#00D084' }}>Read →</span>
                    </div>
                  </div>
                </Link>
              )
            })}
            {comingSoon.map(function(guide) {
              return (
                <div key={guide.id} style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '28px', opacity: 0.5 }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', background: guide.tagBg, color: guide.tagColor, borderRadius: '100px' }}>{guide.tag}</span>
                  </div>
                  <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', color: '#F0F4FF', lineHeight: 1.25, marginBottom: '12px' }}>{guide.title}</h3>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#94A3B8', lineHeight: 1.7, marginBottom: '20px' }}>{guide.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#475569' }}>{guide.date} · {guide.readTime}</span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#475569', fontWeight: 600 }}>Coming soon</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #111827 0%, #1A2235 100%)', border: '1px solid rgba(0,208,132,0.2)', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '36px', color: '#F0F4FF', marginBottom: '12px' }}>Ready to find the best deal?</h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#94A3B8', marginBottom: '28px' }}>Browse all 20 current deals — prices compared across 5 retailers.</p>
          <Link href="/browse" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#00D084', color: '#0A0E1A', textDecoration: 'none', padding: '14px 32px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: '8px' }}>
            Browse All Deals →
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
