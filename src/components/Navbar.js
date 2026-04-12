'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Heart, Zap } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/',        label: 'Deals' },
    { href: '/browse',  label: 'Browse' },
    { href: '/guides',  label: 'Guides' },
    { href: '/wishlist', label: 'Wishlists' },
    { href: '/about',   label: 'About' },
  ]

  return (
    <header style={{ background: 'rgba(10,14,26,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, zIndex: 100, width: '100%' }}>

      <div style={{ background: 'var(--green)', padding: '8px 16px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#0A0E1A', letterSpacing: '0.02em' }}>
          🔥 Updated weekly — 20 deals compared across Amazon, Best Buy, Walmart, Target & eBay
        </p>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>

        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--green)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Zap size={18} color="#0A0E1A" fill="#0A0E1A" />
            </div>
            <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', fontWeight: 400, color: 'var(--text)' }}>
              Cloud<span style={{ color: 'var(--green)' }}>Price</span>Deals
            </span>
          </div>
        </Link>

        <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {links.map(function(l) {
            var isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
            return (
              <Link key={l.href} href={l.href} style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--green)' : 'var(--text-2)',
                textDecoration: 'none',
                padding: '8px 14px',
                borderRadius: '8px',
                background: isActive ? 'rgba(0,208,132,0.08)' : 'transparent',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={function(e) { if (!isActive) e.target.style.color = 'var(--text)' }}
              onMouseLeave={function(e) { if (!isActive) e.target.style.color = 'var(--text-2)' }}
              >{l.label}</Link>
            )
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <Link href="/wishlist" className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: 'var(--text-2)', textDecoration: 'none', padding: '8px 16px', border: '1px solid var(--border2)', borderRadius: '8px', transition: 'all 0.15s', whiteSpace: 'nowrap' }}
            onMouseEnter={function(e) { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.color = 'var(--green)' }}
            onMouseLeave={function(e) { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text-2)' }}>
            <Heart size={14} /> My Lists
          </Link>
          <Link href="/browse" className="hide-mobile btn-primary" style={{ padding: '9px 20px', fontSize: '12px' }}>
            Browse Deals
          </Link>
          <button
            onClick={function() { setOpen(!open) }}
            style={{ background: 'none', border: '1px solid var(--border2)', cursor: 'pointer', color: 'var(--text)', padding: '8px', borderRadius: '8px', display: 'none' }}
            className="show-mobile-flex"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '16px 24px 24px', width: '100%' }}>
          {links.map(function(l) {
            var isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
            return (
              <Link key={l.href} href={l.href}
                onClick={function() { setOpen(false) }}
                style={{ display: 'flex', alignItems: 'center', padding: '14px 0', fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: isActive ? 600 : 400, color: isActive ? 'var(--green)' : 'var(--text)', textDecoration: 'none', borderBottom: '1px solid var(--border)', gap: '8px' }}>
                {isActive && <span style={{ width: '3px', height: '16px', background: 'var(--green)', borderRadius: '2px', display: 'inline-block' }} />}
                {l.label}
              </Link>
            )
          })}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            <Link href="/browse" onClick={function() { setOpen(false) }} className="btn-primary" style={{ justifyContent: 'center', padding: '14px' }}>
              Browse All Deals
            </Link>
            <Link href="/wishlist" onClick={function() { setOpen(false) }} className="btn-secondary" style={{ justifyContent: 'center', padding: '13px' }}>
              <Heart size={14} /> My Wishlists
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile-flex { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile-flex { display: none !important; }
        }
      `}</style>
    </header>
  )
}
