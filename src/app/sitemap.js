import { DEALS } from '@/data/deals'
import { COMPARISONS } from '@/data/comparisons'

export default function sitemap() {
  const base = 'https://cloudpricedeals.com'
  const now = new Date().toISOString()

  // Preserved verbatim — these 11 URLs match the previously-submitted sitemap.
  const staticEntries = [
    { url: base,                                                     lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/browse`,                                          lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/guides`,                                          lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/compare`,                                         lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/compare/amazon-vs-best-buy`,                       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/guides/amazon-vs-bestbuy-electronics`,             lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/guides/best-time-to-buy-electronics`,              lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/guides/headphones-under-150-guide`,                lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/guides/kitchen-appliances-price-guide`,            lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/about`,                                           lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/privacy`,                                         lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  // Product pages — 33+ entries from DEALS, lastModified from each deal's updatedAt.
  const productEntries = DEALS.map(function(d) {
    var lm = now
    if (d.updatedAt) {
      var parsed = new Date(d.updatedAt)
      if (!isNaN(parsed.getTime())) lm = parsed.toISOString()
    }
    return {
      url: `${base}/product/${d.id}`,
      lastModified: lm,
      changeFrequency: 'weekly',
      priority: 0.6,
    }
  })

  // Comparison pages — skip the static one already listed above.
  const comparisonEntries = COMPARISONS
    .filter(function(c) { return c.slug !== 'amazon-vs-best-buy' })
    .map(function(c) {
      var lm = now
      var src = c.dateModified || c.lastUpdated || c.datePublished
      if (src) {
        var parsed = new Date(src)
        if (!isNaN(parsed.getTime())) lm = parsed.toISOString()
      }
      return {
        url: `${base}/compare/${c.slug}`,
        lastModified: lm,
        changeFrequency: 'monthly',
        priority: 0.7,
      }
    })

  return staticEntries.concat(productEntries).concat(comparisonEntries)
}
