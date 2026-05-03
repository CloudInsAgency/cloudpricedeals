'use client'
import { useEffect, useState } from 'react'
import { X, Info } from 'lucide-react'

// Persistent dismissible affiliate disclosure banner.
// Shows under the announcement bar until the user dismisses.
// Dismissal is remembered in localStorage so it doesn't reappear.
export default function AffiliateDisclosure() {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    try {
      var dismissed = localStorage.getItem('cpd-aff-disclosure-dismissed')
      if (!dismissed) setHidden(false)
    } catch (e) { setHidden(false) }
  }, [])

  function dismiss() {
    try { localStorage.setItem('cpd-aff-disclosure-dismissed', '1') } catch (e) {}
    setHidden(true)
  }

  if (hidden) return null

  return (
    <div role="region" aria-label="Affiliate disclosure" style={{
      background: 'var(--bg-section)',
      borderBottom: '1px solid var(--border)',
      padding: '9px 16px',
    }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'flex', alignItems: 'center', gap: '10px',
        fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '12px',
        color: 'var(--text-secondary)', lineHeight: 1.5,
      }}>
        <Info size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
        <p style={{ flex: 1, margin: 0 }}>
          <strong style={{ color: 'var(--text-primary)' }}>Affiliate disclosure:</strong>{' '}
          We earn commissions from qualifying Amazon purchases. Prices and availability are accurate as of the displayed update date.
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss affiliate disclosure"
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', padding: '4px', display: 'flex',
            alignItems: 'center', flexShrink: 0,
          }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}

// Inline single-line disclosure used directly above deal grids.
export function InlineAffiliateDisclosure({ style }) {
  return (
    <p style={Object.assign({
      fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
      fontSize: '13px',
      color: 'var(--text-secondary)',
      margin: '0 0 16px 0',
      lineHeight: 1.5,
    }, style || {})}>
      <strong style={{ color: 'var(--text-primary)' }}>Disclosure:</strong>{' '}
      As an Amazon Associate, CloudPriceDeals earns from qualifying purchases.
    </p>
  )
}
