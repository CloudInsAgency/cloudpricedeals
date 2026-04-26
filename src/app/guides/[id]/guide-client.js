'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { DEALS } from '@/data/deals'
import { ChevronLeft, ExternalLink } from 'lucide-react'
import { GUIDES } from './guides-data'

export default function GuideClient({ id }) {
  const guide = GUIDES.find(function(g) { return g.id === id })

  if (!guide) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-main)' }}>
        <Navbar />
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '120px 24px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '42px', color: 'var(--text-primary)', marginBottom: '16px' }}>Guide not found</h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '32px' }}>This guide doesn't exist or may have moved.</p>
          <Link href="/guides" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--accent)', color: '#FFFFFF', textDecoration: 'none', padding: '12px 28px', borderRadius: '8px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Back to Guides
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const relatedDeals = DEALS.filter(function(d) { return d.category === guide.relatedCategory }).slice(0, 3)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'var(--bg-section)', borderBottom: '1px solid var(--border)', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <Link href="/guides" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none' }}>
              <ChevronLeft size={14} /> Buying Guides
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', background: guide.tagBg, color: guide.tagColor, borderRadius: '100px' }}>{guide.tag}</span>
            {guide.badge && (
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', background: guide.badgeBg, color: guide.badgeColor, borderRadius: '100px' }}>{guide.badge}</span>
            )}
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px, 5vw, 46px)', color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '16px' }}>{guide.title}</h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '640px', marginBottom: '20px' }}>{guide.excerpt}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>📅 {guide.date}</span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>⏱ {guide.readTime}</span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>✍️ CloudPriceDeals Editorial</span>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '56px 24px' }}>

        {/* Affiliate Disclosure */}
        <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderLeft: '3px solid #3B82F6', borderRadius: '10px', padding: '16px 20px', marginBottom: '48px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 700, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Affiliate Disclosure</p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>CloudPriceDeals earns a commission on purchases made through links on this page. This never affects our recommendations.</p>
        </div>

        {/* Content Sections */}
        {guide.content.map(function(section, i) {
          return (
            <div key={i} style={{ marginBottom: '40px' }}>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '26px', color: 'var(--text-primary)', marginBottom: '14px', lineHeight: 1.25 }}>{section.heading}</h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.85 }}>{section.body}</p>
            </div>
          )
        })}

        {/* Related Deals */}
        {relatedDeals.length > 0 && (
          <div style={{ marginTop: '64px', paddingTop: '48px', borderTop: '1px solid var(--border)' }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '28px', color: 'var(--text-primary)', marginBottom: '24px' }}>Current deals mentioned in this guide</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {relatedDeals.map(function(deal) {
                var pct = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)
                return (
                  <a key={deal.id} href={deal.affiliateUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-section)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px 20px', textDecoration: 'none', gap: '12px' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{deal.name}</p>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-muted)' }}>Amazon · Free Prime shipping</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', color: 'var(--accent)' }}>${deal.price}</span>
                      <span style={{ background: 'var(--accent-bg)', color: 'var(--accent)', border: '1px solid var(--border-accent)', fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '100px' }}>-{pct}%</span>
                      <ExternalLink size={14} color="var(--text-muted)" />
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        )}

        {/* Back to Guides */}
        <div style={{ marginTop: '64px', textAlign: 'center' }}>
          <Link href="/guides" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: 'var(--accent)', border: '1px solid var(--border-accent)', textDecoration: 'none', padding: '12px 28px', borderRadius: '8px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Back to all guides
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
