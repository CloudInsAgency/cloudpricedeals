'use client'
import { useState } from 'react'
import { LayoutGrid, List } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DealCard from '@/components/DealCard'
import EmailCapture from '@/components/EmailCapture'
import { DEALS, CATEGORIES } from '@/data/deals'

function CloudHeroAnimation() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="cloud-drift-2" style={{ position: 'absolute', top: '20px', left: '5%', opacity: 0.35 }}>
        <svg width="180" height="80" viewBox="0 0 180 80" fill="none">
          <ellipse cx="90" cy="55" rx="85" ry="25" fill="#185FA5"/>
          <ellipse cx="60" cy="45" rx="45" ry="30" fill="#185FA5"/>
          <ellipse cx="115" cy="42" rx="40" ry="28" fill="#185FA5"/>
          <ellipse cx="85" cy="35" rx="35" ry="26" fill="#185FA5"/>
        </svg>
      </div>
      <div className="cloud-drift-1" style={{ position: 'absolute', top: '10px', right: '5%', opacity: 0.25 }}>
        <svg width="140" height="65" viewBox="0 0 140 65" fill="none">
          <ellipse cx="70" cy="45" rx="65" ry="20" fill="#2474C0"/>
          <ellipse cx="45" cy="35" rx="38" ry="26" fill="#2474C0"/>
          <ellipse cx="90" cy="32" rx="34" ry="24" fill="#2474C0"/>
          <ellipse cx="68" cy="25" rx="30" ry="22" fill="#2474C0"/>
        </svg>
      </div>
      <div className="cloud-float" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="product-float" style={{ position: 'relative', zIndex: 10, marginBottom: '-30px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '18px 24px', boxShadow: '0 20px 60px rgba(24,95,165,0.18)', display: 'flex', alignItems: 'center', gap: '16px', minWidth: '280px' }}>
            <div style={{ fontSize: '44px', lineHeight: 1 }}>🎧</div>
            <div>
              <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#185FA5', marginBottom: '3px' }}>Best price today</div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '17px', fontWeight: 500, color: '#1A1A1A', marginBottom: '2px' }}>Bose QC45 Headphones</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', fontWeight: 400, color: '#185FA5' }}>$149</span>
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#888', textDecoration: 'line-through', fontWeight: 300 }}>$279</span>
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 600, color: '#185FA5', background: '#D6E8F7', padding: '2px 8px', borderRadius: '100px' }}>47% off</span>
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', top: '-28px', right: '-60px', background: 'white', borderRadius: '16px', padding: '12px 16px', boxShadow: '0 12px 40px rgba(24,95,165,0.12)', display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.92 }}>
            <div style={{ fontSize: '28px' }}>🤖</div>
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#1A1A1A' }}>iRobot Roomba j7+</div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: '#185FA5' }}>$149 <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', color: '#888', textDecoration: 'line-through' }}>$299</span></div>
            </div>
          </div>
          <div style={{ position: 'absolute', top: '-18px', left: '-55px', background: 'white', borderRadius: '16px', padding: '12px 16px', boxShadow: '0 12px 40px rgba(24,95,165,0.12)', display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.88 }}>
            <div style={{ fontSize: '28px' }}>📺</div>
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#1A1A1A' }}>TCL 43" 4K TV</div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: '#185FA5' }}>$134 <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', color: '#888', textDecoration: 'line-through' }}>$199</span></div>
            </div>
          </div>
        </div>
        <svg width="420" height="160" viewBox="0 0 420 160" fill="none" style={{ filter: 'drop-shadow(0 8px 32px rgba(24,95,165,0.15))' }}>
          <ellipse cx="210" cy="120" rx="200" ry="42" fill="#185FA5"/>
          <ellipse cx="140" cy="100" rx="95" ry="68" fill="#185FA5"/>
          <ellipse cx="255" cy="92" rx="90" ry="72" fill="#185FA5"/>
          <ellipse cx="195" cy="78" rx="80" ry="65" fill="#2474C0"/>
          <ellipse cx="155" cy="88" rx="70" ry="58" fill="#2474C0"/>
          <ellipse cx="240" cy="82" rx="72" ry="60" fill="#2474C0"/>
          <ellipse cx="198" cy="70" rx="60" ry="52" fill="#4A90D9"/>
        </svg>
        <div className="shimmer" style={{ position: 'absolute', top: '20px', right: '80px', fontSize: '18px', color: '#185FA5' }}>+</div>
        <div className="shimmer" style={{ position: 'absolute', top: '50px', left: '60px', fontSize: '12px', color: '#185FA5', animationDelay: '1s' }}>+</div>
      </div>
      <div className="cloud-drift-1" style={{ position: 'absolute', bottom: '30px', right: '8%', opacity: 0.2 }}>
        <svg width="100" height="50" viewBox="0 0 100 50" fill="none">
          <ellipse cx="50" cy="35" rx="46" ry="15" fill="#185FA5"/>
          <ellipse cx="32" cy="26" rx="28" ry="20" fill="#185FA5"/>
          <ellipse cx="62" cy="23" rx="26" ry="18" fill="#185FA5"/>
        </svg>
      </div>
      <div className="cloud-drift-2" style={{ position: 'absolute', bottom: '40px', left: '8%', opacity: 0.2 }}>
        <svg width="110" height="55" viewBox="0 0 110 55" fill="none">
          <ellipse cx="55" cy="38" rx="50" ry="17" fill="#185FA5"/>
          <ellipse cx="35" cy="28" rx="32" ry="22" fill="#185FA5"/>
          <ellipse cx="70" cy="25" rx="28" ry="20" fill="#185FA5"/>
        </svg>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const filtered = activeCategory === 'all' ? DEALS : DEALS.filter(function(d) { return d.category === activeCategory })
  const hotDeals = DEALS.filter(function(d) { return d.badge === 'hot' }).slice(0, 4)

  return (
    <div style={{ minHeight: '100vh', background: '#F5F0E8' }}>
      <Navbar />

      <div style={{ background: '#1A1A1A', padding: '12px 0', overflow: 'hidden' }}>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[0, 1].map(function(i) {
              return (
                <div key={i} style={{ display: 'flex' }}>
                  {DEALS.map(function(d) {
                    return (
                      <span key={d.id} style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 300, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap', padding: '0 32px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                        {d.shortName}&nbsp;
                        <span style={{ color: '#4A90D9', fontWeight: 500 }}>${d.price}</span>
                        <span style={{ color: 'rgba(255,255,255,0.2)' }}> · save {Math.round((d.originalPrice - d.price) / d.originalPrice * 100)}%</span>
                      </span>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 40px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <p className="fade-up" style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#185FA5', marginBottom: '20px' }}>
              Updated weekly · 8 new deals this week
            </p>
            <h1 className="fade-up fade-up-1" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(54px, 6vw, 88px)', color: '#1A1A1A', lineHeight: 1.0, letterSpacing: '-0.01em', marginBottom: '28px' }}>
              Curated <em style={{ fontStyle: 'italic', color: '#185FA5' }}>Deals</em><br />Reimagined
            </h1>
            <p className="fade-up fade-up-2" style={{ fontFamily: 'Jost, sans-serif', fontSize: '18px', fontWeight: 300, color: '#4A4A4A', lineHeight: '1.8', marginBottom: '36px', maxWidth: '460px' }}>
              $50-$150 deals across Amazon, Best Buy, Walmart, Target and eBay — curated weekly so you always buy at the best price.
            </p>
            <div className="fade-up fade-up-3" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/browse" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#185FA5', color: 'white', textDecoration: 'none', padding: '18px 36px', fontFamily: 'Jost, sans-serif', fontSize: '14px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Browse deals
              </Link>
              <Link href="/wishlist" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'transparent', color: '#1A1A1A', textDecoration: 'none', padding: '17px 36px', fontFamily: 'Jost, sans-serif', fontSize: '14px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid rgba(26,26,26,0.3)' }}>
                My wishlists
              </Link>
            </div>
          </div>
          <div className="fade-up fade-up-2 hero-cloud">
            <CloudHeroAnimation />
          </div>
        </div>

        <div className="fade-up fade-up-4" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', paddingTop: '40px', borderTop: '1px solid rgba(26,26,26,0.1)', marginTop: '48px' }}>
          <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginRight: '8px' }}>Comparing prices at</span>
          {[
            { name: 'Amazon',   bg: '#FFF3E0', color: '#7A4100' },
            { name: 'Best Buy', bg: '#E6F1FB', color: '#0C447C' },
            { name: 'Walmart',  bg: '#EAF3DE', color: '#27500A' },
            { name: 'Target',   bg: '#FAECE7', color: '#712B13' },
            { name: 'eBay',     bg: '#EEEDFE', color: '#26215C' },
          ].map(function(r) {
            return (
              <span key={r.name} style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '6px 16px', background: r.bg, color: r.color }}>{r.name}</span>
            )
          })}
        </div>
      </section>

      <section style={{ background: 'white', padding: '72px 40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '44px' }}>
            <div>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#185FA5', marginBottom: '10px' }}>Hot today</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '56px', fontWeight: 400, color: '#1A1A1A', letterSpacing: '-0.01em' }}>This week's best</h2>
            </div>
            <Link href="/browse" style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1A1A1A', textDecoration: 'none', borderBottom: '1px solid #1A1A1A', paddingBottom: '2px' }}>
              View all
            </Link>
          </div>
          <div className="deals-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#F5F0E8' }}>
            {hotDeals.map(function(deal, i) {
              return <DealCard key={deal.id} deal={deal} view="grid" delay={i} />
            })}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 40px 0' }}>
        <EmailCapture variant="banner" />
      </section>

      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 40px 96px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#185FA5', marginBottom: '10px' }}>All deals</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '56px', fontWeight: 400, color: '#1A1A1A', letterSpacing: '-0.01em' }}>Browse and compare</h2>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={function() { setViewMode('grid') }} style={{ padding: '10px 12px', background: viewMode === 'grid' ? '#185FA5' : 'transparent', border: '1px solid rgba(26,26,26,0.15)', cursor: 'pointer', color: viewMode === 'grid' ? 'white' : '#4A4A4A', display: 'flex', alignItems: 'center' }}>
              <LayoutGrid size={17} />
            </button>
            <button onClick={function() { setViewMode('list') }} style={{ padding: '10px 12px', background: viewMode === 'list' ? '#185FA5' : 'transparent', border: '1px solid rgba(26,26,26,0.15)', cursor: 'pointer', color: viewMode === 'list' ? 'white' : '#4A4A4A', display: 'flex', alignItems: 'center' }}>
              <List size={17} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0', overflowX: 'auto', marginBottom: '44px', borderBottom: '1px solid rgba(26,26,26,0.1)' }}>
          {CATEGORIES.map(function(cat) {
            return (
              <button key={cat.id} onClick={function() { setActiveCategory(cat.id) }} style={{
                fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 400,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '14px 22px', whiteSpace: 'nowrap', border: 'none',
                background: 'transparent', cursor: 'pointer',
                color: activeCategory === cat.id ? '#185FA5' : '#888',
                borderBottom: activeCategory === cat.id ? '2px solid #185FA5' : '2px solid transparent',
                marginBottom: '-1px', transition: 'all 0.15s',
              }}>
                {cat.label}
              </button>
            )
          })}
        </div>

        {viewMode === 'grid' ? (
          <div className="deals-grid-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: '#EDE8DF' }}>
            {filtered.map(function(deal, i) {
              return <DealCard key={deal.id} deal={deal} view="grid" delay={i} />
            })}
          </div>
        ) : (
          <div style={{ background: 'white' }}>
            {filtered.map(function(deal, i) {
              return <DealCard key={deal.id} deal={deal} view="list" delay={i} />
            })}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
