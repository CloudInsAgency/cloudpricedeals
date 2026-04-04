'use client'
import { useState } from 'react'
import { ArrowRight, Check, Smartphone } from 'lucide-react'

export default function EmailCapture({ variant = 'banner' }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email) return
    console.log('Waitlist:', email)
    setDone(true)
  }

  if (variant === 'inline') {
    return (
      <div style={{ background: '#EBF3FC', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
        <Smartphone size={20} style={{ color: '#185FA5', margin: '0 auto 8px' }} />
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 600, color: '#0D1B2A', marginBottom: '4px' }}>App coming soon</p>
        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: '#7B93A8', marginBottom: '16px', fontWeight: 300 }}>Early access + exclusive deals</p>
        {done ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#185FA5', fontFamily: 'Outfit, sans-serif', fontSize: '14px', fontWeight: 500 }}>
            <Check size={16} /> You're on the list!
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', gap: '8px' }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
              style={{ flex: 1, fontFamily: 'Outfit, sans-serif', fontSize: '13px', padding: '10px 14px', borderRadius: '100px', border: '1px solid rgba(24,95,165,0.2)', background: 'white', outline: 'none', color: '#0D1B2A' }} />
            <button type="submit" style={{ background: '#185FA5', color: 'white', border: 'none', borderRadius: '100px', padding: '10px 18px', fontFamily: 'Outfit, sans-serif', fontSize: '13px', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Notify me
            </button>
          </form>
        )}
      </div>
    )
  }

  return (
    <div style={{ background: '#0D1B2A', borderRadius: '24px', padding: '48px 40px', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '240px' }}>
        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B7CD3', marginBottom: '10px' }}>App dropping soon</p>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: 500, color: 'white', lineHeight: 1.2, marginBottom: '10px' }}>
          Get deals delivered<br /><em>before anyone else.</em>
        </h3>
        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: '#7B93A8', fontWeight: 300, lineHeight: '1.6' }}>
          Push alerts for price drops. App-exclusive deals. Wishlist sharing.
        </p>
      </div>
      <div style={{ flex: 1, minWidth: '280px' }}>
        {done ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#85B7EB', fontFamily: 'Outfit, sans-serif', fontSize: '16px', fontWeight: 500 }}>
            <Check size={20} /> You're on the list — we'll be in touch!
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
              style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', fontWeight: 300, padding: '14px 20px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: 'white', outline: 'none' }} />
            <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#185FA5', color: 'white', border: 'none', borderRadius: '100px', padding: '14px 24px', fontFamily: 'Outfit, sans-serif', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
              Get early access <ArrowRight size={15} />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
