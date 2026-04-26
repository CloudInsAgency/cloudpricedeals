import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy — CloudPriceDeals',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="font-display font-bold text-4xl text-ink mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: March 2026</p>
        <div className="space-y-8 text-sm text-gray-500 leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">Information we collect</h2>
            <p>We collect your email address when you join our waitlist or sign up for deal alerts. We do not sell or share your email with third parties. We may use it to send you deal updates and app launch notifications — you can unsubscribe at any time.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">Wishlist data</h2>
            <p>Wishlists are stored locally in your browser. We do not store your wishlist contents on our servers unless you explicitly share a list, at which point a read-only version is generated for sharing purposes.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">Affiliate links</h2>
            <p>When you click a product link, you are redirected to the retailer's website with an affiliate tracking tag. The retailer may use cookies to track your purchase for commission purposes. We do not receive any personal information about your purchase from retailers.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">Analytics</h2>
            <p>We use privacy-respecting analytics to understand which deals are most popular. No personally identifiable information is collected through analytics.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">Contact</h2>
            <p>Questions about this policy? Email us at privacy@cloudpricedeals.com or write to Cloud Design Studio LLC, West Orange, NJ.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
