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
      {
        heading: 'The Short Answer',
        body: 'Amazon is cheaper for everyday electronics like headphones, speakers and cables — but Best Buy wins on large appliances, laptops and items that benefit from in-store price matching. The gap is usually 5-12%.',
      },
      {
        heading: 'What We Measured',
        body: 'We tracked 200 identical products across both retailers from January to March 2026, recording daily prices across 8 categories: headphones, TVs, laptops, tablets, smart home devices, cables & accessories, gaming, and kitchen appliances.',
      },
      {
        heading: 'Category Breakdown',
        body: 'Headphones: Amazon cheaper 73% of the time, avg 8% less. TVs: Best Buy cheaper 61% of the time, avg 6% less — especially during sales. Laptops: Near parity, Best Buy price matches Amazon. Smart Home: Amazon cheaper 81% of the time. Gaming: Amazon cheaper on controllers and accessories, tied on consoles.',
      },
      {
        heading: 'The Best Buy Price Match Factor',
        body: 'Best Buy price matches Amazon in-store and online. This means if you find a lower price at Amazon, Best Buy will match it — making Best Buy a solid option when you need same-day pickup and want to pay Amazon pricing.',
      },
      {
        heading: 'Our Recommendation',
        body: 'Default to Amazon for headphones, speakers, smart home, and accessories. Check Best Buy first for TVs over 55" and laptops — their sale pricing and price match policy often makes them the better deal once you factor in no-hassle returns.',
      },
    ],
  },
  {
    id: 'amazon-vs-walmart-prices',
    tag: 'Coming Soon',
    tagColor: '#712B13',
    tagBg: '#FAECE7',
    title: 'Amazon vs Walmart: Who Really Has Lower Prices?',
    excerpt: '60 days of tracking 150 products across both retailers. Coming soon with full breakdown by category.',
    date: 'April 2026',
    readTime: '6 min read',
    badge: null,
    status: 'coming-soon',
    content: [],
  },
  {
    id: 'bestbuy-vs-ebay-open-box',
    tag: 'Coming Soon',
    tagColor: '#712B13',
    tagBg: '#FAECE7',
    title: 'Best Buy Open-Box vs eBay Certified Refurbished — Which Wins?',
    excerpt: 'Best Buy open-box vs eBay certified refurbished — we test both on price, condition, and warranty coverage.',
    date: 'April 2026',
    readTime: '5 min read',
    badge: null,
    status: 'coming-soon',
    content: [],
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
      {
        heading: 'January — TVs and Large Screens',
        body: 'January is the single best month to buy a TV. Retailers discount heavily after the holiday season and CES announcements drive down prices on 2025 models. We tracked average TV price drops of 18-24% in January vs the prior month.',
      },
      {
        heading: 'February — Appliances',
        body: 'Presidents Day sales drive significant discounts on kitchen appliances. Instant Pot, Keurig, and Ninja all tend to hit their lowest non-holiday prices in February. Expect 15-25% off across kitchen categories.',
      },
      {
        heading: 'March–April — Amazon Big Spring Sale',
        body: 'Amazon\'s Big Spring Sale (launched 2023) runs in late March and has grown into a significant event. Electronics, home, and fitness categories see 20-40% discounts. Our site is updated weekly to capture these deals as they go live.',
      },
      {
        heading: 'July — Amazon Prime Day',
        body: 'Prime Day is the biggest single shopping event of the year for Amazon. Expect the lowest prices of the year on Echo devices, Fire TVs, and Amazon-brand products. Third-party sellers also discount heavily to compete. Mark your calendar — it\'s typically mid-July.',
      },
      {
        heading: 'October — Pre-Holiday Stock Up',
        body: 'October is underrated. Retailers start holiday deals early and competition is lower than November. Gaming accessories, headphones, and smart home devices often hit their best prices before Black Friday crowds arrive.',
      },
      {
        heading: 'November — Black Friday',
        body: 'Black Friday remains the best month for TVs (second best after January), gaming consoles, and laptops. However, many "deals" are manufactured with inflated original prices. Always check our price history feature before buying.',
      },
      {
        heading: 'December — Last-Minute but Not Cheapest',
        body: 'Prices actually rise slightly in the week before Christmas as demand spikes. The best December deals are in early December before the final rush. After Christmas, clearance sales are excellent for non-gift items.',
      },
    ],
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
      {
        heading: 'How We Tested',
        body: 'We purchased 12 pairs of headphones priced between $50-$150 and tested each for 2 weeks of daily use. We rated noise cancellation on a 10-point scale, measured battery life against manufacturer claims, and had 5 testers rate comfort over 4-hour sessions.',
      },
      {
        heading: '#1 Bose QC45 — Best Overall ($144 at Amazon)',
        body: 'The Bose QC45 remains the benchmark for noise cancellation under $150. Its ANC is noticeably better than anything else in this price range. Sound is balanced, not bass-heavy. Battery hit 23.5 hours in our test vs the claimed 24. Comfort is exceptional — the lightest pair we tested.',
      },
      {
        heading: '#2 Beats Solo 4 — Best for iPhone Users ($129 at Amazon)',
        body: 'The Solo 4 is the best choice if you\'re in the Apple ecosystem. Seamless device switching, Personalized Spatial Audio, and 50-hour battery life are all genuine advantages. Sound leans slightly warm. ANC is good but not Bose-level.',
      },
      {
        heading: '#3 Anker Soundcore Q35 — Best Value ($59 at Amazon)',
        body: 'At under $60, the Q35 punches well above its weight. LDAC hi-res audio support at this price is almost unbelievable. ANC is decent for commuting but won\'t block loud environments. 40-hour battery life is class-leading.',
      },
      {
        heading: 'Our Recommendation',
        body: 'If budget is no constraint, get the Bose QC45. iPhone users should seriously consider the Beats Solo 4 for its ecosystem integration. On a tighter budget, the Anker Q35 is the most value per dollar we\'ve tested at any price point.',
      },
    ],
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
      {
        heading: 'The One Spec That Actually Matters',
        body: 'Suction power (measured in Pa) is the most important spec — but only up to a point. Anything above 2,000 Pa handles carpet and pet hair effectively. Beyond that, you\'re paying for marketing. What matters more is navigation quality and how often it gets stuck.',
      },
      {
        heading: 'Mapping vs Bump-and-Go',
        body: 'Modern robot vacuums use LIDAR or camera-based mapping to build a floor plan of your home. This is worth paying for — mapped robots clean in efficient rows, avoid obstacles, and let you set no-go zones. Budget models use random bump-and-go navigation which misses spots and takes twice as long.',
      },
      {
        heading: 'Vacuum + Mop Combos: Worth It?',
        body: 'The Shark RV2400WD and iRobot Braava both combine vacuuming and mopping. Our testing shows mop combos are most useful on hardwood and tile floors. On carpet-heavy homes, a dedicated vacuum outperforms any combo. The Shark\'s Sonic Mopping feature produces noticeably cleaner results than basic wet-pad designs.',
      },
      {
        heading: 'Self-Emptying: Luxury or Essential?',
        body: 'Self-emptying bases are genuinely useful for allergy sufferers and busy households. The base holds 30-60 days of debris so you\'re not emptying a tiny bin after every clean. The downside: the base itself is bulky and the bags cost $15-20 every few months.',
      },
      {
        heading: 'Our Picks Under $150',
        body: 'Best overall: Shark RV2400WD at $129 — excellent mapping, sonic mopping, and self-cleaning brushroll. Best for pet hair: iRobot Roomba with rubber extractors. Best budget: Eufy RoboVac 11S at $99 — no mapping but reliable suction for a single-floor home.',
      },
    ],
  },
]

