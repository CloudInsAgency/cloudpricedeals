'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Heart } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const links = [
    { href: '/', label: 'Home' },
    { href: '/browse', label: 'Browse' },
    { href: '/wishlist', label: 'Wishlists' },
    { href: '/about', label: 'About' },
  ]
  return (
    <header style={{ background: '#F5F0E8', borderBottom: '1px solid rgba(26,26,26,0.1)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 400, letterSpacing: '0.02em', color: '#1A1A1A' }}>
            Cloud<span style={{ color: '#185FA5' }}>Price</span>Deals
          </span>
        </Link>
        <nav style={{ display: 'flex', gap: '40px' }} className="hidden md:flex">
          {links.map(function(l) {
            return (
              <Link key={l.href} href={l.href} style={{
                fontFamily: 'Jost, sans-serif', fontSize: '14px', fontWeight: 400,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: pathname === l.href ? '#185FA5' : '#1A1A1A',
                textDecoration: pathname === l.href ? 'underline' : 'none',
                textUnderlineOffset: '5px', transition: 'color 0.15s',
              }}>{l.label}</Link>
            )
          })}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link href="/wishlist" className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: '7px', fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#185FA5', textDecoration: 'none', padding: '10px 22px', border: '1.5px solid #185FA5' }}>
            <Heart size={14} /> My lists
          </Link>
          <Link href="/" className="hidden md:block" style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: '#185FA5', color: 'white', padding: '11px 24px', textDecoration: 'none' }}>
            Get app alerts
          </Link>
          <button onClick={function() { setOpen(!open) }} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A1A1A' }}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <div style={{ background: '#F5F0E8', borderTop: '1px solid rgba(26,26,26,0.08)', padding: '20px 40px' }}>
          {links.map(function(l) {
            return (
              <Link key={l.href} href={l.href} onClick={function() { setOpen(false) }} style={{ display: 'block', padding: '14px 0', fontFamily: 'Jost, sans-serif', fontSize: '16px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#1A1A1A', textDecoration: 'none', borderBottom: '1px solid rgba(26,26,26,0.06)' }}>{l.label}</Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
