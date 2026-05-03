export default function RetailerBadge({ retailer }) {
  // Muted, palette-friendly retailer pills. Keeps recognizable retailer
  // associations via subtle tint + label, without competing with the deep
  // evergreen accent for visual priority.
  var config = {
    amazon:  { label: 'Amazon',   bg: '#FBE9DC',          color: '#9A4314', border: 'rgba(154,67,20,0.20)' },
    bestbuy: { label: 'Best Buy', bg: 'rgba(59,130,246,0.10)',  color: '#1D4ED8', border: 'rgba(59,130,246,0.22)' },
    walmart: { label: 'Walmart',  bg: 'rgba(0,113,206,0.10)',   color: '#0E5BAA', border: 'rgba(0,113,206,0.22)' },
    target:  { label: 'Target',   bg: 'rgba(204,0,0,0.08)',     color: '#A30000', border: 'rgba(204,0,0,0.22)' },
    ebay:    { label: 'eBay',     bg: 'rgba(14,97,175,0.10)',   color: '#0E5BAA', border: 'rgba(14,97,175,0.22)' },
  }
  var r = config[retailer] || { label: retailer, bg: 'var(--bg-section)', color: 'var(--text-secondary)', border: 'var(--border)' }
  return (
    <span style={{
      fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      padding: '3px 10px',
      borderRadius: '100px',
      background: r.bg,
      color: r.color,
      border: '1px solid ' + r.border,
      display: 'inline-block',
      whiteSpace: 'nowrap',
    }}>
      {r.label}
    </span>
  )
}
