import './globals.css'
import MetaPixel from '@/components/MetaPixel'
import Toast from '@/components/Toast'

export const metadata = {
  metadataBase: new URL('https://cloudpricedeals.com'),
  title: {
    default: 'CloudPriceDeals — Best Amazon Deals $50-$150 | Compare Prices Weekly',
    template: '%s | CloudPriceDeals',
  },
  description: 'Discover the best Amazon deals between $50 and $150. We compare prices across Amazon, Best Buy, Walmart, Target and eBay every week so you always buy at the lowest price.',
  keywords: ['amazon deals', 'best deals under $150', 'price comparison', 'amazon coupons', 'best buy deals', 'walmart deals', 'weekly deals', 'online shopping deals'],
  authors: [{ name: 'CloudPriceDeals', url: 'https://cloudpricedeals.com' }],
  creator: 'Cloud Design Studio LLC',
  publisher: 'CloudPriceDeals',

  verification: {
    google: 'q3dzwJoaHqaZuCcc_oKxzjPkKQSnmDfy5hSYt-N9WB4',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cloudpricedeals.com',
    siteName: 'CloudPriceDeals',
    title: 'CloudPriceDeals — Best Amazon Deals $50-$150 | Compare Prices Weekly',
    description: 'Discover the best Amazon deals between $50 and $150. Compare prices across Amazon, Best Buy, Walmart, Target and eBay — updated every week.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CloudPriceDeals — Best Amazon Deals $50-$150' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CloudPriceDeals — Best Amazon Deals $50-$150',
    description: 'Compare prices across Amazon, Best Buy, Walmart, Target and eBay — updated every week.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://cloudpricedeals.com' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#00A86B" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>
        <MetaPixel />
        {children}
        <Toast />
      </body>
    </html>
  )
}
