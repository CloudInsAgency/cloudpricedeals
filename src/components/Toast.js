'use client'
// Tiny, dependency-free toast. Mount once near the body and call
// window.cpdToast('message') from anywhere. Auto-dismisses in 2.5s.
import { useEffect, useState } from 'react'

export default function Toast() {
  const [msg, setMsg] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(function() {
    if (typeof window === 'undefined') return
    window.cpdToast = function(text) {
      setMsg(String(text || ''))
      setOpen(true)
      window.clearTimeout(window.__cpdToastTimer)
      window.__cpdToastTimer = window.setTimeout(function() { setOpen(false) }, 2500)
    }
  }, [])

  if (!open || !msg) return null
  return (
    <div role="status" aria-live="polite" style={{
      position: 'fixed',
      left: '50%',
      bottom: '24px',
      transform: 'translateX(-50%)',
      background: 'var(--accent)',
      color: '#FFFFFF',
      fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
      fontSize: '14px',
      fontWeight: 500,
      padding: '12px 22px',
      borderRadius: '100px',
      boxShadow: '0 10px 30px rgba(26,26,26,0.18)',
      zIndex: 9999,
      maxWidth: '90vw',
    }}>
      {msg}
    </div>
  )
}
