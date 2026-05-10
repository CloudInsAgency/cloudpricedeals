import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy — CloudPriceDeals',
  description: 'CloudPriceDeals privacy policy. Learn how we collect, use, and protect your data when you use our deal comparison and price tracking service.',
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
            <h2 className="font-display font-bold text-lg text-ink mb-2">Overview</h2>
            <p>CloudPriceDeals (operated by Cloud Design Studio LLC, West Orange, NJ) is committed to protecting your privacy. This policy explains what information we collect, how we use it, and the choices you have. We designed our service to collect as little personal data as possible — most features work without any account or login at all.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">Information we collect</h2>
            <p>We collect your email address only when you voluntarily provide it — for example, when you join our waitlist, sign up for deal alerts, or submit our email capture form. We do not require an account to browse deals, save items, or use wishlists. We do not sell, rent, or share your email with third parties. We may use it to send you deal updates, weekly roundups, and app launch notifications. Every email includes an unsubscribe link, and you can opt out at any time.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">Wishlist and local storage</h2>
            <p>Your wishlists and saved deals are stored locally in your browser using localStorage. This means your saved items live on your device — not on our servers. We never upload, sync, or back up your wishlist contents unless you explicitly choose to share a list, in which case a read-only snapshot is generated for the recipient. Clearing your browser data will permanently delete your saved items, so consider exporting or sharing important lists if you switch devices.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">Cookies and tracking</h2>
            <p>We use a small number of essential cookies to remember your theme preference (light or dark mode) and to keep our site functioning correctly. We use Meta Pixel on product pages to measure ad performance and improve our marketing — this may set cookies that allow Meta to recognize repeat visitors across sites. You can disable cookies in your browser settings; some site features may work less smoothly if you do.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">Affiliate links and third parties</h2>
            <p>CloudPriceDeals participates in the Amazon Services LLC Associates Program and similar affiliate programs with Best Buy, Walmart, Target, and eBay. When you click a product link on our site, you are redirected to the retailer with an affiliate tracking tag attached to the URL. The retailer may set their own cookies to attribute the purchase to us for commission purposes. We do not receive your name, address, payment information, or any personal details about your purchase from those retailers — only aggregate commission reports.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">Analytics</h2>
            <p>We use privacy-respecting analytics to understand which deals are most popular and how visitors find our site. We do not collect personally identifiable information through analytics, and we do not build advertising profiles based on your browsing history. Data is aggregated and used solely to improve the deals we surface and the editorial decisions we make each week.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">Data retention</h2>
            <p>We retain email addresses on our mailing list until you unsubscribe or request deletion. Server logs (which contain IP addresses and request metadata for security and debugging) are kept for no more than 30 days. We do not retain copies of your wishlist data on our servers because it is stored only in your browser.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">Your rights</h2>
            <p>If you live in California (CCPA), the European Economic Area (GDPR), the United Kingdom, or another jurisdiction with data protection laws, you have the right to access, correct, or delete the personal information we hold about you, and the right to opt out of any sale of personal data (we do not sell personal data). To exercise any of these rights, email us at the address below and we will respond within the timeframe required by your local law.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">Children</h2>
            <p>Our service is not directed to children under 13, and we do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us so we can delete it.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">Changes to this policy</h2>
            <p>We may update this policy from time to time. When we do, we will revise the "Last updated" date above. Material changes will be communicated through a banner on the site or an email to subscribers, depending on the nature of the change.</p>
          </section>
          <section>
            <h2 className="font-display font-bold text-lg text-ink mb-2">Contact</h2>
            <p>Questions about this policy or our data practices? Email us at privacy@cloudpricedeals.com or write to Cloud Design Studio LLC, West Orange, NJ. We aim to respond to every privacy inquiry within five business days.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
