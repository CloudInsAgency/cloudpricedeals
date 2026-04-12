'use client'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
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
      aria-label="Toggle theme"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        border: '1px solid var(--border)',
        background: 'var(--bg-card)',
        cursor: 'pointer',
        color: 'var(--text-muted)',
        flexShrink: 0,
        transition: 'all 0.15s',
      }}
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
