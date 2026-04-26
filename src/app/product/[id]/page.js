import { DEALS } from '@/data/deals'
import ProductClient from './product-client'

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

export default function ProductPage({ params }) {
  return <ProductClient id={params.id} />
}
