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
      <div style={{ background: 'var(--bg-section)', border: '1px solid var(--border)', borderRadius: '20px', padding: '56px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: '52px', height: '52px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px', color: 'var(--accent)' }}>
            <Bell size={22} />
          </div>
          <p className="section-eyebrow" style={{ justifyContent: 'center', marginBottom: '14px' }}>
            Price drop alerts
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '14px' }}>
            Get notified when prices drop
          </h2>
          <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '32px' }}>
            We&rsquo;ll email you the moment any of our tracked products hits a new low. No spam, just deals.
          </p>

          {submitted ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'var(--accent-bg)', border: '1px solid var(--border-accent)', borderRadius: '12px', padding: '16px 24px' }}>
              <Check size={20} color="var(--accent)" />
              <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '15px', fontWeight: 700, color: 'var(--accent)' }}>You&rsquo;re in! We&rsquo;ll alert you on the next price drop.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', maxWidth: '440px', margin: '0 auto', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={function(e) { setEmail(e.target.value) }}
                placeholder="Enter your email address"
                required
                style={{ flex: 1, minWidth: '200px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '13px 16px', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.15s' }}
                onFocus={function(e) { e.target.style.borderColor = 'var(--accent)' }}
                onBlur={function(e) { e.target.style.borderColor = 'var(--border)' }}
              />
              <button type="submit" className="btn-primary" disabled={loading} style={{ opacity: loading ? 0.7 : 1, padding: '13px 24px' }}>
                {loading ? 'Saving...' : (<>Alert me <ArrowRight size={15} /></>)}
              </button>
            </form>
          )}
          <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-muted)', marginTop: '14px' }}>
            Free forever · Unsubscribe anytime · No spam
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '28px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div style={{ width: '40px', height: '40px', background: 'var(--accent-bg)', border: '1px solid var(--border-accent)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--accent)' }}>
          <Bell size={18} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: 'var(--font-dm-serif), DM Serif Display, serif', fontSize: '22px', marginBottom: '6px' }}>Get price drop alerts</h3>
          <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
            We&rsquo;ll notify you when this or similar products hit a new low.
          </p>
          {submitted ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)' }}>
              <Check size={16} />
              <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '14px', fontWeight: 700 }}>You&rsquo;re on the list!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={function(e) { setEmail(e.target.value) }}
                placeholder="Your email"
                required
                style={{ flex: 1, minWidth: '160px', background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 14px', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-primary)', outline: 'none' }}
                onFocus={function(e) { e.target.style.borderColor = 'var(--accent)' }}
                onBlur={function(e) { e.target.style.borderColor = 'var(--border)' }}
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
