'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Heart, Zap, Sun, Moon } from 'lucide-react'

function ThemeToggle() {
  const [theme, setTheme] = useState('dark')

  useEffect(function() {
    const saved = localStorage.getItem('cpd-theme') || 'dark'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('cpd-theme', next)
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark/light mode"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '36px', height: '36px', borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.14)',
        background: 'transparent', cursor: 'pointer',
        color: theme === 'dark' ? '#94A3B8' : '#475569',
        flexShrink: 0, transition: 'all 0.15s',
      }}
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

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
    <header style={{ background: 'var(--bg-card)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100, width: '100%' }}>

      {/* Announcement bar */}
      <div style={{ background: 'var(--accent)', padding: '8px 16px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#0A0E1A', letterSpacing: '0.02em' }}>
          🔥 Updated weekly — 20 deals compared across Amazon, Best Buy, Walmart, Target & eBay
        </p>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Zap size={18} color="#0A0E1A" fill="#0A0E1A" />
            </div>
            <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: 'var(--text-primary)' }}>
              Cloud<span style={{ color: 'var(--accent)' }}>Price</span>Deals
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="cpd-desktop-nav">
          {links.map(function(l) {
            var isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
            return (
              <Link key={l.href} href={l.href} style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                textDecoration: 'none', padding: '8px 14px', borderRadius: '8px',
                background: isActive ? 'var(--accent-bg)' : 'transparent',
                transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}>
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop right buttons — toggle sits between My Lists and Browse Deals */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }} className="cpd-desktop-nav">
          <ThemeToggle />
          <Link href="/wishlist" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none', padding: '8px 16px', border: '1px solid var(--border)', borderRadius: '8px', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>
            <Heart size={14} /> My Lists
          </Link>
          <Link href="/browse" style={{ background: 'var(--accent)', color: '#0A0E1A', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Browse Deals
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
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent)', color: '#0A0E1A', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '14px', borderRadius: '8px', textDecoration: 'none' }}>
              Browse All Deals
            </Link>
            <Link href="/wishlist" onClick={function() { setOpen(false) }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'transparent', color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, padding: '13px', borderRadius: '8px', border: '1px solid var(--border)', textDecoration: 'none' }}>
              <Heart size={14} /> My Wishlists
            </Link>
            {/* Theme toggle in mobile menu */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Switch theme
              </span>
              <ThemeToggle />
            </div>
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
