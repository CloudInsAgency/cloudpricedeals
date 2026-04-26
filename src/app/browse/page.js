import BrowseClient from './browse-client'

export const metadata = {
  title: 'Browse All Deals — CloudPriceDeals',
  description: 'Browse every deal we track. Filter by category and retailer, sort by savings, price, or rating to find the best price across Amazon, Best Buy, Walmart, Target and eBay.',
  alternates: { canonical: '/browse' },
  openGraph: {
    title: 'Browse All Deals — CloudPriceDeals',
    description: 'Filter and sort deals across Amazon, Best Buy, Walmart, Target and eBay.',
    url: 'https://cloudpricedeals.com/browse',
  },
}

export default function BrowsePage() {
  return <BrowseClient />
}
