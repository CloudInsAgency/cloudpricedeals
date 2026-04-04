'use client'
import { useState, useEffect } from 'react'
import { Heart, Share2, Trash2, ChevronDown, ChevronUp, Plus } from 'lucide-react'
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
    } catch(e) {
      console.error(e)
    }
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
    alert('Added to list!')
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
      return a + (d ? (d.originalPrice - d.price) : (item.originalPrice - item.price))
    }, 0)
  }, 0)

  var totalItems = lists.reduce(function(acc, l) { return acc + l.items.length }, 0)

  var filteredLists = activeOccasion === 'all'
    ? lists
    : lists.filter(function(l) { return l.occasion === activeOccasion })

  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#F5F0E8' }}>
      <Navbar />
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '64px 40px 96px' }}>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '64px', fontWeight: 400, color: '#1A1A1A', letterSpacing: '-0.01em', lineHeight: 1 }}>My wishlists</h1>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '16px', fontWeight: 300, color: '#888', marginTop: '12px' }}>Save deals to occasion lists — then share with family and friends</p>
          </div>
          <button onClick={function() { setShowNewList(!showNewList) }} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#185FA5', color: 'white', border: 'none', padding: '14px 24px', fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
            <Plus size={15} /> New list
          </button>
        </div>

        {showNewList && (
          <div style={{ background: 'white', padding: '28px', marginBottom: '32px', border: '1px solid rgba(26,26,26,0.08)' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', marginBottom: '20px' }}>Create a new list</p>
            <input
              value={newListName}
              onChange={function(e) { setNewListName(e.target.value) }}
              placeholder="List name (e.g. Dad's Birthday 2026)"
              style={{ width: '100%', padding: '12px 16px', fontFamily: 'Jost, sans-serif', fontSize: '15px', border: '1px solid rgba(26,26,26,0.15)', background: '#F5F0E8', marginBottom: '12px', outline: 'none' }}
            />
            <select
              value={newListOccasion}
              onChange={function(e) { setNewListOccasion(e.target.value) }}
              style={{ width: '100%', padding: '12px 16px', fontFamily: 'Jost, sans-serif', fontSize: '15px', border: '1px solid rgba(26,26,26,0.15)', background: '#F5F0E8', marginBottom: '16px', outline: 'none' }}
            >
              {WISHLIST_OCCASIONS.map(function(o) {
                return <option key={o.id} value={o.id}>{o.label}</option>
              })}
            </select>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={createList} style={{ background: '#185FA5', color: 'white', border: 'none', padding: '11px 24px', fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
                Create list
              </button>
              <button onClick={function() { setShowNewList(false) }} style={{ background: 'transparent', color: '#888', border: '1px solid rgba(26,26,26,0.15)', padding: '11px 24px', fontFamily: 'Jost, sans-serif', fontSize: '13px', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#EDE8DF', marginBottom: '48px' }}>
          {[
            { label: 'Lists', value: lists.length },
            { label: 'Items saved', value: totalItems },
            { label: 'Total savings', value: '$' + totalSavings },
          ].map(function(s) {
            return (
              <div key={s.label} style={{ background: 'white', padding: '28px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', fontWeight: 400, color: '#185FA5', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 300, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '6px' }}>{s.label}</div>
              </div>
            )
          })}
        </div>

        {savedItems.length > 0 && (
          <div style={{ background: 'white', padding: '28px', marginBottom: '32px', border: '2px solid #185FA5' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', marginBottom: '6px', color: '#185FA5' }}>
              {savedItems.length} item{savedItems.length !== 1 ? 's' : ''} saved — assign to a list
            </p>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', color: '#888', fontWeight: 300, marginBottom: '20px' }}>
              These items are in your saved deals. Add them to a list below.
            </p>
            {savedItems.map(function(item) {
              var deal = getDealDetails(item.id) || item
              return (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0', borderTop: '1px solid rgba(26,26,26,0.06)', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '32px' }}>{deal.emoji || item.emoji}</div>
                  <div style={{ flex: 1, minWidth: '160px' }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: '#1A1A1A' }}>{deal.name || item.name}</div>
                    <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#185FA5', fontWeight: 500 }}>${deal.price || item.price}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {lists.map(function(l) {
                      var occ = WISHLIST_OCCASIONS.find(function(o) { return o.id === l.occasion }) || {}
                      return (
                        <button key={l.id} onClick={function() { addToList(l.id, item) }}
                          style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '6px 12px', background: occ.bg || '#F5F0E8', color: occ.color || '#1A1A1A', border: 'none', cursor: 'pointer' }}>
                          + {l.name}
                        </button>
                      )
                    })}
                    <button onClick={function() { removeFromSaved(item.id) }}
                      style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', color: '#ccc', background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div style={{ display: 'flex', gap: '0', overflowX: 'auto', marginBottom: '32px', borderBottom: '1px solid rgba(26,26,26,0.1)' }}>
          <button onClick={function() { setActiveOccasion('all') }} style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '12px 20px', border: 'none', background: 'transparent', cursor: 'pointer', color: activeOccasion === 'all' ? '#185FA5' : '#888', borderBottom: activeOccasion === 'all' ? '2px solid #185FA5' : '2px solid transparent', marginBottom: '-1px', whiteSpace: 'nowrap' }}>
            All
          </button>
          {WISHLIST_OCCASIONS.map(function(o) {
            return (
              <button key={o.id} onClick={function() { setActiveOccasion(o.id) }} style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '12px 20px', border: 'none', background: 'transparent', cursor: 'pointer', color: activeOccasion === o.id ? o.color : '#888', borderBottom: activeOccasion === o.id ? '2px solid ' + o.color : '2px solid transparent', marginBottom: '-1px', whiteSpace: 'nowrap' }}>
                {o.label}
              </button>
            )
          })}
        </div>

        {filteredLists.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>
              <Heart size={48} color="#185FA5" />
            </div>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#1A1A1A', marginBottom: '8px' }}>No lists yet</p>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '15px', color: '#888', fontWeight: 300 }}>Create a list and start saving deals to it.</p>
          </div>
        )}

        {filteredLists.map(function(list) {
          var occ = WISHLIST_OCCASIONS.find(function(o) { return o.id === list.occasion }) || {}
          var listTotal = list.items.reduce(function(acc, item) {
            var d = getDealDetails(item.id)
            return acc + (d ? d.price : item.price)
          }, 0)
          var isExpanded = expandedList === list.id

          return (
            <div key={list.id} style={{ background: 'white', marginBottom: '16px', border: '1px solid rgba(26,26,26,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 28px', cursor: 'pointer' }} onClick={function() { setExpandedList(isExpanded ? null : list.id) }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', fontWeight: 400, color: '#1A1A1A' }}>{list.name}</span>
                      <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', background: occ.bg || '#F5F0E8', color: occ.color || '#888' }}>{occ.label || list.occasion}</span>
                    </div>
                    <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#888', fontWeight: 300 }}>
                      {list.items.length} item{list.items.length !== 1 ? 's' : ''} · ${listTotal} total · Created {list.created}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button onClick={function(e) { e.stopPropagation(); navigator.clipboard && navigator.clipboard.writeText(window.location.href).then(function() { alert('Link copied!') }) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: '4px' }}>
                    <Share2 size={16} />
                  </button>
                  <button onClick={function(e) { e.stopPropagation(); deleteList(list.id) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: '4px' }}>
                    <Trash2 size={16} />
                  </button>
                  {isExpanded ? <ChevronUp size={18} color="#888" /> : <ChevronDown size={18} color="#888" />}
                </div>
              </div>

              {isExpanded && (
                <div style={{ borderTop: '1px solid rgba(26,26,26,0.06)', padding: '0 28px' }}>
                  {list.items.length === 0 && (
                    <div style={{ padding: '32px 0', textAlign: 'center' }}>
                      <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', color: '#888', fontWeight: 300 }}>No items yet. Save deals using the heart button then assign them here.</p>
                    </div>
                  )}
                  {list.items.map(function(item) {
                    var deal = getDealDetails(item.id) || item
                    var retailer = RETAILERS[deal.retailer || item.retailer] || {}
                    var amazonUrl = deal.affiliateUrl || item.affiliateUrl || '#'
                    if (deal.comparePrices) {
                      var ap = deal.comparePrices.find(function(p) { return p.retailer === 'amazon' })
                      if (ap) amazonUrl = ap.url
                    }
                    return (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 0', borderBottom: '1px solid rgba(26,26,26,0.06)', flexWrap: 'wrap' }}>
                        <div style={{ width: '56px', height: '56px', background: '#F5F0E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '28px', overflow: 'hidden' }}>
                          {deal.imageUrl
                            ? <img src={deal.imageUrl} alt={deal.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} onError={function(e) { e.target.style.display='none' }} />
                            : deal.emoji || item.emoji}
                        </div>
                        <div style={{ flex: 1, minWidth: '160px' }}>
                          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: '#1A1A1A', marginBottom: '4px' }}>{deal.name || item.name}</div>
                          <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '2px 8px', background: retailer.bg || '#F5F0E8', color: retailer.text || '#888' }}>
                            {retailer.label || (deal.retailer || item.retailer)}
                          </span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 400, color: '#185FA5', lineHeight: 1 }}>${deal.price || item.price}</div>
                          <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#888', textDecoration: 'line-through', fontWeight: 300 }}>${deal.originalPrice || item.originalPrice}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <a href={amazonUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'white', background: '#185FA5', padding: '8px 14px', textDecoration: 'none', whiteSpace: 'nowrap', textAlign: 'center', display: 'block' }}>
                            Buy on Amazon
                          </a>
                          <button onClick={function() { removeFromList(list.id, item.id) }} style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', color: '#ccc', background: 'none', border: '1px solid rgba(26,26,26,0.1)', padding: '7px 14px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            Remove
                          </button>
                        </div>
                      </div>
                    )
                  })}
                  {list.items.length > 0 && (
                    <div style={{ padding: '16px 0', display: 'flex', gap: '16px' }}>
                      <a href="/browse" style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#185FA5', textDecoration: 'none', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid #185FA5', paddingBottom: '2px' }}>
                        + Browse more deals
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
