'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Heart, Zap } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/',         label: 'Deals' },
    { href: '/browse',   label: 'Browse' },
    { href: '/guides',   label: 'Guides' },
    { href: '/wishlist', label: 'Wishlists' },
    { href: '/about',    label: 'About' },
  ]

  return (
    <header style={{ background: 'rgba(10,14,26,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, zIndex: 100, width: '100%' }}>

      <div style={{ background: '#00D084', padding: '8px 16px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#0A0E1A', letterSpacing: '0.02em' }}>
          🔥 Updated weekly — 20 deals compared across Amazon, Best Buy, Walmart, Target & eBay
        </p>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>

        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', background: '#00D084', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Zap size={18} color="#0A0E1A" fill="#0A0E1A" />
            </div>
            <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: '#F0F4FF' }}>
              Cloud<span style={{ color: '#00D084' }}>Price</span>Deals
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="cpd-desktop-nav">
          {links.map(function(l) {
            var isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
            return (
              <Link key={l.href} href={l.href} style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#00D084' : '#94A3B8',
                textDecoration: 'none', padding: '8px 14px', borderRadius: '8px',
                background: isActive ? 'rgba(0,208,132,0.08)' : 'transparent',
                transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}>
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }} className="cpd-desktop-nav">
          <Link href="/wishlist" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#94A3B8', textDecoration: 'none', padding: '8px 16px', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '8px', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>
            <Heart size={14} /> My Lists
          </Link>
          <Link href="/browse" style={{ background: '#00D084', color: '#0A0E1A', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Browse Deals
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={function() { setOpen(!open) }}
          style={{ background: 'none', border: '1px solid rgba(255,255,255,0.14)', cursor: 'pointer', color: '#F0F4FF', padding: '8px', borderRadius: '8px' }}
          className="cpd-mobile-btn"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div style={{ background: '#111827', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px 24px', width: '100%' }}>
          {links.map(function(l) {
            var isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
            return (
              <Link key={l.href} href={l.href}
                onClick={function() { setOpen(false) }}
                style={{ display: 'flex', alignItems: 'center', padding: '14px 0', fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: isActive ? 600 : 400, color: isActive ? '#00D084' : '#F0F4FF', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)', gap: '8px' }}>
                {isActive && <span style={{ width: '3px', height: '16px', background: '#00D084', borderRadius: '2px', display: 'inline-block' }} />}
                {l.label}
              </Link>
            )
          })}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            <Link href="/browse" onClick={function() { setOpen(false) }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#00D084', color: '#0A0E1A', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '14px', borderRadius: '8px', textDecoration: 'none' }}>
              Browse All Deals
            </Link>
            <Link href="/wishlist" onClick={function() { setOpen(false) }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'transparent', color: '#F0F4FF', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, padding: '13px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.14)', textDecoration: 'none' }}>
              <Heart size={14} /> My Wishlists
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .cpd-desktop-nav { display: flex !important; }
        .cpd-mobile-btn  { display: none !important; }
        @media (max-width: 768px) {
          .cpd-desktop-nav { display: none !important; }
          .cpd-mobile-btn  { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
