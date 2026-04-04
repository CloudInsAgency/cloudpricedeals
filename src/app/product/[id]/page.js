'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink, Heart, ArrowLeft, TrendingDown, Star, Truck } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RetailerBadge from '@/components/RetailerBadge'
import EmailCapture from '@/components/EmailCapture'
import DealCard from '@/components/DealCard'
import { DEALS, RETAILERS } from '@/data/deals'

export default function ProductPage() {
  const params = useParams()
  const deal = DEALS.find(d => d.id === params.id)

  if (!deal) return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400">Deal not found.</p>
        <Link href="/" className="btn-primary mt-4 inline-flex">Back to deals</Link>
      </div>
      <Footer />
    </div>
  )

  const bestPrice = deal.comparePrices.reduce((min, p) => p.price < min.price ? p : min, deal.comparePrices[0])
  const related = DEALS.filter(d => d.category === deal.category && d.id !== deal.id).slice(0, 4)

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-ink transition-colors mb-6">
          <ArrowLeft size={14} /> Back to deals
        </Link>

        <div className="grid md:grid-cols-5 gap-6">

          {/* Left: product info */}
          <div className="md:col-span-3">
            <div className="card p-6 mb-4">
              <div className="h-40 bg-surface rounded-2xl flex items-center justify-center text-7xl mb-5">
                {deal.emoji}
              </div>

              <div className="flex items-start justify-between gap-3 mb-2">
                <h1 className="font-display font-bold text-xl text-ink leading-tight">{deal.name}</h1>
                <button className="shrink-0 p-2 rounded-xl border border-gray-100 hover:bg-red-50 hover:border-red-100 transition-colors" title="Save to wishlist">
                  <Heart size={16} className="text-gray-300" />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <RetailerBadge retailer={deal.retailer} />
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  {deal.rating} · {deal.reviews.toLocaleString()} reviews
                </span>
                <span className="text-xs text-gray-300">·</span>
                <span className="text-xs text-gray-400">Updated {deal.updatedAt}</span>
              </div>

              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-display font-bold text-4xl price-green">${deal.price}</span>
                <span className="text-lg text-gray-300 line-through">${deal.originalPrice}</span>
                <span className="text-sm font-semibold text-brand-400 bg-brand-50 px-2 py-0.5 rounded-full">
                  Save ${deal.savings} ({deal.savingsPct}% off)
                </span>
              </div>

              <a
                href={deal.affiliateUrl}
                target="_blank"
                rel="noopener sponsored"
                className="flex items-center justify-center gap-2 w-full bg-brand-400 text-white font-semibold py-3 rounded-xl hover:bg-brand-500 transition-colors mb-3"
              >
                Buy on {RETAILERS[deal.retailer]?.label} <ExternalLink size={15} />
              </a>

              <div className="flex items-center gap-2 text-xs text-gray-400 justify-center mb-5">
                <Truck size={12} /> {deal.shipping}
              </div>

              <div className="border-t border-gray-50 pt-4">
                <p className="section-label">About this deal</p>
                <p className="text-sm text-gray-500 leading-relaxed">{deal.description}</p>
              </div>
            </div>

            {/* Price history */}
            <div className="card p-5 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown size={15} className="text-brand-400" />
                <p className="font-semibold text-sm text-ink">Price history</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-surface rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">All-time low</p>
                  <p className="font-semibold text-sm price-green">${deal.priceHistory.allTimeLow}</p>
                </div>
                <div className="bg-surface rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">30-day avg</p>
                  <p className="font-semibold text-sm text-ink">${deal.priceHistory.thirtyDayAvg}</p>
                </div>
                <div className="bg-surface rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">vs avg</p>
                  <p className="font-semibold text-sm price-green">{deal.priceHistory.vsAvgPct}%</p>
                </div>
              </div>
            </div>

            <EmailCapture variant="inline" />
          </div>

          {/* Right: price comparison */}
          <div className="md:col-span-2">
            <div className="card p-5 sticky top-20">
              <p className="section-label">Compare prices</p>
              <p className="text-xs text-gray-400 mb-4">Updated weekly · Tap to buy</p>

              <div className="flex flex-col gap-2">
                {deal.comparePrices
                  .sort((a, b) => a.price - b.price)
                  .map((cp, i) => {
                    const r = RETAILERS[cp.retailer]
                    const isBest = cp.retailer === bestPrice.retailer
                    const diff = cp.price - bestPrice.price
                    return (
                      <a
                        key={cp.retailer}
                        href={cp.url}
                        target="_blank"
                        rel="noopener sponsored"
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all hover:shadow-sm ${
                          isBest ? 'border-brand-200 bg-brand-50' : 'border-gray-100 bg-white hover:border-gray-200'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          i === 0 ? 'bg-brand-400 text-white' :
                          i === 1 ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-semibold" style={{ color: r?.text, background: r?.bg, padding: '2px 7px', borderRadius: '4px' }}>
                            {r?.label}
                          </span>
                          <p className="text-xs text-gray-400 mt-0.5 truncate">{cp.shipping}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className={`font-semibold text-sm ${isBest ? 'price-green' : 'text-ink'}`}>${cp.price}</p>
                          {!isBest && <p className="text-xs text-gray-400">+${diff}</p>}
                          {isBest && <p className="text-xs font-medium text-brand-400">Best price</p>}
                        </div>
                        <ExternalLink size={12} className="text-gray-300 shrink-0" />
                      </a>
                    )
                  })
                }
              </div>

              <p className="text-xs text-gray-300 mt-4 text-center leading-relaxed">
                CloudPriceDeals earns a commission on purchases. This never affects the price you pay.
              </p>
            </div>
          </div>
        </div>

        {/* Related deals */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display font-bold text-xl text-ink mb-4">More {deal.category} deals</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {related.map((d, i) => <DealCard key={d.id} deal={d} view="grid" delay={i} />)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
