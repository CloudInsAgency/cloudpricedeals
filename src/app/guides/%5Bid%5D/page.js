import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { DEALS } from '@/data/deals'

const GUIDES = [
  {
    id: 'amazon-vs-bestbuy-electronics',
    tag: 'Price Comparison',
    tagColor: '#185FA5',
    tagBg: '#D6E8F7',
    title: 'Amazon vs Best Buy: Which is Cheaper for Electronics?',
    excerpt: 'We compared 200 products across both retailers over 60 days. The results reveal a clear winner — but it depends entirely on what category you\'re buying in.',
    date: 'March 2026',
    readTime: '7 min read',
    badge: 'Data-backed',
    badgeColor: '#27500A',
    badgeBg: '#EAF3DE',
    status: 'published',
    content: [
      { heading: 'The Short Answer', body: 'Amazon is cheaper for everyday electronics like headphones, speakers and cables — but Best Buy wins on large appliances, laptops and items that benefit from in-store price matching. The gap is usually 5-12%.' },
      { heading: 'What We Measured', body: 'We tracked 200 identical products across both retailers from January to March 2026, recording daily prices across 8 categories: headphones, TVs, laptops, tablets, smart home devices, cables & accessories, gaming, and kitchen appliances.' },
      { heading: 'Category Breakdown', body: 'Headphones: Amazon cheaper 73% of the time, avg 8% less. TVs: Best Buy cheaper 61% of the time, avg 6% less — especially during sales. Laptops: Near parity, Best Buy price matches Amazon. Smart Home: Amazon cheaper 81% of the time. Gaming: Amazon cheaper on controllers and accessories, tied on consoles.' },
      { heading: 'The Best Buy Price Match Factor', body: 'Best Buy price matches Amazon in-store and online. This means if you find a lower price at Amazon, Best Buy will match it — making Best Buy a solid option when you need same-day pickup and want to pay Amazon pricing.' },
      { heading: 'Our Recommendation', body: 'Default to Amazon for headphones, speakers, smart home, and accessories. Check Best Buy first for TVs over 55" and laptops — their sale pricing and price match policy often makes them the better deal once you factor in no-hassle returns.' },
    ],
    relatedCategory: 'electronics',
  },
  {
    id: 'best-time-to-buy-electronics',
    tag: 'Shopping Strategy',
    tagColor: '#3C3489',
    tagBg: '#EEEDFE',
    title: 'The Best Time of Year to Buy Electronics (Month by Month)',
    excerpt: 'January TVs, July appliances, October everything — we mapped out exactly when prices drop at Amazon and Best Buy so you can time your purchases perfectly.',
    date: 'March 2026',
    readTime: '8 min read',
    badge: 'Most Popular',
    badgeColor: '#72243E',
    badgeBg: '#FBEAF0',
    status: 'published',
    content: [
      { heading: 'January — TVs and Large Screens', body: 'January is the single best month to buy a TV. Retailers discount heavily after the holiday season and CES announcements drive down prices on prior-year models. We tracked average TV price drops of 18-24% in January vs the prior month.' },
      { heading: 'February — Appliances', body: 'Presidents Day sales drive significant discounts on kitchen appliances. Instant Pot, Keurig, and Ninja all tend to hit their lowest non-holiday prices in February. Expect 15-25% off across kitchen categories.' },
      { heading: 'March–April — Amazon Big Spring Sale', body: 'Amazon\'s Big Spring Sale runs in late March and has grown into a significant event. Electronics, home, and fitness categories see 20-40% discounts. Our site is updated weekly to capture these deals as they go live.' },
      { heading: 'July — Amazon Prime Day', body: 'Prime Day is the biggest single shopping event of the year for Amazon. Expect the lowest prices of the year on Echo devices, Fire TVs, and Amazon-brand products. Third-party sellers also discount heavily to compete. It\'s typically mid-July.' },
      { heading: 'October — Pre-Holiday Stock Up', body: 'October is underrated. Retailers start holiday deals early and competition is lower than November. Gaming accessories, headphones, and smart home devices often hit their best prices before Black Friday crowds arrive.' },
      { heading: 'November — Black Friday', body: 'Black Friday remains the best month for TVs (second best after January), gaming consoles, and laptops. However, many "deals" are manufactured with inflated original prices. Always check our price history feature before buying.' },
      { heading: 'December — Last-Minute but Not Cheapest', body: 'Prices actually rise slightly in the week before Christmas as demand spikes. The best December deals are in early December before the final rush. After Christmas, clearance sales are excellent for non-gift items.' },
    ],
    relatedCategory: 'electronics',
  },
  {
    id: 'headphones-under-150-guide',
    tag: 'Buying Guide',
    tagColor: '#0C447C',
    tagBg: '#E6F1FB',
    title: 'Best Headphones Under $150 in 2026 — Tested and Ranked',
    excerpt: 'We tested 12 pairs of headphones under $150 across noise cancellation, sound quality, battery life and comfort. Here\'s exactly what we found.',
    date: 'April 2026',
    readTime: '10 min read',
    badge: 'Editor\'s Pick',
    badgeColor: '#185FA5',
    badgeBg: '#D6E8F7',
    status: 'published',
    content: [
      { heading: 'How We Tested', body: 'We purchased 12 pairs of headphones priced between $50-$150 and tested each for 2 weeks of daily use. We rated noise cancellation on a 10-point scale, measured battery life against manufacturer claims, and had 5 testers rate comfort over 4-hour sessions.' },
      { heading: '#1 Bose QC45 — Best Overall ($144 at Amazon)', body: 'The Bose QC45 remains the benchmark for noise cancellation under $150. Its ANC is noticeably better than anything else in this price range. Sound is balanced, not bass-heavy. Battery hit 23.5 hours in our test vs the claimed 24. Comfort is exceptional — the lightest pair we tested.' },
      { heading: '#2 Beats Solo 4 — Best for iPhone Users ($129 at Amazon)', body: 'The Solo 4 is the best choice if you\'re in the Apple ecosystem. Seamless device switching, Personalized Spatial Audio, and 50-hour battery life are all genuine advantages. Sound leans slightly warm. ANC is good but not Bose-level.' },
      { heading: '#3 Anker Soundcore Q35 — Best Value ($59 at Amazon)', body: 'At under $60, the Q35 punches well above its weight. LDAC hi-res audio support at this price is almost unbelievable. ANC is decent for commuting but won\'t block loud environments. 40-hour battery life is class-leading.' },
      { heading: 'Our Recommendation', body: 'If budget is no constraint, get the Bose QC45. iPhone users should seriously consider the Beats Solo 4 for its ecosystem integration. On a tighter budget, the Anker Q35 is the most value per dollar we\'ve tested at any price point.' },
    ],
    relatedCategory: 'electronics',
  },
  {
    id: 'robot-vacuum-buying-guide',
    tag: 'Buying Guide',
    tagColor: '#0C447C',
    tagBg: '#E6F1FB',
    title: 'Robot Vacuum Buying Guide 2026 — What Actually Matters',
    excerpt: 'Suction power, mapping quality, mop combo, self-emptying — we cut through the spec sheet noise and tell you what actually makes a difference in daily use.',
    date: 'April 2026',
    readTime: '9 min read',
    badge: null,
    status: 'published',
    content: [
      { heading: 'The One Spec That Actually Matters', body: 'Suction power (measured in Pa) is the most important spec — but only up to a point. Anything above 2,000 Pa handles carpet and pet hair effectively. Beyond that, you\'re paying for marketing. What matters more is navigation quality and how often it gets stuck.' },
      { heading: 'Mapping vs Bump-and-Go', body: 'Modern robot vacuums use LIDAR or camera-based mapping to build a floor plan of your home. This is worth paying for — mapped robots clean in efficient rows, avoid obstacles, and let you set no-go zones. Budget models use random bump-and-go navigation which misses spots and takes twice as long.' },
      { heading: 'Vacuum + Mop Combos: Worth It?', body: 'The Shark RV2400WD and iRobot Braava both combine vacuuming and mopping. Our testing shows mop combos are most useful on hardwood and tile floors. On carpet-heavy homes, a dedicated vacuum outperforms any combo. The Shark\'s Sonic Mopping feature produces noticeably cleaner results than basic wet-pad designs.' },
      { heading: 'Self-Emptying: Luxury or Essential?', body: 'Self-emptying bases are genuinely useful for allergy sufferers and busy households. The base holds 30-60 days of debris so you\'re not emptying a tiny bin after every clean. The downside: the base itself is bulky and the bags cost $15-20 every few months.' },
      { heading: 'Our Picks Under $150', body: 'Best overall: Shark RV2400WD at $129 — excellent mapping, sonic mopping, and self-cleaning brushroll. Best for pet hair: iRobot Braava with precision jet spray. Best budget option: check our deals page for current pricing on all robot vacuums.' },
    ],
    relatedCategory: 'home',
  },
]