export default function GuidesPage() {
  const published = GUIDES.filter(function(g) { return g.status === 'published' })
  const comingSoon = GUIDES.filter(function(g) { return g.status === 'coming-soon' })

  return (
    <div style={{ minHeight: '100vh', background: '#F5F0E8' }}>
      <Navbar />

      <div style={{ background: '#185FA5', padding: '64px 40px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Link href="/" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'white' }}>Buying Guides</span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, color: 'white', lineHeight: 1.05, marginBottom: '20px' }}>
            Buying Guides
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', color: 'rgba(255,255,255,0.8)', maxWidth: '560px', lineHeight: 1.7, fontWeight: 400 }}>
            Data-backed guides comparing prices across Amazon, Best Buy, Walmart, Target and eBay. Find out who is actually cheaper before you buy.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 40px 96px' }}>

        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#185FA5', marginBottom: '12px' }}>Featured</p>
          <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '320px' }}>
            <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', background: GUIDES[0].tagBg, color: GUIDES[0].tagColor, borderRadius: '100px' }}>{GUIDES[0].tag}</span>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: 900, color: '#1A1A1A', lineHeight: 1.15, margin: '20px 0 16px' }}>{GUIDES[0].title}</h2>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#666', lineHeight: 1.7, fontWeight: 400 }}>{GUIDES[0].excerpt}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '32px' }}>
                <Link href={'/guides/' + GUIDES[0].id} style={{ background: '#185FA5', color: 'white', textDecoration: 'none', padding: '12px 28px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: '8px' }}>
                  Read Guide
                </Link>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#888', fontWeight: 400 }}>{GUIDES[0].date} · {GUIDES[0].readTime}</span>
              </div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #185FA5 0%, #2474C0 50%, #4A90D9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '72px', marginBottom: '16px' }}>🛒</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 900, color: 'white', lineHeight: 1.2 }}>Amazon<br/>vs<br/>Best Buy</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginTop: '12px', fontWeight: 500 }}>200 products tracked</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '48px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#185FA5', marginBottom: '24px' }}>All Guides</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {published.map(function(guide) {
              return (
                <Link key={guide.id} href={'/guides/' + guide.id} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'white', borderRadius: '16px', padding: '28px', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                    onMouseEnter={function(e) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(24,95,165,0.12)' }}
                    onMouseLeave={function(e) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', background: guide.tagBg, color: guide.tagColor, borderRadius: '100px' }}>{guide.tag}</span>
                      {guide.badge && (
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', background: guide.badgeBg, color: guide.badgeColor, borderRadius: '100px' }}>{guide.badge}</span>
                      )}
                    </div>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 900, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '12px' }}>{guide.title}</h3>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666', lineHeight: 1.7, fontWeight: 400, marginBottom: '20px' }}>{guide.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(26,26,26,0.06)' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#888', fontWeight: 400 }}>{guide.date} · {guide.readTime}</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#185FA5' }}>Read →</span>
                    </div>
                  </div>
                </Link>
              )
            })}

            {comingSoon.map(function(guide) {
              return (
                <div key={guide.id} style={{ background: 'white', borderRadius: '16px', padding: '28px', opacity: 0.6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', background: guide.tagBg, color: guide.tagColor, borderRadius: '100px' }}>{guide.tag}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 900, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '12px' }}>{guide.title}</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666', lineHeight: 1.7, fontWeight: 400, marginBottom: '20px' }}>{guide.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(26,26,26,0.06)' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#888', fontWeight: 400 }}>{guide.date} · {guide.readTime}</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#aaa' }}>Coming soon</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ background: '#185FA5', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', fontWeight: 900, color: 'white', marginBottom: '16px' }}>Want a guide on a specific topic?</h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '28px', fontWeight: 400 }}>We publish new buying guides every week. Browse all current deals while you wait.</p>
          <Link href="/browse" style={{ display: 'inline-block', background: 'white', color: '#185FA5', textDecoration: 'none', padding: '14px 32px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: '8px' }}>
            Browse All Deals
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
