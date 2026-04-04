'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Heart } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/',         label: 'Home' },
    { href: '/browse',   label: 'Browse' },
    { href: '/wishlist', label: 'Wishlists' },
    { href: '/about',    label: 'About' },
  ]

  return (
    <header style={{ background: 'white', borderBottom: '1px solid rgba(24,95,165,0.08)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>

        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '1px' }}>
          <span style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '26px', fontWeight: 600, color: '#0D1B2A', letterSpacing: '-0.02em' }}>Cloud</span>
          <span style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '26px', fontWeight: 600, color: '#185FA5', letterSpacing: '-0.02em' }}>Price</span>
          <span style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '26px', fontWeight: 600, color: '#0D1B2A', letterSpacing: '-0.02em' }}>Deals</span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden md:flex">
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: 'Outfit, sans-serif', fontSize: '14px', fontWeight: 400,
              padding: '6px 16px', borderRadius: '100px', textDecoration: 'none',
              color: pathname === l.href ? '#185FA5' : '#3D5166',
              background: pathname === l.href ? '#EBF3FC' : 'transparent',
              transition: 'all 0.15s ease',
            }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/wishlist" className="hidden md:flex" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontFamily: 'Outfit, sans-serif', fontSize: '13px', fontWeight: 500,
            color: '#185FA5', textDecoration: 'none',
            padding: '8px 18px', borderRadius: '100px',
            border: '1.5px solid #185FA5', transition: 'all 0.15s ease',
          }}>
            <Heart size={13} /> My lists
          </Link>
          <Link href="/" style={{
            fontFamily: 'Outfit, sans-serif', fontSize: '13px', fontWeight: 500,
            background: '#185FA5', color: 'white', textDecoration: 'none',
            padding: '8px 18px', borderRadius: '100px', transition: 'all 0.15s ease',
          }} className="hidden md:block">
            Get app alerts
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0D1B2A' }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: 'white', borderTop: '1px solid rgba(24,95,165,0.08)', padding: '12px 24px 20px' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '10px 0', fontFamily: 'Outfit, sans-serif',
              fontSize: '15px', color: '#0D1B2A', textDecoration: 'none',
              borderBottom: '1px solid rgba(24,95,165,0.06)',
            }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
