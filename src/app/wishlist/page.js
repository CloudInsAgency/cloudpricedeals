import WishlistClient from './wishlist-client'

export const metadata = {
  title: 'My Wishlists — CloudPriceDeals',
  description: 'Save deals to occasion-based wishlists for birthdays, Christmas, baby showers, weddings and more. Share with family and friends.',
  alternates: { canonical: '/wishlist' },
  openGraph: {
    title: 'My Wishlists — CloudPriceDeals',
    description: 'Save deals to occasion-based wishlists. Share with family and friends.',
    url: 'https://cloudpricedeals.com/wishlist',
  },
}

export default function WishlistPage() {
  return <WishlistClient />
}
