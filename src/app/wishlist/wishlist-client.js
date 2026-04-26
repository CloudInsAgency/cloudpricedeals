'use client'
import { useState, useEffect } from 'react'
import { Heart, Share2, Trash2, ChevronDown, ChevronUp, Plus, ExternalLink } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { DEALS, WISHLIST_OCCASIONS, RETAILERS } from '@/data/deals'

export default function WishlistPage() {
  const [lists, setLists] = useState([])
  const [savedItems, setSavedItems] = useState([])
  const [activeOccasion, setActiveOccasion] = useState('all')
  const [expandedList, setExpandedList] = useState(null)
  const [showNewList, setShowNewList] = useState(false)
  const [newListName, setNewListName] = useState('')
  const [newListOccasion, setNewListOccasion] = useState('general')
  const [mounted, setMounted] = useState(false)

  useEffect(function() {
    setMounted(true)
    try {
      var stored = JSON.parse(localStorage.getItem('cpd-wishlist') || '[]')
      setSavedItems(stored)
      var storedLists = JSON.parse(localStorage.getItem('cpd-lists') || '[]')
      if (storedLists.length === 0) {
        storedLists = [
          { id: 'list-1', name: "Emma's Birthday 2026", occasion: 'birthday', created: '2026-03-20', items: [] },
          { id: 'list-2', name: 'Christmas 2026', occasion: 'christmas', created: '2026-03-15', items: [] },
          { id: 'list-3', name: 'Baby Shower — Jess & Mike', occasion: 'babyshower', created: '2026-03-28', items: [] },
        ]
        localStorage.setItem('cpd-lists', JSON.stringify(storedLists))
      }
      setLists(storedLists)
      if (storedLists.length > 0) setExpandedList(storedLists[0].id)
    } catch(e) { console.error(e) }
  }, [])

  function saveLists(updated) {
    setLists(updated)
    try { localStorage.setItem('cpd-lists', JSON.stringify(updated)) } catch(e) {}
  }

  function removeFromSaved(id) {
    var updated = savedItems.filter(function(s) { return s.id !== id })
    setSavedItems(updated)
    try { localStorage.setItem('cpd-wishlist', JSON.stringify(updated)) } catch(e) {}
  }

  function addToList(listId, item) {
    var updated = lists.map(function(l) {
      if (l.id !== listId) return l
      var exists = l.items.find(function(i) { return i.id === item.id })
      if (exists) return l
      return { ...l, items: [...l.items, item] }
    })
    saveLists(updated)
    removeFromSaved(item.id)
  }

  function removeFromList(listId, itemId) {
    var updated = lists.map(function(l) {
      if (l.id !== listId) return l
      return { ...l, items: l.items.filter(function(i) { return i.id !== itemId }) }
    })
    saveLists(updated)
  }

  function deleteList(listId) {
    if (!confirm('Delete this list?')) return
    saveLists(lists.filter(function(l) { return l.id !== listId }))
  }

  function createList() {
    if (!newListName.trim()) return
    var newList = {
      id: 'list-' + Date.now(),
      name: newListName.trim(),
      occasion: newListOccasion,
      created: new Date().toISOString().slice(0, 10),
      items: [],
    }
    var updated = [...lists, newList]
    saveLists(updated)
    setExpandedList(newList.id)
    setNewListName('')
    setShowNewList(false)
  }

  function getDealDetails(id) {
    return DEALS.find(function(d) { return d.id === id })
  }

  var totalSavings = lists.reduce(function(acc, l) {
    return acc + l.items.reduce(function(a, item) {
      var d = getDealDetails(item.id)
      return a + (d ? (d.originalPrice - d.price) : ((item.originalPrice || 0) - (item.price || 0)))
    }, 0)
  }, 0)

  var totalItems = lists.reduce(function(acc, l) { return acc + l.items.length }, 0)
  var filteredLists = activeOccasion === 'all' ? lists : lists.filter(function(l) { return l.occasion === activeOccasion })

  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', overflowX: 'hidden' }}>
      <Navbar />

      {/* Header */}
      <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart size={13} /> My wishlists
            </p>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '10px' }}>My wishlists</h1>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 400 }}>Save deals to occasion lists — then share with family and friends</p>
          </div>
          <button onClick={function() { setShowNewList(!showNewList) }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--accent)', color: '#FFFFFF', border: 'none', padding: '13px 24px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '8px', whiteSpace: 'nowrap' }}>
            <Plus size={15} /> New list
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px 96px' }}>

        {/* New list form */}
        {showNewList && (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
            <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '24px', color: 'var(--text-primary)', marginBottom: '20px' }}>Create a new list</p>
            <input
              value={newListName}
              onChange={function(e) { setNewListName(e.target.value) }}
              placeholder="List name (e.g. Dad's Birthday 2026)"
              style={{ width: '100%', padding: '12px 16px', fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: 'var(--text-primary)', background: 'var(--bg-section)', border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '12px', outline: 'none' }}
            />
            <select
              value={newListOccasion}
              onChange={function(e) { setNewListOccasion(e.target.value) }}
              style={{ width: '100%', padding: '12px 16px', fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: 'var(--text-primary)', background: 'var(--bg-section)', border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '20px', outline: 'none' }}>
              {WISHLIST_OCCASIONS.map(function(o) {
                return <option key={o.id} value={o.id}>{o.label}</option>
              })}
            </select>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={createList}
                style={{ background: 'var(--accent)', color: '#FFFFFF', border: 'none', padding: '11px 24px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '8px' }}>
                Create list
              </button>
              <button onClick={function() { setShowNewList(false) }}
                style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border)', padding: '11px 24px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', cursor: 'pointer', borderRadius: '8px' }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Stats bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)', borderRadius: '12px', overflow: 'hidden', marginBottom: '40px' }}>
          {[
            { label: 'Lists', value: lists.length },
            { label: 'Items saved', value: totalItems },
            { label: 'Total savings', value: '$' + totalSavings },
          ].map(function(s) {
            return (
              <div key={s.label} style={{ background: 'var(--bg-card)', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '40px', color: 'var(--accent)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '6px' }}>{s.label}</div>
              </div>
            )
          })}
        </div>

        {/* Saved items */}
        {savedItems.length > 0 && (
          <div style={{ background: 'var(--bg-card)', border: '2px solid var(--border-accent)', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
            <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '24px', color: 'var(--accent)', marginBottom: '6px' }}>
              {savedItems.length} item{savedItems.length !== 1 ? 's' : ''} saved — assign to a list
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              These items are in your saved deals. Add them to a list below.
            </p>
            {savedItems.map(function(item) {
              var deal = getDealDetails(item.id) || item
              var imageUrl = deal.imageUrl || item.imageUrl
              return (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0', borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
                  <div style={{ width: '52px', height: '52px', background: 'var(--bg-section)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                    {imageUrl
                      ? <img src={imageUrl} alt={deal.name || item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} onError={function(e) { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span style="font-size:22px">' + (deal.emoji || '🎁') + '</span>' }} />
                      : <span style={{ fontSize: '22px' }}>{deal.emoji || item.emoji}</span>
                    }
                  </div>
                  <div style={{ flex: 1, minWidth: '140px' }}>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '17px', color: 'var(--text-primary)', marginBottom: '4px' }}>{deal.name || item.name}</div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--accent)', fontWeight: 600 }}>${deal.price || item.price}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {lists.map(function(l) {
                      var occ = WISHLIST_OCCASIONS.find(function(o) { return o.id === l.occasion }) || {}
                      return (
                        <button key={l.id} onClick={function() { addToList(l.id, item) }}
                          style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '6px 12px', background: occ.bg || 'rgba(148,163,184,0.1)', color: occ.color || 'var(--text-secondary)', border: '1px solid ' + (occ.color || 'var(--text-muted)') + '40', cursor: 'pointer', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                          + {l.name}
                        </button>
                      )
                    })}
                    <button onClick={function() { removeFromSaved(item.id) }}
                      style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: 'var(--text-muted)', background: 'none', border: '1px solid var(--border)', cursor: 'pointer', padding: '6px 10px', borderRadius: '6px' }}>
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Occasion filter tabs */}
        <div style={{ display: 'flex', gap: '0', overflowX: 'auto', marginBottom: '28px', borderBottom: '1px solid var(--border)', WebkitOverflowScrolling: 'touch' }}>
          <button onClick={function() { setActiveOccasion('all') }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: activeOccasion === 'all' ? 600 : 400, padding: '12px 20px', border: 'none', background: 'transparent', cursor: 'pointer', color: activeOccasion === 'all' ? 'var(--accent)' : 'var(--text-muted)', borderBottom: activeOccasion === 'all' ? '2px solid var(--accent)' : '2px solid transparent', marginBottom: '-1px', whiteSpace: 'nowrap' }}>
            All
          </button>
          {WISHLIST_OCCASIONS.map(function(o) {
            return (
              <button key={o.id} onClick={function() { setActiveOccasion(o.id) }}
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: activeOccasion === o.id ? 600 : 400, padding: '12px 20px', border: 'none', background: 'transparent', cursor: 'pointer', color: activeOccasion === o.id ? o.color : 'var(--text-muted)', borderBottom: activeOccasion === o.id ? '2px solid ' + o.color : '2px solid transparent', marginBottom: '-1px', whiteSpace: 'nowrap' }}>
                {o.label}
              </button>
            )
          })}
        </div>

        {/* Empty state */}
        {filteredLists.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <Heart size={48} color="var(--accent)" style={{ margin: '0 auto 16px', display: 'block' }} />
            <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '28px', color: 'var(--text-primary)', marginBottom: '8px' }}>No lists yet</p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: 'var(--text-muted)' }}>Create a list and start saving deals to it.</p>
          </div>
        )}

        {/* Lists */}
        {filteredLists.map(function(list) {
          var occ = WISHLIST_OCCASIONS.find(function(o) { return o.id === list.occasion }) || {}
          var listTotal = list.items.reduce(function(acc, item) {
            var d = getDealDetails(item.id)
            return acc + (d ? d.price : (item.price || 0))
          }, 0)
          var isExpanded = expandedList === list.id

          return (
            <div key={list.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', marginBottom: '12px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', cursor: 'pointer' }}
                onClick={function() { setExpandedList(isExpanded ? null : list.id) }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: 'var(--text-primary)' }}>{list.name}</span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', background: occ.bg || 'rgba(148,163,184,0.1)', color: occ.color || 'var(--text-secondary)', borderRadius: '100px' }}>{occ.label || list.occasion}</span>
                  </div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>
                    {list.items.length} item{list.items.length !== 1 ? 's' : ''} · ${listTotal} total · Created {list.created}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={function(e) { e.stopPropagation(); navigator.clipboard && navigator.clipboard.writeText(window.location.href).then(function() { alert('Link copied!') }) }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}>
                    <Share2 size={16} />
                  </button>
                  <button onClick={function(e) { e.stopPropagation(); deleteList(list.id) }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}>
                    <Trash2 size={16} />
                  </button>
                  {isExpanded ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                </div>
              </div>

              {isExpanded && (
                <div style={{ borderTop: '1px solid var(--border)', padding: '0 24px' }}>
                  {list.items.length === 0 && (
                    <div style={{ padding: '28px 0', textAlign: 'center' }}>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text-muted)' }}>No items yet. Save deals using the ♥ button then assign them here.</p>
                    </div>
                  )}
                  {list.items.map(function(item) {
                    var deal = getDealDetails(item.id) || item
                    var retailer = RETAILERS[deal.retailer || item.retailer] || {}
                    var amazonUrl = deal.affiliateUrl || item.affiliateUrl || '#'
                    var imageUrl = deal.imageUrl || item.imageUrl

                    return (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 0', borderBottom: '1px solid var(--border)', flexWrap: 'wrap' }}>
                        <div style={{ width: '52px', height: '52px', background: 'var(--bg-section)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                          {imageUrl
                            ? <img src={imageUrl} alt={deal.name || item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} onError={function(e) { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span style="font-size:22px">' + (deal.emoji || '🎁') + '</span>' }} />
                            : <span style={{ fontSize: '22px' }}>{deal.emoji || item.emoji}</span>
                          }
                        </div>
                        <div style={{ flex: 1, minWidth: '140px' }}>
                          <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '17px', color: 'var(--text-primary)', marginBottom: '4px' }}>{deal.name || item.name}</div>
                          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '2px 8px', background: retailer.bg || 'rgba(148,163,184,0.1)', color: retailer.text || 'var(--text-secondary)', borderRadius: '100px' }}>
                            {retailer.label || (deal.retailer || item.retailer)}
                          </span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '26px', color: 'var(--accent)', lineHeight: 1 }}>${deal.price || item.price}</div>
                          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>${deal.originalPrice || item.originalPrice}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <a href={amazonUrl} target="_blank" rel="noopener noreferrer"
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--accent)', color: '#FFFFFF', fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '8px 14px', textDecoration: 'none', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                            Buy <ExternalLink size={11} />
                          </a>
                          <button onClick={function() { removeFromList(list.id, item.id) }}
                            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: 'var(--text-muted)', background: 'none', border: '1px solid var(--border)', padding: '7px 14px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em', borderRadius: '6px' }}>
                            Remove
                          </button>
                        </div>
                      </div>
                    )
                  })}
                  {list.items.length > 0 && (
                    <div style={{ padding: '16px 0' }}>
                      <a href="/browse" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                        + Browse more deals →
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <Footer />
    </div>
  )
}
