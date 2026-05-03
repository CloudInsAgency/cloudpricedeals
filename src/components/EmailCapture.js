'use client'
import { useState } from 'react'
import { Bell, ArrowRight, Check } from 'lucide-react'

export default function EmailCapture({ variant }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setLoading(true)
    setTimeout(function() {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  if (variant === 'banner') {
    return (
      <div style={{ background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)', border: '1px solid var(--border)', borderRadius: '16px', padding: '48px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle, var(--accent-bg) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: '20%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', background: 'var(--accent-bg)', border: '1px solid var(--border-accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--green)' }}>
            <Bell size={22} />
          </div>
          <p className="section-eyebrow" style={{ justifyContent: 'center', marginBottom: '14px' }}>
            Price drop alerts
          </p>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', marginBottom: '12px' }}>
            Get notified when prices drop
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '32px' }}>
            We'll email you the moment any of our tracked products hits a new low price. No spam — just deals.
          </p>

          {submitted ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'var(--accent-bg)', border: '1px solid var(--border-accent)', borderRadius: '12px', padding: '16px 24px' }}>
              <Check size={20} color="var(--green)" />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 600, color: 'var(--green)' }}>You're in! We'll alert you on the next price drop.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', maxWidth: '440px', margin: '0 auto', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={function(e) { setEmail(e.target.value) }}
                placeholder="Enter your email address"
                required
                style={{ flex: 1, minWidth: '200px', background: 'var(--bg)', border: '1px solid var(--border2)', borderRadius: '8px', padding: '13px 16px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text)', outline: 'none', transition: 'border-color 0.15s' }}
                onFocus={function(e) { e.target.style.borderColor = 'var(--green)' }}
                onBlur={function(e) { e.target.style.borderColor = 'var(--border2)' }}
              />
              <button type="submit" className="btn-primary" disabled={loading} style={{ opacity: loading ? 0.7 : 1, padding: '13px 24px' }}>
                {loading ? 'Saving...' : (<>Alert me <ArrowRight size={15} /></>)}
              </button>
            </form>
          )}
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-3)', marginTop: '14px' }}>
            Free forever · Unsubscribe anytime · No spam
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '28px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div style={{ width: '40px', height: '40px', background: 'var(--accent-bg)', border: '1px solid var(--border-accent)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--green)' }}>
          <Bell size={18} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', marginBottom: '6px' }}>Get price drop alerts</h3>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '16px' }}>
            We'll notify you when this or similar products hit a new low.
          </p>
          {submitted ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--green)' }}>
              <Check size={16} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600 }}>You're on the list!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={function(e) { setEmail(e.target.value) }}
                placeholder="Your email"
                required
                style={{ flex: 1, minWidth: '160px', background: 'var(--bg)', border: '1px solid var(--border2)', borderRadius: '8px', padding: '10px 14px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text)', outline: 'none' }}
                onFocus={function(e) { e.target.style.borderColor = 'var(--green)' }}
                onBlur={function(e) { e.target.style.borderColor = 'var(--border2)' }}
              />
              <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '10px 20px', fontSize: '12px', opacity: loading ? 0.7 : 1 }}>
                {loading ? '...' : <ArrowRight size={15} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
