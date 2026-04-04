import { RETAILERS } from '@/data/deals'

export default function RetailerBadge({ retailer }) {
  const r = RETAILERS[retailer]
  if (!r) return null
  return (
    <span style={{
      fontFamily: 'Outfit, sans-serif',
      fontSize: '10px', fontWeight: 700,
      padding: '3px 8px', borderRadius: '6px',
      background: r.bg, color: r.text,
      letterSpacing: '0.03em',
    }}>
      {r.label}
    </span>
  )
}
