import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ComparisonCard from '@/components/ComparisonCard'
import { COMPARISONS } from '@/data/comparisons'

export const metadata = {
  title: 'Retailer Comparisons — Amazon vs Best Buy vs Walmart',
  description: 'Side-by-side retailer comparisons backed by real price tracking. Find out which retailer is actually cheaper before you buy.',
  alternates: { canonical: '/compare' },
  openGraph: {
    title: 'Retailer Comparisons — Which Store Is Actually Cheaper?',
    description: 'Real price data comparing Amazon, Best Buy, Walmart, Target, and eBay across the categories that matter.',
    url: 'https://cloudpricedeals.com/compare',
  },
}

export default function ComparePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border)', padding: '64px 24px 56px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'var(--accent-bg)', border: '1px solid var(--border-accent)', borderRadius: '100px', padding: '6px 18px', marginBottom: '24px' }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Retailer Comparisons</span>
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '16px' }}>
            Which retailer<br />is actually cheaper?
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
            Side-by-side comparisons backed by months of real price tracking. Pick a matchup to see who wins, by category.
          </p>
        </div>
      </div>

      {/* Comparison Cards */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {COMPARISONS.map(function(c) {
            return <ComparisonCard key={c.slug} comparison={c} />
          })}
        </div>
      </div>

      <Footer />
    </div>
  )
}
