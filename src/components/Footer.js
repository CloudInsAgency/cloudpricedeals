import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0D1B2A', color: 'white', paddingTop: '64px', paddingBottom: '40px', marginTop: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '48px', marginBottom: '64px' }}>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, marginBottom: '12px' }}>
              Cloud<span style={{ color: '#85B7EB' }}>Price</span>Deals
            </div>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: '#7B93A8', lineHeight: '1.7', fontWeight: 300 }}>
              Best deals across all major retailers — updated every week. No subscription.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2B7CD3', marginBottom: '16px' }}>Browse</p>
            {['Electronics','Kitchen','Fitness','Home','Gaming','Style'].map(c => (
              <Link key={c} href={`/browse?category=${c.toLowerCase()}`} style={{ display: 'block', fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: '#7B93A8', textDecoration: 'none', marginBottom: '10px', fontWeight: 300 }}>{c}</Link>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2B7CD3', marginBottom: '16px' }}>Retailers</p>
            {['Amazon','Best Buy','Walmart','Target','eBay'].map(r => (
              <Link key={r} href={`/browse?retailer=${r.toLowerCase().replace(' ','')}`} style={{ display: 'block', fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: '#7B93A8', textDecoration: 'none', marginBottom: '10px', fontWeight: 300 }}>{r}</Link>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2B7CD3', marginBottom: '16px' }}>Company</p>
            {[{l:'About',h:'/about'},{l:'Wishlists',h:'/wishlist'},{l:'Privacy',h:'/privacy'}].map(item => (
              <Link key={item.l} href={item.h} style={{ display: 'block', fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: '#7B93A8', textDecoration: 'none', marginBottom: '10px', fontWeight: 300 }}>{item.l}</Link>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '28px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', color: '#3D5166', fontWeight: 300 }}>© 2026 Cloud Design Studio LLC · West Orange, NJ</p>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '11px', color: '#3D5166', fontWeight: 300, lineHeight: '1.6' }}>
            CloudPriceDeals participates in Amazon Associates and other affiliate programs. We earn commissions on qualifying purchases at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  )
}
