import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { COMPARISONS } from '@/data/comparisons'
import { DEALS, RETAILERS } from '@/data/deals'

const SITE = 'https://cloudpricedeals.com'

export function generateStaticParams() {
  return COMPARISONS.map(function(c) { return { slug: c.slug } })
}

export function generateMetadata({ params }) {
  const c = COMPARISONS.find(function(x) { return x.slug === params.slug })
  if (!c) {
    return {
      title: 'Comparison not found',
      alternates: { canonical: '/compare/' + params.slug },
    }
  }
  const url = '/compare/' + c.slug
  return {
    title: c.title,
    description: c.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: c.title,
      description: c.excerpt,
      url: SITE + url,
      type: 'article',
    },
  }
}

function findDealsForCategory(c, categoryKey) {
  return DEALS
    .filter(function(d) { return d.category === categoryKey })
    .filter(function(d) {
      if (!d.comparePrices) return false
      var hasAll = c.retailerKeys.every(function(rk) {
        return d.comparePrices.some(function(cp) { return cp.retailer === rk })
      })
      return hasAll
    })
    .slice(0, 2)
}

export default function CompareDetailPage({ params }) {
  const c = COMPARISONS.find(function(x) { return x.slug === params.slug })
  if (!c) notFound()

  const url = SITE + '/compare/' + c.slug

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    description: c.excerpt,
    datePublished: c.datePublished,
    dateModified: c.dateModified,
    author: { '@type': 'Organization', name: 'CloudPriceDeals', url: SITE },
    publisher: {
      '@type': 'Organization',
      name: 'CloudPriceDeals',
      logo: { '@type': 'ImageObject', url: SITE + '/icon' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    about: c.retailers.map(function(name) {
      return { '@type': 'Organization', name: name }
    }),
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)' }}>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div style={{ background: 'var(--bg-section)', borderBottom: '1px solid var(--border)', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link href="/compare" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '24px' }}>
            <ChevronLeft size={14} /> Retailer Comparisons
          </Link>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {c.retailers.map(function(r) {
              return (
                <span key={r} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', background: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderRadius: '100px' }}>{r}</span>
              )
            })}
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px, 5vw, 46px)', color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '20px' }}>{c.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>📅 Updated {c.lastUpdated}</span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>✍️ CloudPriceDeals Editorial</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '56px 24px 32px' }}>

        {/* Intro paragraphs */}
        {c.intro.map(function(para, i) {
          return (
            <p key={i} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '20px' }}>
              {para}
            </p>
          )
        })}

        {/* Category breakdown */}
        <div style={{ marginTop: '48px' }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', color: 'var(--text-primary)', marginBottom: '8px' }}>Category breakdown</h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '32px' }}>
            Real price examples pulled from deals we're tracking right now.
          </p>

          {c.categories.map(function(cat) {
            var examples = findDealsForCategory(c, cat.key)
            return (
              <section key={cat.key} style={{ marginBottom: '40px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                  <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '24px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>{cat.emoji}</span> {cat.name}
                  </h3>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '5px 12px', background: 'var(--hot-bg)', color: 'var(--hot)', border: '1px solid var(--hot-border)', borderRadius: '100px' }}>
                    <Trophy size={12} /> Winner: {cat.winner}
                  </span>
                </div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: examples.length > 0 ? '24px' : '0' }}>
                  {cat.explanation}
                </p>

                {examples.length > 0 && (
                  <div>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      Live price examples
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {examples.map(function(deal) {
                        var prices = c.retailerKeys.map(function(rk) {
                          var cp = deal.comparePrices.find(function(p) { return p.retailer === rk })
                          return { rk: rk, cp: cp }
                        })
                        var minPrice = Math.min.apply(null, prices.map(function(p) { return p.cp.price }))
                        return (
                          <div key={deal.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', background: 'var(--bg-section)', border: '1px solid var(--border)', borderRadius: '12px', flexWrap: 'wrap' }}>
                            <Link href={'/product/' + deal.id} style={{ flex: 1, minWidth: '180px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none' }}>
                              {deal.shortName}
                            </Link>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                              {prices.map(function(p) {
                                var isBest = p.cp.price === minPrice
                                var rConfig = RETAILERS[p.rk] || {}
                                return (
                                  <div key={p.rk} style={{ minWidth: '120px', padding: '10px 14px', borderRadius: '10px', background: isBest ? 'var(--accent-bg)' : 'var(--bg-card)', border: '1px solid ' + (isBest ? 'var(--border-accent)' : 'var(--border)') }}>
                                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: rConfig.text || 'var(--text-muted)', marginBottom: '4px' }}>
                                      {rConfig.label || p.rk}
                                    </div>
                                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', color: isBest ? 'var(--accent)' : 'var(--text-primary)', lineHeight: 1 }}>
                                      ${p.cp.price}
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </section>
            )
          })}
        </div>

        {/* Verdict */}
        <div style={{ marginTop: '32px', background: 'var(--accent-bg)', border: '1px solid var(--border-accent)', borderLeft: '4px solid var(--accent)', borderRadius: '12px', padding: '28px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '10px' }}>The verdict</p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: 'var(--text-primary)', lineHeight: 1.8 }}>
            {c.verdict}
          </p>
        </div>

        {/* CTA */}
        <div style={{ marginTop: '48px', textAlign: 'center', padding: '40px 24px', background: 'var(--bg-section)', borderRadius: '16px' }}>
          <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '26px', color: 'var(--text-primary)', marginBottom: '10px' }}>Ready to shop the winners?</h3>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '440px', margin: '0 auto 24px' }}>
            Browse every deal we're tracking — already filtered to the cheapest retailer for each.
          </p>
          <Link href="/browse" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--accent)', color: '#FFFFFF', textDecoration: 'none', padding: '13px 28px', borderRadius: '8px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Browse all deals <ChevronRight size={16} />
          </Link>
        </div>

        {/* Back link */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <Link href="/compare" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: 'var(--accent)', border: '1px solid var(--border-accent)', textDecoration: 'none', padding: '12px 24px', borderRadius: '8px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Back to all comparisons
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
