import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EmailCapture from '@/components/EmailCapture'

export const metadata = {
  title: 'About — CloudPriceDeals',
  description: 'How CloudPriceDeals works and how we find the best deals across all major retailers.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">

        <h1 className="font-display font-bold text-4xl text-ink mb-2">About CloudPriceDeals</h1>
        <p className="text-gray-400 text-sm mb-10">Built by Cloud Design Studio LLC — West Orange, NJ</p>

        <div className="prose-sm space-y-8">
          <section>
            <h2 className="font-display font-bold text-xl text-ink mb-3">What we do</h2>
            <p className="text-gray-500 leading-relaxed">
              CloudPriceDeals finds the best deals on products priced $50–$150 across Amazon, Best Buy, Walmart, Target, and eBay. Every week, our team curates a fresh batch of deals and compares prices so you never have to wonder if you're getting the best price.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-ink mb-3">How it works</h2>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Weekly curation', desc: 'Every week we pull fresh deals from all five major retailers using their official product APIs.' },
                { step: '02', title: 'Price comparison', desc: 'We check every product across every store and surface the best price right on the product page.' },
                { step: '03', title: 'No subscription needed', desc: 'Everything is free. We earn a small affiliate commission when you click through and buy — at no extra cost to you.' },
                { step: '04', title: 'Wishlists for every occasion', desc: 'Save deals to occasion-based lists — birthday, baby shower, Christmas, wedding — and share with friends and family.' },
              ].map(item => (
                <div key={item.step} className="flex gap-4">
                  <div className="font-display font-bold text-2xl text-gray-100 w-10 shrink-0">{item.step}</div>
                  <div>
                    <p className="font-semibold text-sm text-ink mb-0.5">{item.title}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-ink mb-3">Affiliate disclosure</h2>
            <p className="text-gray-500 leading-relaxed text-sm">
              CloudPriceDeals is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. We also participate in affiliate programs with Best Buy, Walmart, Target, and eBay. Commissions are earned on qualifying purchases at no additional cost to you. Our editorial recommendations are never influenced by affiliate relationships.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-ink mb-3">The app is coming</h2>
            <p className="text-gray-500 leading-relaxed text-sm mb-4">
              We're building an iOS and Android app with push notifications for price drops, app-exclusive deals, and a smarter wishlist experience. Join the waitlist and be first in line.
            </p>
            <EmailCapture variant="banner" />
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
