'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Heart } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const links = [
    { href: '/',        label: 'Home' },
    { href: '/browse',  label: 'Browse' },
    { href: '/guides',  label: 'Guides' },
    { href: '/wishlist', label: 'Wishlists' },
    { href: '/about',   label: 'About' },
  ]

  return (
    <header style={{ background: '#F5F0E8', borderBottom: '1px solid rgba(26,26,26,0.1)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 900, letterSpacing: '0.01em', color: '#1A1A1A' }}>
            Cloud<span style={{ color: '#185FA5' }}>Price</span>Deals
          </span>
        </Link>

        <nav style={{ display: 'flex', gap: '36px' }} className="hidden md:flex">
          {links.map(function(l) {
            var isActive = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href))
            return (
              <Link key={l.href} href={l.href} style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: isActive ? 700 : 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: isActive ? '#185FA5' : '#1A1A1A',
                textDecoration: 'none',
                borderBottom: isActive ? '2px solid #185FA5' : '2px solid transparent',
                paddingBottom: '2px',
                transition: 'color 0.15s, border-color 0.15s',
              }}>{l.label}</Link>
            )
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/wishlist" className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: '7px', fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#185FA5', textDecoration: 'none', padding: '10px 20px', border: '1.5px solid #185FA5', borderRadius: '8px' }}>
            <Heart size={13} /> My Lists
          </Link>
          <Link href="/" className="hidden md:block" style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: '#185FA5', color: 'white', padding: '11px 22px', textDecoration: 'none', borderRadius: '8px' }}>
            Get App Alerts
          </Link>
          <button onClick={function() { setOpen(!open) }} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A1A1A', padding: '4px' }}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: '#F5F0E8', borderTop: '1px solid rgba(26,26,26,0.08)', padding: '20px 40px' }}>
          {links.map(function(l) {
            var isActive = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href))
            return (
              <Link key={l.href} href={l.href} onClick={function() { setOpen(false) }} style={{ display: 'block', padding: '14px 0', fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: isActive ? 700 : 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: isActive ? '#185FA5' : '#1A1A1A', textDecoration: 'none', borderBottom: '1px solid rgba(26,26,26,0.06)' }}>
                {l.label}
              </Link>
            )
          })}
          <div style={{ paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/wishlist" onClick={function() { setOpen(false) }} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#185FA5', textDecoration: 'none', padding: '12px 20px', border: '1.5px solid #185FA5', borderRadius: '8px', justifyContent: 'center' }}>
              <Heart size={14} /> My Lists
            </Link>
            <Link href="/" onClick={function() { setOpen(false) }} style={{ display: 'block', textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: '#185FA5', color: 'white', padding: '12px 20px', textDecoration: 'none', borderRadius: '8px' }}>
              Get App Alerts
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
