import { DEALS, RETAILERS, CATEGORIES } from '@/data/deals'
import ProductClient from './product-client'

const SITE = 'https://cloudpricedeals.com'

export function generateStaticParams() {
  return DEALS.map(function(d) { return { id: d.id } })
}

export async function generateMetadata({ params }) {
  const deal = DEALS.find(function(d) { return d.id === params.id })
  if (!deal) {
    return {
      title: 'Deal not found',
      alternates: { canonical: '/product/' + params.id },
    }
  }
  const title = deal.shortName + ' — $' + deal.price + ' (was $' + deal.originalPrice + ')'
  const description = deal.description + ' Compare prices across Amazon, Best Buy, Walmart, Target and eBay.'
  const url = '/product/' + deal.id
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url: 'https://cloudpricedeals.com' + url,
      images: deal.imageUrl && deal.imageUrl.startsWith('http') ? [{ url: deal.imageUrl }] : undefined,
    },
  }
}

function buildSchemas(deal) {
  const url = SITE + '/product/' + deal.id
  const image = deal.imageUrl
    ? (deal.imageUrl.startsWith('http') ? deal.imageUrl : SITE + deal.imageUrl)
    : SITE + '/og-image.png'

  // Brand: best-effort — use first word of name as brand if no field exists.
  const brand = deal.brand || (deal.name ? deal.name.split(' ')[0] : 'CloudPriceDeals')

  // Offers — one per comparePrices entry.
  const sources = (deal.comparePrices && deal.comparePrices.length > 0)
    ? deal.comparePrices
    : [{ retailer: deal.retailer, price: deal.price, url: deal.affiliateUrl, shipping: deal.shipping }]

  const offers = sources.map(function(cp) {
    const r = RETAILERS[cp.retailer] || { label: cp.retailer }
    return {
      '@type': 'Offer',
      price: Number(cp.price).toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: cp.url,
      seller: { '@type': 'Organization', name: r.label || cp.retailer },
    }
  })

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: deal.name,
    image: [image],
    description: deal.description,
    brand: { '@type': 'Brand', name: brand },
    sku: deal.id,
    aggregateRating: (deal.rating && deal.reviews) ? {
      '@type': 'AggregateRating',
      ratingValue: String(deal.rating),
      reviewCount: String(deal.reviews),
      bestRating: '5',
      worstRating: '1',
    } : undefined,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: Math.min.apply(null, sources.map(function(s) { return Number(s.price) })).toFixed(2),
      highPrice: Math.max.apply(null, sources.map(function(s) { return Number(s.price) })).toFixed(2),
      offerCount: sources.length,
      offers: offers,
    },
  }

  // Strip undefined keys so JSON.stringify produces clean output.
  Object.keys(productSchema).forEach(function(k) {
    if (productSchema[k] === undefined) delete productSchema[k]
  })

  const cat = CATEGORIES.find(function(c) { return c.id === deal.category })
  const catLabel = cat ? cat.label : (deal.category || 'Deals')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Deals',  item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: catLabel, item: SITE + '/browse?cat=' + deal.category },
      { '@type': 'ListItem', position: 3, name: deal.shortName || deal.name, item: url },
    ],
  }

  return [productSchema, breadcrumbSchema]
}

export default function ProductPage({ params }) {
  const deal = DEALS.find(function(d) { return d.id === params.id })
  const schemas = deal ? buildSchemas(deal) : []
  return (
    <>
      {schemas.map(function(schema, i) {
        return (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )
      })}
      <ProductClient id={params.id} />
    </>
  )
}
