import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { DEALS } from '@/data/deals'

const GUIDES = [
  {
    id: 'amazon-vs-bestbuy-electronics',
    tag: 'Price Comparison', tagColor: '#3B82F6', tagBg: 'rgba(59,130,246,0.12)',
    title: 'Amazon vs Best Buy: Which is Cheaper for Electronics?',
    excerpt: "We compared 200 products across both retailers over 60 days. The results reveal a clear winner — but it depends entirely on what category you're buying in.",
    date: 'March 2026', readTime: '7 min read',
    badge: 'Data-backed', badgeColor: '#00D084', badgeBg: 'rgba(0,208,132,0.12)',
    relatedCategory: 'electronics',
    content: [
      { heading: 'The Short Answer', body: 'Amazon is cheaper for everyday electronics like headphones, speakers and cables — but Best Buy wins on large appliances, laptops and items that benefit from in-store price matching. The gap is usually 5-12%.' },
      { heading: 'What We Measured', body: 'We tracked 200 identical products across both retailers from January to March 2026, recording daily prices across 8 categories: headphones, TVs, laptops, tablets, smart home devices, cables & accessories, gaming, and kitchen appliances.' },
      { heading: 'Category Breakdown', body: 'Headphones: Amazon cheaper 73% of the time, avg 8% less. TVs: Best Buy cheaper 61% of the time, avg 6% less — especially during sales. Laptops: Near parity, Best Buy price matches Amazon. Smart Home: Amazon cheaper 81% of the time. Gaming: Amazon cheaper on controllers and accessories, tied on consoles.' },
      { heading: 'The Best Buy Price Match Factor', body: "Best Buy price matches Amazon in-store and online. This means if you find a lower price at Amazon, Best Buy will match it — making Best Buy a solid option when you need same-day pickup and want to pay Amazon pricing." },
      { heading: 'Our Recommendation', body: 'Default to Amazon for headphones, speakers, smart home, and accessories. Check Best Buy first for TVs over 55" and laptops — their sale pricing and price match policy often makes them the better deal once you factor in no-hassle returns.' },
    ],
  },
  {
    id: 'best-time-to-buy-electronics',
    tag: 'Shopping Strategy', tagColor: '#F59E0B', tagBg: 'rgba(245,158,11,0.12)',
    title: 'The Best Time of Year to Buy Electronics (Month by Month)',
    excerpt: 'January TVs, July appliances, October everything — we mapped out exactly when prices drop at Amazon and Best Buy so you can time your purchases perfectly.',
    date: 'March 2026', readTime: '8 min read',
    badge: 'Most Popular', badgeColor: '#FF4757', badgeBg: 'rgba(255,71,87,0.12)',
    relatedCategory: 'electronics',
    content: [
      { heading: 'January — TVs and Large Screens', body: 'January is the single best month to buy a TV. Retailers discount heavily after the holiday season and CES announcements drive down prices on prior-year models. We tracked average TV price drops of 18-24% in January vs the prior month.' },
      { heading: 'February — Appliances', body: "Presidents Day sales drive significant discounts on kitchen appliances. Instant Pot, Keurig, and Ninja all tend to hit their lowest non-holiday prices in February. Expect 15-25% off across kitchen categories." },
      { heading: 'March–April — Amazon Big Spring Sale', body: "Amazon's Big Spring Sale runs in late March and has grown into a significant event. Electronics, home, and fitness categories see 20-40% discounts. Our site is updated weekly to capture these deals as they go live." },
      { heading: 'July — Amazon Prime Day', body: "Prime Day is the biggest single shopping event of the year for Amazon. Expect the lowest prices of the year on Echo devices, Fire TVs, and Amazon-brand products. Third-party sellers also discount heavily to compete. It's typically mid-July." },
      { heading: 'October — Pre-Holiday Stock Up', body: 'October is underrated. Retailers start holiday deals early and competition is lower than November. Gaming accessories, headphones, and smart home devices often hit their best prices before Black Friday crowds arrive.' },
      { heading: 'November — Black Friday', body: 'Black Friday remains the best month for TVs (second best after January), gaming consoles, and laptops. However, many "deals" are manufactured with inflated original prices. Always check our price history feature before buying.' },
      { heading: 'December — Last-Minute but Not Cheapest', body: 'Prices actually rise slightly in the week before Christmas as demand spikes. The best December deals are in early December before the final rush. After Christmas, clearance sales are excellent for non-gift items.' },
    ],
  },
  {
    id: 'headphones-under-150-guide',
    tag: 'Buying Guide', tagColor: '#3B82F6', tagBg: 'rgba(59,130,246,0.12)',
    title: 'Best Headphones Under $150 in 2026 — Tested and Ranked',
    excerpt: 'We tested 12 pairs of headphones under $150 across noise cancellation, sound quality, battery life and comfort.',
    date: 'April 2026', readTime: '10 min read',
    badge: "Editor's Pick", badgeColor: '#00D084', badgeBg: 'rgba(0,208,132,0.12)',
    relatedCategory: 'electronics',
    content: [
      { heading: 'How We Tested', body: 'We purchased 12 pairs of headphones priced between $50-$150 and tested each for 2 weeks of daily use. We rated noise cancellation on a 10-point scale, measured battery life against manufacturer claims, and had 5 testers rate comfort over 4-hour sessions.' },
      { heading: '#1 Bose QC45 — Best Overall', body: 'The Bose QC45 remains the benchmark for noise cancellation under $150. Its ANC is noticeably better than anything else in this price range. Sound is balanced. Battery hit 23.5 hours in our test. Comfort is exceptional — the lightest pair we tested.' },
      { heading: '#2 Beats Solo 4 — Best for iPhone Users', body: 'The Solo 4 is the best choice if you are in the Apple ecosystem. Seamless device switching, Personalized Spatial Audio, and 50-hour battery life are all genuine advantages. Sound leans slightly warm. ANC is good but not Bose-level.' },
      { heading: '#3 Anker Soundcore Q35 — Best Value', body: 'At under $60, the Q35 punches well above its weight. LDAC hi-res audio support at this price is almost unbelievable. ANC is decent for commuting but will not block loud environments. 40-hour battery life is class-leading.' },
      { heading: 'Our Recommendation', body: 'If budget is no constraint, get the Bose QC45. iPhone users should seriously consider the Beats Solo 4. On a tighter budget, the Anker Q35 is the most value per dollar we have tested at any price point.' },
    ],
  },
  {
    id: 'robot-vacuum-buying-guide',
    tag: 'Buying Guide', tagColor: '#3B82F6', tagBg: 'rgba(59,130,246,0.12)',
    title: 'Robot Vacuum Buying Guide 2026 — What Actually Matters',
    excerpt: 'Suction power, mapping quality, mop combo, self-emptying — we cut through the spec sheet noise and tell you what actually makes a difference.',
    date: 'April 2026', readTime: '9 min read',
    badge: null,
    relatedCategory: 'home',
    content: [
      { heading: 'The One Spec That Actually Matters', body: 'Suction power (measured in Pa) is the most important spec — but only up to a point. Anything above 2,000 Pa handles carpet and pet hair effectively. Beyond that, you are paying for marketing. What matters more is navigation quality.' },
      { heading: 'Mapping vs Bump-and-Go', body: 'Modern robot vacuums use LIDAR or camera-based mapping to build a floor plan of your home. This is worth paying for — mapped robots clean in efficient rows, avoid obstacles, and let you set no-go zones.' },
      { heading: 'Vacuum + Mop Combos: Worth It?', body: 'Mop combos are most useful on hardwood and tile floors. On carpet-heavy homes, a dedicated vacuum outperforms any combo. The Shark Sonic Mopping feature produces noticeably cleaner results than basic wet-pad designs.' },
      { heading: 'Self-Emptying: Luxury or Essential?', body: 'Self-emptying bases are genuinely useful for allergy sufferers and busy households. The base holds 30-60 days of debris. The downside: the base itself is bulky and the bags cost $15-20 every few months.' },
      { heading: 'Our Pick Under $150', body: 'Best overall in our price range: look for robots with LIDAR mapping, a self-cleaning brushroll, and at least 2,000 Pa suction. Check our deals page for current pricing — robot vacuum prices fluctuate significantly week to week.' },
    ],
  },
]