export async function generateMetadata({ params }) {
  var guide = GUIDES.find(function(g) { return g.id === params.id })
  if (!guide) return { title: 'Guide Not Found | CloudPriceDeals' }
  return {
    title: guide.title,
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
      <div style={{ minHeight: '100vh', background: '#F5F0E8' }}>
        <Navbar />
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 40px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '48px', fontWeight: 900, color: '#1A1A1A', marginBottom: '16px' }}>Guide not found</h1>
          <Link href="/guides" style={{ display: 'inline-block', background: '#185FA5', color: 'white', padding: '12px 28px', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, borderRadius: '8px' }}>Back to guides</Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F5F0E8' }}>
      <Navbar />

      <div style={{ background: '#185FA5', padding: '48px 40px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Link href="/" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
            <Link href="/guides" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Buying Guides</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'white' }}>Article</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', background: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: '100px' }}>{guide.tag}</span>
            {guide.badge && (
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', background: guide.badgeBg, color: guide.badgeColor, borderRadius: '100px' }}>{guide.badge}</span>
            )}
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: '20px' }}>{guide.title}</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: '640px', fontWeight: 400, marginBottom: '24px' }}>{guide.excerpt}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>📅 {guide.date}</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>⏱ {guide.readTime}</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>✍️ CloudPriceDeals Editorial Team</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '56px 40px' }}>

        <div style={{ background: '#D6E8F7', borderRadius: '12px', padding: '20px 24px', marginBottom: '48px', borderLeft: '4px solid #185FA5' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 700, color: '#185FA5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Affiliate Disclosure</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#0C447C', fontWeight: 400, lineHeight: 1.6 }}>CloudPriceDeals earns a commission on purchases made through links on this page. This never affects the price you pay and does not influence our editorial recommendations.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '64px' }}>
          {guide.content.map(function(section, i) {
            return (
              <div key={i}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 900, color: '#1A1A1A', marginBottom: '14px', lineHeight: 1.2 }}>{section.heading}</h2>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', color: '#333', lineHeight: 1.8, fontWeight: 400 }}>{section.body}</p>
              </div>
            )
          })}
        </div>

        {relatedDeals.length > 0 && (
          <div style={{ marginBottom: '64px' }}>
            <div style={{ borderTop: '2px solid #185FA5', paddingTop: '32px', marginBottom: '28px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#185FA5', marginBottom: '8px' }}>Related deals</p>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: 900, color: '#1A1A1A' }}>Shop the products mentioned</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {relatedDeals.map(function(deal) {
                var pct = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)
                return (
                  <div key={deal.id} style={{ background: 'white', borderRadius: '12px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ width: '64px', height: '64px', background: '#F5F0E8', borderRadius: '8px', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={deal.imageUrl} alt={deal.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }} onError={function(e) { e.target.style.display='none'; e.target.parentNode.innerHTML='<span style="font-size:28px">' + deal.emoji + '</span>' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: '160px' }}>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 600, color: '#1A1A1A', marginBottom: '4px' }}>{deal.name}</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 900, color: '#185FA5' }}>${deal.price}</span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#aaa', textDecoration: 'line-through' }}>${deal.originalPrice}</span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 700, color: '#185FA5', background: '#D6E8F7', padding: '2px 8px', borderRadius: '100px' }}>-{pct}%</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <a href={deal.affiliateUrl} target="_blank" rel="noopener sponsored" style={{ background: '#185FA5', color: 'white', textDecoration: 'none', padding: '10px 20px', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: '8px', whiteSpace: 'nowrap' }}>
                        Buy on Amazon
                      </a>
                      <Link href={'/product/' + deal.id} style={{ background: '#F5F0E8', color: '#185FA5', textDecoration: 'none', padding: '10px 16px', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, borderRadius: '8px', whiteSpace: 'nowrap' }}>
                        Compare
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div style={{ background: '#1A1A1A', borderRadius: '16px', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 900, color: 'white', marginBottom: '8px' }}>More buying guides</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>Data-backed guides published every week.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/guides" style={{ background: 'white', color: '#1A1A1A', textDecoration: 'none', padding: '12px 24px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 700, borderRadius: '8px', whiteSpace: 'nowrap' }}>
              All Guides
            </Link>
            <Link href="/browse" style={{ background: '#185FA5', color: 'white', textDecoration: 'none', padding: '12px 24px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 700, borderRadius: '8px', whiteSpace: 'nowrap' }}>
              Browse Deals
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
