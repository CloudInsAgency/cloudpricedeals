import './globals.css'

export const metadata = {
  title: 'CloudPriceDeals — Best Deals Across Amazon, Best Buy, Walmart & More',
  description: 'Discover the best deals on electronics, home, fitness, and more — $50 to $150 sweet spot, compared across Amazon, Best Buy, Walmart, Target, and eBay.',
  keywords: 'deals, price comparison, Amazon deals, Best Buy deals, Walmart deals, electronics deals, discount shopping',
  openGraph: {
    title: 'CloudPriceDeals — Never Overpay Again',
    description: 'Best deals $50–$150, compared across 5 major retailers.',
    url: 'https://cloudpricedeals.com',
    siteName: 'CloudPriceDeals',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CloudPriceDeals',
    description: 'Best deals compared across Amazon, Best Buy, Walmart, Target & eBay.',
  },
  metadataBase: new URL('https://cloudpricedeals.com'),
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