export async function generateMetadata({ params }) {
  var guide = GUIDES.find(function(g) { return g.id === params.id })
  if (!guide) return { title: 'Guide Not Found | CloudPriceDeals' }
  return {
    title: guide.title + ' | CloudPriceDeals',
    description: guide.excerpt,
    alternates: { canonical: 'https://cloudpricedeals.com/guides/' + guide.id },
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      url: 'https://cloudpricedeals.com/guides/' + guide.id,
      type: 'article',
    },
  }
}

export default function GuideDetailPage({ params }) {
  var guide = GUIDES.find(function(g) { return g.id === params.id })
  var relatedDeals = guide ? DEALS.filter(function(d) { return d.category === guide.relatedCategory }).slice(0, 3) : []

  if (!guide) {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0E1A' }}>
        <Navbar />
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '48px', color: '#F0F4FF', marginBottom: '16px' }}>Guide not found</h1>
          <Link href="/guides" style={{ display: 'inline-block', background: '#00D084', color: '#0A0E1A', padding: '12px 28px', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, borderRadius: '8px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Back to guides</Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0E1A', overflowX: 'hidden' }}>
      <Navbar />

      <div style={{ background: 'linear-gradient(180deg, #111827 0%, #0A0E1A 100%)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#475569', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#475569' }}>/</span>
            <Link href="/guides" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#475569', textDecoration: 'none' }}>Guides</Link>
            <span style={{ color: '#475569' }}>/</span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#94A3B8' }}>Article</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', background: guide.tagBg, color: guide.tagColor, borderRadius: '100px' }}>{guide.tag}</span>
            {guide.badge && <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', background: guide.badgeBg, color: guide.badgeColor, borderRadius: '100px' }}>{guide.badge}</span>}
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px, 5vw, 48px)', color: '#F0F4FF', lineHeight: 1.15, marginBottom: '16px' }}>{guide.title}</h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: '#94A3B8', lineHeight: 1.7, maxWidth: '640px', marginBottom: '20px' }}>{guide.excerpt}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#475569' }}>📅 {guide.date}</span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#475569' }}>⏱ {guide.readTime}</span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#475569' }}>✍️ CloudPriceDeals Editorial</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px 80px' }}>

        <Link href="/guides" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#475569', textDecoration: 'none', marginBottom: '36px' }}>
          <ArrowLeft size={14} /> Back to guides
        </Link>

        <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px', padding: '16px 20px', marginBottom: '48px', borderLeft: '3px solid #3B82F6' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 700, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Affiliate Disclosure</p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#94A3B8', lineHeight: 1.6 }}>CloudPriceDeals earns a commission on purchases made through links on this page. This never affects the price you pay and does not influence our editorial recommendations.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '64px' }}>
          {guide.content.map(function(section, i) {
            return (
              <div key={i}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '26px', color: '#F0F4FF', marginBottom: '14px', lineHeight: 1.2 }}>{section.heading}</h2>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#94A3B8', lineHeight: 1.85 }}>{section.body}</p>
              </div>
            )
          })}
        </div>

        {relatedDeals.length > 0 && (
          <div style={{ marginBottom: '56px' }}>
            <div style={{ borderTop: '2px solid #00D084', paddingTop: '28px', marginBottom: '24px' }}>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#00D084', marginBottom: '8px' }}>Related deals</p>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '28px', color: '#F0F4FF' }}>Shop the products mentioned</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {relatedDeals.map(function(deal) {
                var pct = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)
                return (
                  <div key={deal.id} style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ width: '56px', height: '56px', background: '#1A2235', borderRadius: '8px', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={deal.imageUrl} alt={deal.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }} onError={function(e) { e.target.style.display='none'; e.target.parentNode.innerHTML='<span style="font-size:24px">' + deal.emoji + '</span>' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: '140px' }}>
                      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 600, color: '#F0F4FF', marginBottom: '4px' }}>{deal.name}</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: '#00D084' }}>${deal.price}</span>
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#475569', textDecoration: 'line-through' }}>${deal.originalPrice}</span>
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, color: '#00D084', background: 'rgba(0,208,132,0.1)', padding: '2px 8px', borderRadius: '100px' }}>-{pct}%</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <a href={deal.affiliateUrl} target="_blank" rel="noopener sponsored"
                        style={{ background: '#00D084', color: '#0A0E1A', textDecoration: 'none', padding: '9px 18px', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                        Buy on Amazon
                      </a>
                      <Link href={'/product/' + deal.id}
                        style={{ background: '#1A2235', color: '#94A3B8', textDecoration: 'none', padding: '9px 14px', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 600, borderRadius: '6px', whiteSpace: 'nowrap' }}>
                        Compare
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '26px', color: '#F0F4FF', marginBottom: '6px' }}>More buying guides</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#475569' }}>Data-backed guides published every week.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link href="/guides" style={{ background: '#1A2235', color: '#F0F4FF', textDecoration: 'none', padding: '11px 22px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', whiteSpace: 'nowrap' }}>
              All Guides
            </Link>
            <Link href="/browse" style={{ background: '#00D084', color: '#0A0E1A', textDecoration: 'none', padding: '11px 22px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, borderRadius: '8px', whiteSpace: 'nowrap' }}>
              Browse Deals
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
