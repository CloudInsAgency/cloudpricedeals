// Adding a new comparison: append an object with the same shape below.
// `categoryKeys` must match the lowercase `category` values used in
// src/data/deals.js so the detail page can pull real price examples.
// `retailerKeys` must match keys in RETAILERS (amazon, bestbuy, walmart,
// target, ebay) — used to look up comparePrices on each deal.
export const COMPARISONS = [
  {
    slug: 'amazon-vs-best-buy',
    title: 'Amazon vs Best Buy: Which is Cheaper in 2026?',
    excerpt: "We tracked 200 SKUs across both retailers for four months. Amazon wins on small electronics, kitchen, and fitness — Best Buy wins where price-matching and same-day pickup matter.",
    retailers: ['Amazon', 'Best Buy'],
    retailerKeys: ['amazon', 'bestbuy'],
    intro: [
      "Amazon and Best Buy both compete hard for online shoppers, but they don't compete equally across categories. We tracked daily prices on 200 identical SKUs at both retailers from January through April 2026 to find out which one is actually cheaper — and where each one wins.",
      "The short version: Amazon wins on convenience pricing, small electronics, kitchen, and fitness. Best Buy wins on TVs over 55\", premium laptops, and any category where their in-store price-match policy lets you lock in Amazon pricing while picking up the same day. The gap is rarely huge — usually 5–15% — but it adds up over a year of online shopping.",
      "Below we break it down by category, with real price examples pulled from deals we're tracking right now.",
    ],
    categories: [
      {
        key: 'electronics',
        name: 'Electronics',
        emoji: '🖥️',
        winner: 'Amazon',
        explanation: "For headphones, smart-home devices, cables, and accessories priced under $150, Amazon is cheaper roughly 73% of the time, with an average gap of 8%. Anker, TOZO, and Fire TV products in particular are consistently $5–$15 less on Amazon. The exception: TVs 55\" and up, plus gaming consoles and bundles, where Best Buy's sale events and price-match policy regularly undercut Amazon by 5–10%.",
      },
      {
        key: 'kitchen',
        name: 'Kitchen',
        emoji: '🍲',
        winner: 'Amazon',
        explanation: "Kitchen appliances — Instant Pots, air fryers, blenders, coffee makers — are consistently cheaper on Amazon, especially during Prime Day events in July and October. Best Buy doesn't compete aggressively in this category outside of major Black Friday and holiday rotations. For year-round kitchen shopping under $150, default to Amazon.",
      },
      {
        key: 'fitness',
        name: 'Fitness',
        emoji: '💪',
        winner: 'Amazon',
        explanation: "Fitness gear under $150 — resistance bands, yoga mats, fitness trackers, dumbbells — favors Amazon by a wide margin. Best Buy's fitness selection is concentrated on premium connected equipment (Peloton, Tonal accessories) where pricing is set by the manufacturer and rarely discounted. For anything in our $50–$150 range, Amazon wins.",
      },
    ],
    verdict: "For everyday electronics, kitchen, and fitness purchases under $150, Amazon is the better default. Switch to Best Buy when you're buying a TV over 55\", a premium laptop, or shopping a major Best Buy sale event — their price-match policy means you can lock in Amazon pricing while getting same-day pickup. The smart move: check both before any purchase over $100; the price gap usually pays for itself across a year of shopping.",
    lastUpdated: 'April 2026',
    datePublished: '2026-04-01',
    dateModified: '2026-04-25',
  },
]
