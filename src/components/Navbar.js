'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Heart, Cloud, Search } from 'lucide-react'
import AffiliateDisclosure from './AffiliateDisclosure'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/',         label: 'Deals' },
    { href: '/browse',   label: 'Browse' },
    { href: '/guides',   label: 'Guides' },
    { href: '/compare',  label: 'Compare' },
    { href: '/wishlist', label: 'Wishlists' },
    { href: '/about',    label: 'About' },
  ]

  return (
    <header style={{ background: 'var(--bg-card)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100, width: '100%' }}>

      {/* Persistent FTC affiliate disclosure (dismissible, dark-green top bar) */}
      <AffiliateDisclosure />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>

        {/* Wordmark — cloud icon + CloudPrice (ink) / Deals (green) */}
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '9px' }} aria-label="CloudPriceDeals home">
          <Cloud size={26} strokeWidth={2.2} style={{ color: 'var(--accent)' }} />
          <span style={{ fontFamily: 'var(--font-dm-serif), sans-serif', fontSize: '21px', fontWeight: 800, letterSpacing: '-0.03em' }}>
            <span style={{ color: 'var(--text-primary)' }}>CloudPrice</span><span style={{ color: 'var(--accent)' }}>Deals</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="cpd-desktop-nav">
          {links.map(function(l) {
            var isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
            return (
              <Link key={l.href} href={l.href} style={{
                fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '14px',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                textDecoration: 'none', padding: '9px 18px', borderRadius: '100px',
                background: isActive ? 'var(--accent)' : 'transparent',
                transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}>
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop right buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }} className="cpd-desktop-nav">
          <Link href="/wishlist" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none', padding: '8px 16px', border: '1px solid var(--border)', borderRadius: '8px', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>
            <Heart size={14} /> My Lists
          </Link>
          <Link href="/browse" style={{ display: 'flex', alignItems: 'center', gap: '7px', background: 'var(--accent)', color: '#FFFFFF', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, padding: '10px 18px', borderRadius: '10px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Browse Deals <Search size={15} />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={function() { setOpen(!open) }}
          style={{ background: 'none', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text-primary)', padding: '8px', borderRadius: '8px' }}
          className="cpd-mobile-btn"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: '16px 24px 24px', width: '100%' }}>
          {links.map(function(l) {
            var isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
            return (
              <Link key={l.href} href={l.href}
                onClick={function() { setOpen(false) }}
                style={{ display: 'flex', alignItems: 'center', padding: '14px 0', fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: isActive ? 600 : 400, color: isActive ? 'var(--accent)' : 'var(--text-primary)', textDecoration: 'none', borderBottom: '1px solid var(--border)', gap: '8px' }}>
                {isActive && <span style={{ width: '3px', height: '16px', background: 'var(--accent)', borderRadius: '2px', display: 'inline-block' }} />}
                {l.label}
              </Link>
            )
          })}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            <Link href="/browse" onClick={function() { setOpen(false) }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent)', color: '#FFFFFF', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '14px', borderRadius: '8px', textDecoration: 'none' }}>
              Browse All Deals
            </Link>
            <Link href="/wishlist" onClick={function() { setOpen(false) }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'transparent', color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, padding: '13px', borderRadius: '8px', border: '1px solid var(--border)', textDecoration: 'none' }}>
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
