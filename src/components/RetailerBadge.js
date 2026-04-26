export default function RetailerBadge({ retailer }) {
  var config = {
    amazon:  { label: 'Amazon',   bg: 'rgba(255,153,0,0.12)',  color: '#FF9900', border: 'rgba(255,153,0,0.25)' },
    bestbuy: { label: 'Best Buy', bg: 'rgba(59,130,246,0.12)', color: '#3B82F6', border: 'rgba(59,130,246,0.25)' },
    walmart: { label: 'Walmart',  bg: 'rgba(0,113,206,0.12)',  color: '#0071CE', border: 'rgba(0,113,206,0.25)' },
    target:  { label: 'Target',   bg: 'rgba(204,0,0,0.12)',    color: '#CC0000', border: 'rgba(204,0,0,0.25)' },
    ebay:    { label: 'eBay',     bg: 'rgba(14,97,175,0.12)',  color: '#0E61AF', border: 'rgba(14,97,175,0.25)' },
  }
  var r = config[retailer] || { label: retailer, bg: 'var(--bg-section)', color: 'var(--text-2)', border: 'var(--border2)' }
  return (
    <span style={{
      fontFamily: 'DM Sans, sans-serif',
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
