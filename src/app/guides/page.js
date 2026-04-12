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
    date: 'March 2026',
    readTime: '7 min read',
    badge: 'Data-backed',
    badgeColor: '#00D084',
    badgeBg: 'rgba(0,208,132,0.12)',
    status: 'published',
  },
  {
    id: 'best-time-to-buy-electronics',
    tag: 'Shopping Strategy',
    tagColor: '#F59E0B',
    tagBg: 'rgba(245,158,11,0.12)',
    title: 'The Best Time of Year to Buy Electronics (Month by Month)',
    excerpt: 'January TVs, July appliances, October everything — we mapped out exactly when prices drop at Amazon and Best Buy so you can time your purchases perfectly.',
    date: 'March 2026',
    readTime: '8 min read',
    badge: 'Most Popular',
    badgeColor: '#FF4757',
    badgeBg: 'rgba(255,71,87,0.12)',
    status: 'published',
  },
  {
    id: 'headphones-under-150-guide',
    tag: 'Buying Guide',
    tagColor: '#3B82F6',
    tagBg: 'rgba(59,130,246,0.12)',
    title: 'Best Headphones Under $150 in 2026 — Tested and Ranked',
    excerpt: 'We tested 12 pairs of headphones under $150 across noise cancellation, sound quality, battery life and comfort. Here are the ones actually worth buying.',
    date: 'April 2026',
    readTime: '9 min read',
    badge: "Editor's Pick",
    badgeColor: '#A855F7',
    badgeBg: 'rgba(168,85,247,0.12)',
    status: 'published',
  },
  {
    id: 'kitchen-appliances-price-guide',
    tag: 'Kitchen',
    tagColor: '#F59E0B',
    tagBg: 'rgba(245,158,11,0.12)',
    title: 'Kitchen Appliances: When to Buy at Amazon vs Target vs Walmart',
    excerpt: 'Instant Pots, air fryers, coffee makers — we tracked prices for 6 months to find out which retailers consistently win on kitchen deals.',
    date: 'April 2026',
    readTime: '6 min read',
    badge: null,
    status: 'published',
  },
]

export default function GuidesPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border)', padding: '64px 24px 56px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'var(--accent-bg)', border: '1px solid var(--border-accent)', borderRadius: '100px', padding: '6px 18px', marginBottom: '24px' }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Buying Guides</span>
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '16px' }}>
            Shop smarter.<br />Buy once.
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto' }}>
            Data-backed guides that show you exactly what to buy and where to buy it cheapest.
          </p>
        </div>
      </div>

      {/* Guides Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {GUIDES.map(function(guide) {
            return (
              <Link key={guide.id} href={'/guides/' + guide.id} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', height: '100%' }}>
                  <div style={{ height: '6px', background: 'linear-gradient(90deg, var(--accent), #059669)' }} />
                  <div style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', background: guide.tagBg, color: guide.tagColor, borderRadius: '100px' }}>{guide.tag}</span>
                      {guide.badge && (
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', background: guide.badgeBg, color: guide.badgeColor, borderRadius: '100px' }}>{guide.badge}</span>
                      )}
                    </div>
                    <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '12px' }}>{guide.title}</h2>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>{guide.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-muted)' }}>{guide.date} · {guide.readTime}</span>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--accent)', fontWeight: 600 }}>Read →</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <Footer />
    </div>
  )
}
