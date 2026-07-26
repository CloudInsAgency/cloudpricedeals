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
  return (
    <>
      <WishlistClient />
      <section
        aria-label="About CloudPriceDeals wishlists"
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '32px 24px 96px',
          fontFamily: 'var(--font-dm-sans), sans-serif',
          color: 'var(--text-secondary)',
          lineHeight: 1.8,
          fontSize: '15px',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-dm-serif), sans-serif', fontWeight: 700, letterSpacing: '-0.02em', fontSize: '28px', color: 'var(--text-primary)', marginBottom: '16px', lineHeight: 1.2 }}>
          How CloudPriceDeals wishlists work
        </h2>
        <p style={{ marginBottom: '20px' }}>
          CloudPriceDeals wishlists are a free way to save and organize the deals you find while shopping our site. Every product you save is tagged with the price we found it at, the original retail price, and the percent discount, so you can revisit later and see whether the deal is still live. Lists live in your own browser — there is no account to create, no password to remember, and no inbox to dig through.
        </p>
        <p style={{ marginBottom: '20px' }}>
          We built lists around occasions because most shopping is occasion-driven. You can create a list for a birthday, Christmas, Hanukkah, a baby shower, a wedding, a housewarming, or any general gift event. Each list keeps the items grouped together, tracks the running total, and shows how much you have saved off retail across the whole list. When the day comes around, every link is one click away — no tabs to keep open for weeks.
        </p>
        <h3 style={{ fontFamily: 'var(--font-dm-serif), sans-serif', fontWeight: 700, letterSpacing: '-0.02em', fontSize: '22px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '12px' }}>
          Occasion lists we support
        </h3>
        <p style={{ marginBottom: '20px' }}>
          Birthday lists are the most common — pick the person, set the date, and we'll show you a running shortlist of deals across the categories they care about. Christmas and holiday gift lists let you keep a year-round collection so you don't end up scrambling in December. Baby shower and wedding lists are useful when you want to align with a registry but still find the best price on each item. We also offer general gift, housewarming, and graduation lists for anyone who wants the structure without an occasion label.
        </p>
        <h3 style={{ fontFamily: 'var(--font-dm-serif), sans-serif', fontWeight: 700, letterSpacing: '-0.02em', fontSize: '22px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '12px' }}>
          Sharing lists with family and friends
        </h3>
        <p style={{ marginBottom: '20px' }}>
          Every list has a share button that copies a read-only link you can text or email. The recipient can see what you've saved and click straight through to the retailer — useful when you want a friend to weigh in before you buy, or when relatives ask for gift ideas. Sharing creates a snapshot, so subsequent edits to your list don't change what the recipient sees unless you re-share.
        </p>
        <h3 style={{ fontFamily: 'var(--font-dm-serif), sans-serif', fontWeight: 700, letterSpacing: '-0.02em', fontSize: '22px', color: 'var(--text-primary)', marginTop: '32px', marginBottom: '12px' }}>
          Why save deals instead of bookmarking?
        </h3>
        <p style={{ marginBottom: '20px' }}>
          Browser bookmarks lose the price context. A wishlist on CloudPriceDeals keeps the original price, the deal price you locked in, and the percent off — so a year from now you can tell whether you found a real bargain or just a normal sale. Because we update our deals weekly, returning to your list is also a quick way to see whether the same product is now cheaper, more expensive, or out of stock.
        </p>
        <p>
          Your wishlist data is stored entirely in your browser using localStorage. We never upload it to our servers, never share it with retailers, and never tie it to your identity. Read more in our <a href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>privacy policy</a>.
        </p>
      </section>
    </>
  )
}
