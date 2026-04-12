import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EmailCapture from '@/components/EmailCapture'

export const metadata = {
  title: 'About — CloudPriceDeals',
  description: 'How CloudPriceDeals works and how we find the best deals across all major retailers.',
}

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0E1A' }}>
      <Navbar />

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '72px 24px 96px' }}>

        {/* Header */}
        <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(36px, 5vw, 56px)', color: '#F0F4FF', lineHeight: 1.1, marginBottom: '12px' }}>
          About CloudPriceDeals
        </h1>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#64748B', marginBottom: '64px' }}>
          Built by Cloud Design Studio LLC — West Orange, NJ
        </p>

        {/* What we do */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '26px', color: '#10B981', marginBottom: '14px' }}>
            What we do
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#CBD5E1', lineHeight: 1.8 }}>
            CloudPriceDeals finds the best deals on products priced $50–$150 across Amazon, Best Buy, Walmart, Target, and eBay. Every week, our team curates a fresh batch of deals and compares prices so you never have to wonder if you're getting the best price.
          </p>
        </section>

        {/* How it works */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '26px', color: '#10B981', marginBottom: '28px' }}>
            How it works
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {[
              { step: '01', title: 'Weekly curation', desc: 'Every week we pull fresh deals from all five major retailers using their official product APIs.' },
              { step: '02', title: 'Price comparison', desc: 'We check every product across every store and surface the best price right on the product page.' },
              { step: '03', title: 'No subscription needed', desc: 'Everything is free. We earn a small affiliate commission when you click through and buy — at no extra cost to you.' },
              { step: '04', title: 'Wishlists for every occasion', desc: 'Save deals to occasion-based lists — birthday, baby shower, Christmas, wedding — and share with friends and family.' },
            ].map(function(item) {
              return (
                <div key={item.step} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '28px', color: '#F0F4FF', width: '44px', flexShrink: 0, lineHeight: 1 }}>
                    {item.step}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 700, color: '#10B981', marginBottom: '6px' }}>
                      {item.title}
                    </p>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#CBD5E1', lineHeight: 1.75 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: '56px' }} />

        {/* Affiliate disclosure */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '26px', color: '#10B981', marginBottom: '14px' }}>
            Affiliate disclosure
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#CBD5E1', lineHeight: 1.8 }}>
            CloudPriceDeals is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. We also participate in affiliate programs with Best Buy, Walmart, Target, and eBay. Commissions are earned on qualifying purchases at no additional cost to you. Our editorial recommendations are never influenced by affiliate relationships.
          </p>
        </section>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: '56px' }} />

        {/* App coming */}
        <section>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '26px', color: '#10B981', marginBottom: '14px' }}>
            The app is coming
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#CBD5E1', lineHeight: 1.8, marginBottom: '32px' }}>
            We're building an iOS and Android app with push notifications for price drops, app-exclusive deals, and a smarter wishlist experience. Join the waitlist and be first in line.
          </p>
          <EmailCapture variant="banner" />
        </section>

      </div>

      <Footer />
    </div>
  )
}
